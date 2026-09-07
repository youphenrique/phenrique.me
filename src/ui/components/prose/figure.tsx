import { css } from "../../../../styled-system/css";

/**
 * `::figure{src="/images/x.webp" alt="…" caption="…"}` — a captioned image.
 *
 * This is the only way to place an image outside the reading measure: a bare
 * `![alt](src)` is parsed inside a paragraph, so it is stuck in the text column
 * by definition. `layout` picks the grid track — `wide` (the default) spans the
 * full article width, `text` keeps the image aligned to the prose.
 *
 * Comark renders outside Astro's asset pipeline, so `src` is not processed:
 * point it at a path under `public/`, and give `width`/`height` so the box is
 * reserved before the file arrives.
 */
const figureStyles = css({
  textAlign: "center",
});

const imageStyles = css({
  display: "block",
  width: "full",
  height: "auto",
  borderRadius: "md",
  border: "1px solid",
  borderColor: "border.hairline",
});

const captionStyles = css({
  mt: "0.75em",
  // The caption is metadata about the figure, so it stays on the text measure
  // even when the image itself has broken out to the wide track.
  maxWidth: "var(--prose-measure)",
  marginInline: "auto",
  fontSize: "0.8125rem",
  lineHeight: 1.5,
  color: "text.muted",
  textAlign: "center",
});

interface Props {
  src?: string;
  /** Empty string marks the image decorative; omitting it is an authoring bug. */
  alt?: string;
  caption?: string;
  layout?: string;
  width?: string | number;
  height?: string | number;
}

export default function Figure({ src, alt, caption, layout, width, height }: Props) {
  if (src === undefined) return null;

  return (
    <figure
      className={figureStyles}
      data-prose-panel
      {...(layout === "text" ? {} : { "data-prose-track": "wide" })}
    >
      <img
        className={imageStyles}
        src={src}
        alt={alt ?? ""}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
      />
      {caption !== undefined && <figcaption className={captionStyles}>{caption}</figcaption>}
    </figure>
  );
}
