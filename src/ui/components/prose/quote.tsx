import type { ReactNode } from "react";

import { css } from "../../../../styled-system/css";

/**
 * `::quote{source="Matthew 6:21" href="…"}` — a quotation with an attributable
 * source.
 *
 * Not a second quotation *style*: the treatment is the `.prose blockquote`
 * default, and what this adds is the citation — `<figure>`/`<figcaption>` with
 * an optionally linked reference, which is the markup that makes a quote
 * checkable rather than merely set apart. Reach for `>` when there is nothing
 * to attribute, and for this when there is.
 *
 * The attribute is `source` rather than `ref` because React reserves `ref`.
 */
// `1.5rem`, not `1.25em`: the figure sits at the body size while the blockquote
// inside it is 1.5rem, so an `em` here would indent a `::quote` four pixels
// tighter than a bare `>` and the two would no longer line up.
const figureStyles = css({
  pl: "1.5rem",
  borderLeft: "2px solid",
  borderColor: "border.accent",
});

// Type, colour and the accent rule all come from `.prose blockquote`. The only
// thing to undo is the rule itself, which the figure carries here so that the
// citation sits inside it rather than beside it.
const quoteStyles = css({
  padding: 0,
  border: "none",
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

export default function Quote({ source, href, children }: Props) {
  return (
    <figure className={figureStyles}>
      <blockquote className={quoteStyles}>{children}</blockquote>
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
