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
  /** Inline SVG markup or HTML image element for the mark. */
  svg: string;
  /** Human-readable destination name, used for the accessible label. */
  label: string;
  /**
   * The mark is wider than it is tall. It keeps the line height but takes its
   * natural width, instead of being letterboxed into the square slot.
   */
  wide?: boolean;
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

// Brand marks use their official colours instead of inheriting the prose link
// colour. A brand that publishes light and dark versions (Vercel, Astro,
// Comark) ships both, tagged with `data-theme-variant`, and the link shows the
// one matching the site theme. Panda CSS carries its own yellow ground, so a
// single version reads on either surface.
const vercel: LinkIcon = {
  label: "Vercel",
  svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path data-theme-variant="light" d="m12 1.608 12 20.784H0Z" fill="#000000"/><path data-theme-variant="dark" d="m12 1.608 12 20.784H0Z" fill="#FFFFFF"/></svg>`,
};

// Astro's press kit (astro.build/press) ships the logomark in #17191E for light
// surfaces and white for dark ones, and asks that its colours not be changed.
const astroPath = `M8.358 20.162c-1.186-1.07-1.532-3.316-1.038-4.944.856 1.026 2.043 1.352 3.272 1.535 1.897.283 3.76.177 5.522-.678.202-.098.388-.229.608-.36.166.473.209.95.151 1.437-.14 1.185-.738 2.1-1.688 2.794-.38.277-.782.525-1.175.787-1.205.804-1.531 1.747-1.078 3.119l.044.148a3.158 3.158 0 0 1-1.407-1.188 3.31 3.31 0 0 1-.544-1.815c-.004-.32-.004-.642-.048-.958-.106-.769-.472-1.113-1.161-1.133-.707-.02-1.267.411-1.415 1.09-.012.053-.028.104-.045.165h.002zm-5.961-4.445s3.24-1.575 6.49-1.575l2.451-7.565c.092-.366.36-.614.662-.614.302 0 .57.248.662.614l2.45 7.565c3.85 0 6.491 1.575 6.491 1.575L16.088.727C15.93.285 15.663 0 15.303 0H8.697c-.36 0-.615.285-.784.727l-5.516 14.99z`;

const astro: LinkIcon = {
  label: "Astro",
  svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path data-theme-variant="light" d="${astroPath}" fill="#17191E"/><path data-theme-variant="dark" d="${astroPath}" fill="#FFFFFF"/></svg>`,
};

const pandaCss: LinkIcon = {
  label: "Panda CSS",
  svg: `<svg viewBox="0 0 34 34" xmlns="http://www.w3.org/2000/svg"><path d="M0 4.129C0 2.016 1.713.302 3.827.302h25.394c2.113 0 3.827 1.713 3.827 3.827v25.742c0 2.113-1.713 3.827-3.827 3.827H3.827C1.713 33.698 0 31.985 0 29.871V4.129Z" fill="#F6E458"/><path d="M21.178 7.767c-1.823-.524-3.683-.595-5.578-.425-1.06.11-2.081.32-3.064.69-2.126.798-3.722 2.181-4.673 4.263-.683 1.493-.93 3.08-.955 4.706-.027 1.72.188 3.72.531 5.162.31 1.524.724 3.966 1.314 5.408.056.137.126.183.276.183h7.392c.043 0 .086-.003.135-.006-.011-.027-.021-.052-.031-.075-.135-.289-.273-.576-.411-.864-.82-1.929-1.448-3.915-1.64-6.017-.085-.927-.073-1.85.184-2.88.294-1.034.925-1.763 1.972-2.068.96-.28 1.935-.278 2.89.031.853.276 1.409.859 1.646 1.731.181.67.181 1.347.044 2.023-.106.52-.319.995-.702 1.374-.688.681-1.547.838-2.469.786.002.026.003.05.004.073.039.158.077.317.115.475.09.382.18.764.296 1.138.228.734.493 1.468.793 2.149 2.14-.167 4.111-.698 6.203-1.954.03-.02.06-.038.088-.056.899-.56 1.626-1.286 2.128-2.223.812-1.517.97-3.14.73-4.764-.25-1.728-1.026-3.18-2.361-4.318-.927-.79-1.998-1.307-3.16-1.64Z" fill="#000000"/></svg>`,
};

// Comark's logo from `docs/public/logo-{light,dark}.svg` in comarkdown/comark:
// an outlined frame around "M::". Not the favicon, whose white-filled frame
// would read as a white chip on a dark surface.
const comarkFrame = `M199 9v110H9V9h190Z`;
const comarkLetters = `M128 51.25V32h19.937v19.25H128ZM128 96V76.75h19.937V96H128ZM158.063 51.25V32H178v19.25h-19.937Zm0 44.75V76.75H178V96h-19.937ZM30 98V30h20l20 25 20-25h20v68H90V59L70 84 50 59v39H30Z`;

const comark: LinkIcon = {
  label: "Comark",
  wide: true,
  svg: `<svg viewBox="0 0 208 128" fill="none" xmlns="http://www.w3.org/2000/svg"><g data-theme-variant="light"><path d="${comarkFrame}" stroke="#000000" stroke-width="8"/><path d="${comarkLetters}" fill="#000000"/></g><g data-theme-variant="dark"><path d="${comarkFrame}" stroke="#FFFFFF" stroke-width="8"/><path d="${comarkLetters}" fill="#FFFFFF"/></g></svg>`,
};

const email: LinkIcon = {
  label: "Email",
  svg: `<svg viewBox="0 -32 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M58.182 192.05V93.14L27.507 65.077 0 49.504v125.091c0 9.658 7.825 17.455 17.455 17.455h40.727Z" fill="#4285F4"/><path d="M197.818 192.05h40.727c9.659 0 17.455-7.825 17.455-17.455V49.504l-31.156 17.838-27.026 25.798v98.91Z" fill="#34A853"/><polygon fill="#EA4335" points="58.182 93.14 54.008 54.493 58.182 17.504 128 69.868 197.818 17.504 202.487 52.496 197.818 93.14 128 145.504"/><path d="M197.818 17.504v75.636L256 49.504V26.231c0-21.585-24.64-33.89-41.891-20.945L197.818 17.504Z" fill="#FBBC04"/><path d="M0 49.504l26.759 20.069 31.423 23.567V17.504L41.891 5.286C24.61-7.66 0 4.646 0 26.231v23.273Z" fill="#C5221F"/></svg>`,
};

const blobBase = import.meta.env.PUBLIC_VERCEL_BLOB_STORAGE_URL ?? "";
const lightAvatar = blobBase ? `${blobBase}/me-2.website.webp` : "/images/me-2.website.webp";
const darkAvatar = blobBase ? `${blobBase}/me.website.webp` : "/images/me.website.webp";

const site: LinkIcon = {
  label: "phenrique.me",
  svg: `<img data-theme-variant="light" src="${lightAvatar}" alt="" width="16" height="16" loading="lazy" decoding="async" /><img data-theme-variant="dark" src="${darkAvatar}" alt="" width="16" height="16" loading="lazy" decoding="async" />`,
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
  "vercel.com": vercel,
  "astro.build": astro,
  "panda-css.com": pandaCss,
  "comark.dev": comark,
  "gmail.com": email,
  "mail.google.com": email,
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
