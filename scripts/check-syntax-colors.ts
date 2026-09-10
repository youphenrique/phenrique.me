/**
 * Guards the `syntax.*` palette in panda.config.ts. Runs in `build`.
 *
 * Two rules, in both themes:
 *
 *  1. Contrast — every role clears MIN_CONTRAST against the code panel
 *     (`bg.raised`). 5:1 rather than AA's 4.5:1 leaves headroom for the paper
 *     grain and for rendering differences at 14px.
 *  2. Distinctness — every pair of roles that can share a line sits at least
 *     MIN_DISTANCE apart in OKLab (ΔE × 100). Contrast alone passes a palette of
 *     seven near-identical browns; this is the rule that would have caught it.
 *
 * Usage: node scripts/check-syntax-colors.ts
 */
import config from "../panda.config.ts";

type Mode = "base" | "_dark";

const MIN_CONTRAST = 5;
const MIN_DISTANCE = 8;
const SURFACE = "bg.raised";
const MODES: Record<Mode, string> = { base: "light", _dark: "dark" };

// Diff roles only ever colour whole lines against each other, never next to
// syntax tokens, so they are held to contrast but not to distinctness.
const DIFF_ROLES = new Set(["inserted", "deleted", "changed"]);

const rawColors: unknown = config.theme?.extend?.tokens?.colors;
const semanticColors: unknown = config.theme?.extend?.semanticTokens?.colors;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function lookup(tree: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((node, key) => (isRecord(node) ? node[key] : undefined), tree);
}

function resolveValue(value: unknown, mode: Mode, path: string): string {
  if (typeof value !== "string") throw new Error(`${path} has no ${MODES[mode]} value.`);

  const reference = /^\{colors\.(.+)\}$/.exec(value);
  if (reference?.[1] !== undefined) return resolve(reference[1], mode);

  if (!/^#[0-9a-f]{6}$/i.test(value)) {
    throw new Error(`${path} resolves to "${value}"; syntax colours must be solid six-digit hex.`);
  }
  return value;
}

/** Resolves a semantic or raw colour path to hex for one theme. */
function resolve(path: string, mode: Mode): string {
  const semantic = lookup(semanticColors, path);
  if (isRecord(semantic)) {
    if (isRecord(semantic.value)) return resolveValue(semantic.value[mode], mode, path);
    if ("value" in semantic) return resolveValue(semantic.value, mode, path);
  }

  const raw = lookup(rawColors, path);
  if (isRecord(raw) && "value" in raw) return resolveValue(raw.value, mode, path);

  throw new Error(`Unknown colour token "${path}".`);
}

function linearChannels(hex: string): [number, number, number] {
  const [r = 0, g = 0, b = 0] = (hex.slice(1).match(/.{2}/g) ?? []).map((channel) => {
    const c = Number.parseInt(channel, 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return [r, g, b];
}

function contrastRatio(a: string, b: string): number {
  const luminance = (hex: string) => {
    const [r, g, bl] = linearChannels(hex);
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
  };
  const [lighter, darker] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (lighter + 0.05) / (darker + 0.05);
}

function oklab(hex: string): [number, number, number] {
  const [r, g, b] = linearChannels(hex);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}

function distance(a: string, b: string): number {
  const [l1, a1, b1] = oklab(a);
  const [l2, a2, b2] = oklab(b);
  return Math.hypot(l1 - l2, a1 - a2, b1 - b2) * 100;
}

const syntax = lookup(semanticColors, "syntax");
if (!isRecord(syntax)) throw new Error("panda.config.ts defines no `syntax` semantic colours.");
const roles = Object.keys(syntax);

const failures: string[] = [];

for (const mode of Object.keys(MODES) as Mode[]) {
  const theme = MODES[mode];
  const surface = resolve(SURFACE, mode);
  const colours = roles.map((role) => ({ role, hex: resolve(`syntax.${role}`, mode) }));

  console.log(`\nsyntax.* on ${SURFACE} (${surface}), ${theme}`);
  for (const { role, hex } of colours) {
    const ratio = contrastRatio(hex, surface);
    console.log(`  ${role.padEnd(12)} ${hex}  ${ratio.toFixed(2)}:1`);
    if (ratio < MIN_CONTRAST) {
      failures.push(`${theme}: syntax.${role} is ${ratio.toFixed(2)}:1, needs ${MIN_CONTRAST}:1`);
    }
  }

  const comparable = colours.filter(({ role }) => !DIFF_ROLES.has(role));
  let closest = { pair: "", value: Infinity };
  for (const [i, a] of comparable.entries()) {
    for (const b of comparable.slice(i + 1)) {
      const value = distance(a.hex, b.hex);
      const pair = `${a.role}/${b.role}`;
      if (value < closest.value) closest = { pair, value };
      if (value < MIN_DISTANCE) {
        failures.push(`${theme}: ${pair} are ΔE ${value.toFixed(1)} apart, need ${MIN_DISTANCE}`);
      }
    }
  }
  console.log(`  closest pair: ${closest.pair}, ΔE ${closest.value.toFixed(1)}`);
}

if (failures.length > 0) {
  console.error(`\n✗ syntax palette check failed:\n  ${failures.join("\n  ")}`);
  process.exitCode = 1;
} else {
  console.log(`\n✓ syntax palette: ≥ ${MIN_CONTRAST}:1 contrast and ≥ ΔE ${MIN_DISTANCE} separation in both themes`);
}
