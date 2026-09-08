import type { ReactNode } from "react";

import { css, cx } from "../../../../styled-system/css";

/**
 * `::scripture{source="Matthew 6:21" href="…"}` — a quotation set apart.
 *
 * Distinct from `>` blockquote on purpose: a blockquote is a voice inside the
 * argument and stays at body size, while this is a text the argument answers
 * to. It gets the display serif, a wider setting, and a citation line carrying
 * the reference — which is what makes the quote checkable.
 *
 * The attribute is `source` rather than `ref` because React reserves `ref`.
 */
const figureStyles = css({
  pl: "1.25em",
  borderLeft: "2px solid",
  borderColor: "border.accent",
});

const quoteStyles = css({
  // Overrides the `.prose blockquote` default: this quote is the text the
  // argument answers to, not a muted aside inside it.
  padding: 0,
  border: "none",
  fontStyle: "italic",
  fontSize: "1.5rem",
  lineHeight: 1.6,
  letterSpacing: "-0.01em",
  color: "text.primary",
});

const captionStyles = css({
  mt: "0.6em",
  fontSize: "0.8125rem",
  letterSpacing: "0.04em",
  color: "text.muted",
  "& cite": { fontStyle: "normal" },
});

const citeLinkStyles = css({
  color: "text.muted",
  textDecoration: "underline",
  textDecorationColor: "border.underline",
  textUnderlineOffset: "2px",
  _hover: { color: "text.accent", textDecorationColor: "accent.hover" },
});

interface Props {
  /** Human-readable reference, e.g. `Matthew 6:21`. Rendered as the citation. */
  source?: string;
  /** Optional URL the reference links to. */
  href?: string;
  children?: ReactNode;
}

export default function Scripture({ source, href, children }: Props) {
  return (
    <figure className={figureStyles}>
      <blockquote className={cx("instrument-serif", quoteStyles)}>{children}</blockquote>
      {source !== undefined && (
        <figcaption className={captionStyles}>
          <cite>
            {href === undefined ? (
              source
            ) : (
              <a className={citeLinkStyles} href={href} target="_blank" rel="noopener noreferrer">
                {source}
              </a>
            )}
          </cite>
        </figcaption>
      )}
    </figure>
  );
}
