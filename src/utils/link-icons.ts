/**
 * Curated icon registry for links inside long-form content.
 *
 * A link is decorated only when its destination is listed here — an unknown
 * host stays a plain link. That is deliberate: a generic glyph on every
 * outbound URL turns prose into a wall of chrome, while a handful of
 * recognisable marks reads as a signal.
 *
 * Every mark is inlined (no network request, no layout shift, no third-party
 * favicon service) and paints with `currentColor`, so it inherits whichever
 * semantic text token the surrounding link resolves to.
 *
 * The brand paths are the same ones used by the profile icons in
 * `src/content/social-links/*.yaml`; they are repeated here rather than read
 * from that collection because the two serve different jobs — that collection
 * describes *your profiles*, this one describes *any destination*.
 */

export interface LinkIcon {
  /** Inline SVG markup. Must paint with `currentColor` and carry a `viewBox`. */
  svg: string;
  /** Human-readable destination name, used for the accessible label. */
  label: string;
}

const github: LinkIcon = {
  label: "GitHub",
  svg: `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8a7.993 7.993 0 0 0 5.19 7.49c.185.07.386.15.575.089a.373.373 0 0 0 .255-.369c0-.775-.73-1.301-1.491-1.453-.819-.164-1.099-.668-1.209-.977-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.624 1.048 1.57.933 2.11.747.14-.047.239-.23.276-.372.095-.36-.144-.861-.505-.952C4.17 11.004 2.92 10.088 2.92 7.58c0-.399.065-.766.185-1.1.254-.712.483-1.175.474-1.93-.008-.593.599-1.304 1.156-1.103.08.029.165.063.256.103a4.29 4.29 0 0 0 2.188.356 7.657 7.657 0 0 1 1.667-.001c.754.081 1.52-.06 2.214-.365.09-.039.175-.072.254-.1.553-.199 1.153.512 1.147 1.1-.006.76.225 1.23.479 1.947.117.331.18.695.18 1.093 0 2.147-.914 3.125-2.073 3.587-.574.23-1.037 1.225-1.037 1.843 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z" fill="currentColor"/></svg>`,
};

const x: LinkIcon = {
  label: "X",
  svg: `<svg fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1 1.5625H6.90625L11.1072 7.42435L16.1875 1.5625H18.4375L12.1257 8.84539L19 18.4375H13.0938L8.89276 12.5757L3.8125 18.4375H1.5625L7.87435 11.1546L1 1.5625ZM13.9605 16.75L4.28548 3.25H6.03952L15.7146 16.75H13.9605Z" fill="currentColor"/></svg>`,
};

const linkedin: LinkIcon = {
  label: "LinkedIn",
  svg: `<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 1H5C2.92925 1 1 2.92925 1 5V15C1 17.0707 2.92925 19 5 19H15C17.0715 19 19 17.0707 19 15V5C19 2.92925 17.0715 1 15 1ZM7 15.25H4.75V7H7V15.25ZM5.875 6.049C5.1505 6.049 4.5625 5.4565 4.5625 4.726C4.5625 3.9955 5.1505 3.403 5.875 3.403C6.5995 3.403 7.1875 3.9955 7.1875 4.726C7.1875 5.4565 6.60025 6.049 5.875 6.049ZM16 15.25H13.75V11.047C13.75 8.521 10.75 8.71225 10.75 11.047V15.25H8.5V7H10.75V8.32375C11.797 6.38425 16 6.241 16 10.1808V15.25Z" fill="currentColor"/></svg>`,
};

const instagram: LinkIcon = {
  label: "Instagram",
  svg: `<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 25"><path d="M17.017 25H6.982C3.142 25 0 21.815 0 17.921V7.08C0 3.185 3.142 0 6.982 0h10.035C20.857 0 24 3.185 24 7.079V17.92C24 21.815 20.857 25 17.017 25Zm0-1.87a5.064 5.064 0 0 0 3.626-1.532 5.207 5.207 0 0 0 1.511-3.677V7.08c0-1.383-.536-2.69-1.51-3.678a5.066 5.066 0 0 0-3.627-1.532H6.982a5.065 5.065 0 0 0-3.627 1.532A5.207 5.207 0 0 0 1.844 7.08V17.92c0 1.384.537 2.689 1.51 3.677a5.065 5.065 0 0 0 3.628 1.532h10.035Z" fill="currentColor"/><path d="M18.645 12.403c0 3.701-2.96 6.7-6.609 6.7s-6.61-3-6.61-6.7 2.96-6.701 6.61-6.701c3.65 0 6.609 3 6.609 6.701Zm-6.641-4.382c-2.39 0-4.328 1.964-4.328 4.388 0 2.423 1.937 4.388 4.328 4.388 2.39 0 4.327-1.965 4.327-4.388.002-2.424-1.936-4.388-4.327-4.388ZM20.316 5.598c0 .876-.7 1.586-1.565 1.586-.864 0-1.564-.71-1.564-1.586 0-.876.7-1.587 1.564-1.587.864 0 1.565.71 1.565 1.587Z" fill="currentColor"/></svg>`,
};

const email: LinkIcon = {
  label: "Email",
  svg: `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 3h11A1.5 1.5 0 0 1 15 4.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 11.5v-7A1.5 1.5 0 0 1 2.5 3Zm0 1a.5.5 0 0 0-.5.5v.24l6 3.43 6-3.43V4.5a.5.5 0 0 0-.5-.5h-11ZM14 5.9 8.25 9.19a.5.5 0 0 1-.5 0L2 5.9v5.6a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5V5.9Z" fill="currentColor"/></svg>`,
};

const site: LinkIcon = {
  label: "phenrique.me",
  svg: `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1ZM2.05 8.5h2.42c.07 1.5.37 2.86.84 3.9A6.01 6.01 0 0 1 2.05 8.5Zm2.42-1H2.05a6.01 6.01 0 0 1 3.26-3.9c-.47 1.04-.77 2.4-.84 3.9Zm1 0c.08-1.53.42-2.86.87-3.74.24-.47.48-.76.68-.92.18-.14.3-.15.35-.15.05 0 .17.01.35.15.2.16.44.45.68.92.45.88.79 2.21.86 3.74h-3.8Zm0 1h3.8c-.07 1.53-.41 2.86-.86 3.74-.24.47-.48.76-.68.92-.18.14-.3.15-.35.15-.05 0-.17-.01-.35-.15a2.6 2.6 0 0 1-.68-.92c-.45-.88-.79-2.21-.87-3.74Zm5.06 4.4c.47-1.04.77-2.4.84-3.9h2.42a6.01 6.01 0 0 1-3.26 3.9Zm.84-4.9c-.07-1.5-.37-2.86-.84-3.9a6.01 6.01 0 0 1 3.26 3.9h-2.42Z" fill="currentColor"/></svg>`,
};

/**
 * Hostnames map to marks with the leading `www.` already stripped. Subdomains
 * are matched by walking up the label list, so `gist.github.com` resolves to
 * the GitHub mark without needing its own entry.
 */
const BY_HOSTNAME: Record<string, LinkIcon> = {
  "github.com": github,
  "x.com": x,
  "twitter.com": x,
  "linkedin.com": linkedin,
  "instagram.com": instagram,
  "phenrique.me": site,
};

/** Hosts that are this site — an internal destination, not an outbound one. */
const INTERNAL_HOSTNAMES = new Set(["phenrique.me", "www.phenrique.me"]);

/** Returns true when the href points somewhere on this site. */
export function isInternalHref(href: string): boolean {
  if (href.startsWith("/") || href.startsWith("#")) return true;
  try {
    return INTERNAL_HOSTNAMES.has(new URL(href).hostname);
  } catch {
    return false;
  }
}

/**
 * Resolves the mark for a destination, or `null` when the host is not curated.
 *
 * Root-relative links resolve to the site mark and `mailto:` to the envelope;
 * everything else is looked up by hostname.
 *
 * A pure fragment gets nothing. It does not travel anywhere — it is a footnote
 * reference, its back-link, or a jump within the page — and a destination mark
 * on a link that never leaves the page is noise, twice over in a footnote list
 * where every row would carry one.
 */
export function iconForHref(href: string | undefined): LinkIcon | null {
  if (!href) return null;
  if (href.startsWith("#")) return null;
  if (href.startsWith("mailto:")) return email;
  if (href.startsWith("/")) return site;

  let hostname: string;
  try {
    hostname = new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }

  // Walk up the labels so subdomains inherit their parent's mark.
  const labels = hostname.split(".");
  for (let i = 0; i < labels.length - 1; i++) {
    const candidate = labels.slice(i).join(".");
    if (candidate in BY_HOSTNAME) return BY_HOSTNAME[candidate];
  }
  return null;
}
