/**
 * Editorial tints — see docs/design-system.md § tint.*
 *
 * Six hues for classifying *content* (book genres, writing tags, work chips),
 * never for UI chrome. Each hue is a matched `surface`/`text` pair; the two are
 * always used together.
 */
export const TINT_HUES = ["sage", "moss", "sky", "periwinkle", "clay", "ochre"] as const;

export type TintHue = (typeof TINT_HUES)[number];

/**
 * Stable hue for an arbitrary label — FNV-1a with an xorshift finalizer, since
 * raw FNV's low bits distribute poorly mod 6 and bunch unrelated labels onto
 * one hue.
 *
 * Stable, but NOT collision-free: six hues means distinct labels will sometimes
 * share one. Where the vocabulary is small and known, pin it explicitly (as
 * `GENRE_HUES` does in book-genre-badge.astro) and keep this for entries added
 * later, so a new label always renders tinted rather than falling back to a
 * neutral chip.
 */
export function tintForKey(key: string): TintHue {
  let hash = 0x811c9dc5;

  for (let index = 0; index < key.length; index++) {
    hash ^= key.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }

  // Finalizer: mixes the high bits down so `% TINT_HUES.length` sees avalanche.
  // Every step re-coerces with `>>> 0` — `^` yields a *signed* int32, and a
  // negative modulo would index off the end of the array and return undefined.
  hash = (hash ^ (hash >>> 16)) >>> 0;
  hash = Math.imul(hash, 0x7feb352d) >>> 0;
  hash = (hash ^ (hash >>> 15)) >>> 0;

  return TINT_HUES[hash % TINT_HUES.length];
}

/** Normalises a label so casing and stray whitespace can't split one category in two. */
export function tintKey(label: string): string {
  return label.trim().toLowerCase();
}
