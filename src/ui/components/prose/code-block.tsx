import type { ReactNode } from "react";

import { css, cx } from "../../../../styled-system/css";

/**
 * The `pre` renderer for Comark documents.
 *
 * Two things are fixed here. Comark parses a fence's info string into
 * `language` and `filename` attributes on `<pre>` — so ```` ```ts [foo.ts] ````
 * carries the filename, but nothing rendered it and it leaked onto the element
 * as an invalid attribute. And Shiki paints token colours only; the block
 * itself had no padding, background or margin, so code sat flush on the page.
 *
 * The block stays on the text measure rather than breaking out: a sample that
 * lines up with the prose around it reads as part of the argument, and a long
 * line scrolls inside the box instead of widening the column. Tables and
 * `::figure` still take the `wide` track, where the extra width buys something.
 */
const wrapperStyles = css({
  borderRadius: "lg",
  border: "1px solid",
  borderColor: "border.hairline",
  bg: "bg.raised",
  overflow: "hidden",
  // A block with an overflowing line scrolls, and browsers make that scroller
  // keyboard-focusable on their own. The ring goes on the panel, so it follows
  // the rounded edge instead of being clipped by `overflow: hidden`.
  "&:has(> pre:focus-visible)": {
    outline: "2px solid token(colors.border.focus)",
    outlineOffset: "2px",
  },
});

const headerStyles = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 3,
  px: "1em",
  py: "0.55em",
  borderBottom: "1px solid",
  borderColor: "border.hairline",
  fontFamily: "var(--font-geist-mono)",
  fontSize: "0.75rem",
  color: "text.muted",
});

const languageStyles = css({
  flexShrink: 0,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "text.faint",
});

const filenameStyles = css({
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const preStyles = css({
  // Long lines scroll inside the block rather than widening the page.
  overflowX: "auto",
  margin: 0,
  px: "1em",
  py: "0.9em",
  // The block owns the surface; Shiki's own background would fight the token.
  bg: "transparent",
  // The panel draws the ring (see `wrapperStyles`).
  _focusVisible: { outline: "none" },
});

interface Props {
  /** Fence info language, e.g. `ts`. Absent for an unlabelled fence. */
  language?: string;
  /** Bracketed fence title, e.g. ```` ```ts [can-publish.ts] ````. */
  filename?: string;
  className?: string;
  children?: ReactNode;
}

export default function CodeBlock({ language, filename, className, children }: Props) {
  const hasHeader = filename !== undefined || language !== undefined;

  return (
    <div className={wrapperStyles} data-prose-panel>
      {hasHeader && (
        <div className={headerStyles}>
          <span className={filenameStyles}>{filename}</span>
          {language !== undefined && <span className={languageStyles}>{language}</span>}
        </div>
      )}
      {/* `language` and `filename` are deliberately not spread onto the element:
          they are Comark metadata, not HTML attributes. */}
      <pre className={cx(className, preStyles)} data-language={language}>
        {children}
      </pre>
    </div>
  );
}
