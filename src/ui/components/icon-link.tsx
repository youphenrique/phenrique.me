import { Children, type AnchorHTMLAttributes, type ReactNode } from "react";

import { css } from "../../../styled-system/css";
import { iconForHref, isInternalHref } from "../../utils/link-icons.ts";

/**
 * Keep the complete anchor contract: Comark-generated links carry structural
 * attributes such as the footnote reference's `id`, not just `href` and class.
 */
type Props = AnchorHTMLAttributes<HTMLAnchorElement>;

const glyphStyles = css({
  display: "inline-block",
  w: "0.95em",
  h: "0.95em",
  mr: "0.3em",
  // Optical centring on the x-height. `middle` alone sits the glyph slightly
  // high against Geist's lowercase.
  verticalAlign: "-0.14em",
  "& svg, & img": { w: "full", h: "full", display: "block" },
  "& img": { borderRadius: "full", objectFit: "cover" },
  "& [data-theme-variant='light']": {
    display: "block",
    _dark: { display: "none" },
  },
  "& [data-theme-variant='dark']": {
    display: "none",
    _dark: { display: "block" },
  },
});

// A wide mark keeps the line height and takes its natural width, so it is not
// shrunk to fit the square slot.
const wideGlyphStyles = css({
  w: "auto",
  "& svg": { w: "auto", h: "full" },
});

// The glyph is an atomic inline, and browsers keep a break opportunity after
// one that a word joiner does not suppress — left alone it strands the mark at
// the end of a line with the link text below it. Tying the glyph to the first
// word inside a `nowrap` span removes that opportunity while leaving the rest
// of the link text free to wrap.
const leadStyles = css({ whiteSpace: "nowrap" });

/**
 * Splits the leading word off the link text, so it can be kept on the same line
 * as the mark. Returns `null` when the children do not start with text — an
 * image or a nested element — in which case there is no word to bind to.
 */
function splitLeadingWord(children: ReactNode): { lead: string; rest: ReactNode[] } | null {
  const nodes = Children.toArray(children);
  const [first, ...tail] = nodes;
  if (typeof first !== "string") return null;

  const match = /^(\s*\S+)([\s\S]*)$/.exec(first);
  if (match === null) return null;

  return { lead: match[1], rest: [match[2], ...tail] };
}

/**
 * The `a` renderer for Comark documents.
 *
 * Links whose destination is in the curated registry get a leading mark; every
 * other link renders untouched, so this stays invisible for the common case.
 * Colour and underline are left to the `.prose` layer. Brand marks use their
 * official colours, switching between light and dark versions where the brand
 * publishes both; unbranded marks can still inherit `currentColor`.
 */
export default function IconLink({ children, ...props }: Props) {
  const { href } = props;
  const icon = iconForHref(href);
  const external = href !== undefined && !isInternalHref(href) && !href.startsWith("mailto:");

  // The anchor stays `inline` so long link text still wraps normally inside a
  // paragraph; only the glyph and its first word form a box.
  const anchorProps = {
    ...props,
    ...(external ? { target: "_blank", rel: "noopener noreferrer" } : {}),
  };

  if (icon === null) {
    return (
      <a {...anchorProps}>
        {children}
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  }

  // The mark is decorative: the link text already names the destination, so
  // announcing it again would only add noise.
  const glyph = (
    <span
      aria-hidden="true"
      className={icon.wide ? `${glyphStyles} ${wideGlyphStyles}` : glyphStyles}
      dangerouslySetInnerHTML={{ __html: icon.svg }}
    />
  );
  const split = splitLeadingWord(children);

  return (
    <a {...anchorProps}>
      {split === null ? (
        <span className={leadStyles}>{glyph}</span>
      ) : (
        <>
          <span className={leadStyles}>
            {glyph}
            {split.lead}
          </span>
          {split.rest}
        </>
      )}
      {split !== null ? null : children}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
