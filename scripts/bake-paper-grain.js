/**
 * Bakes `assets/texture.png` into `public/images/paper-grain.webp`, the tile the
 * light-mode canvas is textured with (see `.paper-grain` in ui/styles/global.css).
 *
 * The source is an opaque cream scan. Multiplying it into `bg.canvas` as-is would
 * drag the token off its value — the mean is ~245, so the whole canvas would darken
 * by ~4% and warm up, quietly invalidating the contrast ratios the design system
 * guarantees. So we keep only the *deviation*: reduce to luminance, then re-centre
 * the mean on pure white.
 *
 * A multiply layer can only darken, so every sample above the mean clamps to 255 —
 * about two thirds of the tile — and what ships is white with darker flecks. That
 * leaves the painted canvas a hair under the token rather than exactly on it: less
 * than one level at GAIN 1.0, which drifts each contrast ratio by at most 0.06 and
 * crosses no threshold (`text.accent`, the tightest, holds at 4.69:1). Raising GAIN
 * deepens the flecks, so re-check that margin if you push it much past 1.5.
 *
 * GAIN scales that deviation, and is the knob for how rough the paper reads.
 * Because the tile is multiplied, scaling the deviation is exactly equivalent to
 * putting `opacity` on a grain overlay: GAIN 0.75 renders like an overlay at 50%,
 * 1.5 like one at 100%. Flattening the source's chroma noise into luminance costs
 * some amplitude, so GAIN 1.5 is roughly "as rough as the original scan".
 *
 * Run with: node scripts/bake-paper-grain.js
 */
import sharp from "sharp";

const SOURCE = "assets/texture.png";
const OUTPUT = "public/images/paper-grain.webp";
const GAIN = 1.0;

const { data, info } = await sharp(SOURCE).greyscale().raw().toBuffer({ resolveWithObject: true });

const mean = data.reduce((total, value) => total + value, 0) / data.length;

const grain = Buffer.alloc(data.length);
for (let i = 0; i < data.length; i++) {
  grain[i] = Math.max(0, Math.min(255, Math.round(255 + (data[i] - mean) * GAIN)));
}

// Lossless: the tile is high-frequency noise, and lossy WebP answers that with
// blocking artefacts that read as a repeating pattern on a surface this flat.
await sharp(grain, { raw: { width: info.width, height: info.height, channels: 1 } })
  .webp({ lossless: true, effort: 6 })
  .toFile(OUTPUT);

const { channels } = await sharp(OUTPUT).stats();
console.log(
  `${OUTPUT} — gain ${GAIN}, ${info.width}x${info.height}, ` +
    `sd ${channels[0].stdev.toFixed(2)}, darkest ${channels[0].min}/255`,
);
