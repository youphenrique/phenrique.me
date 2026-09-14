/**
 * Curated icon registry for links inside long-form content.
 *
 * A link is decorated only when its destination is listed here — an unknown
 * host stays a plain link. That is deliberate: a generic glyph on every
 * outbound URL turns prose into a wall of chrome, while a handful of
 * recognisable marks reads as a signal.
 *
 * Every mark is inlined (no network request, no layout shift, no third-party
 * favicon service). Brand marks use their official artwork and colours; the
 * rest paint with `currentColor` and inherit the surrounding link's colour.
 *
 * These are not the profile icons in `src/content/social-links/*.yaml`, which
 * the home page renders in its own monochrome style. The two serve different
 * jobs — that collection describes *your profiles*, this one describes *any
 * destination* — so a change here does not reach the home page.
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

// GitHub's Invertocat (github.com/logos) comes in black or white only.
const githubPath = `M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12`;

const github: LinkIcon = {
  label: "GitHub",
  svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path data-theme-variant="light" d="${githubPath}" fill="#000000"/><path data-theme-variant="dark" d="${githubPath}" fill="#FFFFFF"/></svg>`,
};

// X's brand toolkit (about.x.com) ships the logo in black or white only.
const xPath = `M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z`;

const x: LinkIcon = {
  label: "X",
  svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path data-theme-variant="light" d="${xPath}" fill="#000000"/><path data-theme-variant="dark" d="${xPath}" fill="#FFFFFF"/></svg>`,
};

// LinkedIn's 14px "in" bug (brand.linkedin.com/in-logo), drawn for small
// sizes, in #0A66C2. The official path knocks the letters out of the blue
// square, so a white underlay keeps them white on a dark surface too.
const linkedin: LinkIcon = {
  label: "LinkedIn",
  svg: `<svg viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="12" height="12" fill="#FFFFFF"/><path d="m13 0h-12c-0.5 0-1 0.5-1 1v12c0 0.6 0.5 1 1 1h12c0.6 0 1-0.4 1-1v-12c0-0.6-0.5-1-1-1zm-8.8 11.9h-2.1v-6.6h2.1v6.6zm-1.1-7.6c-0.7 0-1.2-0.5-1.2-1.2s0.5-1.2 1.2-1.2 1.2 0.5 1.2 1.2-0.5 1.2-1.2 1.2zm8.8 7.6h-2v-3.2c0-0.8 0-1.8-1.1-1.8s-1.2 0.8-1.2 1.7v3.3h-2.1v-6.6h2v0.9c0.3-0.5 1-1.1 2-1.1 2.1 0 2.5 1.4 2.5 3.2v3.6z" fill="#0A66C2"/></svg>`,
};

// The glyph outline is `Instagram_Glyph_Black.svg` from Meta's
// IG_brand_asset_pack_2023. The pack's gradient glyph is a bitmap clipped to
// that outline, with no colour stops to copy, so the gradient is rebuilt in
// vector from samples of it: a warm radial rising from the bottom edge
// (#FFD600 → #FF7A00 → #FF0069 → #D300C5) under a purple (#7638FA) bloom from
// the top-left corner. It is the same on either theme.
const instagramPath = `M295.42,6c-53.2,2.51-89.53,11-121.29,23.48-32.87,12.81-60.73,30-88.45,57.82S40.89,143,28.17,175.92c-12.31,31.83-20.65,68.19-23,121.42S2.3,367.68,2.56,503.46,3.42,656.26,6,709.6c2.54,53.19,11,89.51,23.48,121.28,12.83,32.87,30,60.72,57.83,88.45S143,964.09,176,976.83c31.8,12.29,68.17,20.67,121.39,23s70.35,2.87,206.09,2.61,152.83-.86,206.16-3.39S799.1,988,830.88,975.58c32.87-12.86,60.74-30,88.45-57.84S964.1,862,976.81,829.06c12.32-31.8,20.69-68.17,23-121.35,2.33-53.37,2.88-70.41,2.62-206.17s-.87-152.78-3.4-206.1-11-89.53-23.47-121.32c-12.85-32.87-30-60.7-57.82-88.45S862,40.87,829.07,28.19c-31.82-12.31-68.17-20.7-121.39-23S637.33,2.3,501.54,2.56,348.75,3.4,295.42,6m5.84,903.88c-48.75-2.12-75.22-10.22-92.86-17-23.36-9-40-19.88-57.58-37.29s-28.38-34.11-37.5-57.42c-6.85-17.64-15.1-44.08-17.38-92.83-2.48-52.69-3-68.51-3.29-202s.22-149.29,2.53-202c2.08-48.71,10.23-75.21,17-92.84,9-23.39,19.84-40,37.29-57.57s34.1-28.39,57.43-37.51c17.62-6.88,44.06-15.06,92.79-17.38,52.73-2.5,68.53-3,202-3.29s149.31.21,202.06,2.53c48.71,2.12,75.22,10.19,92.83,17,23.37,9,40,19.81,57.57,37.29s28.4,34.07,37.52,57.45c6.89,17.57,15.07,44,17.37,92.76,2.51,52.73,3.08,68.54,3.32,202s-.23,149.31-2.54,202c-2.13,48.75-10.21,75.23-17,92.89-9,23.35-19.85,40-37.31,57.56s-34.09,28.38-57.43,37.5c-17.6,6.87-44.07,15.07-92.76,17.39-52.73,2.48-68.53,3-202.05,3.29s-149.27-.25-202-2.53m407.6-674.61a60,60,0,1,0,59.88-60.1,60,60,0,0,0-59.88,60.1M245.77,503c.28,141.8,115.44,256.49,257.21,256.22S759.52,643.8,759.25,502,643.79,245.48,502,245.76,245.5,361.22,245.77,503m90.06-.18a166.67,166.67,0,1,1,167,166.34,166.65,166.65,0,0,1-167-166.34`;

const instagram: LinkIcon = {
  label: "Instagram",
  svg: `<svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="link-icon-instagram-warm" cx="0.3" cy="1.07" r="1.05"><stop offset="0.08" stop-color="#FFD600"/><stop offset="0.4" stop-color="#FF7A00"/><stop offset="0.7" stop-color="#FF0069"/><stop offset="1" stop-color="#D300C5"/></radialGradient><radialGradient id="link-icon-instagram-cool" cx="0" cy="0" r="0.9"><stop offset="0" stop-color="#7638FA"/><stop offset="1" stop-color="#7638FA" stop-opacity="0"/></radialGradient></defs><g transform="translate(-2.5 -2.5)"><path d="${instagramPath}" fill="url(#link-icon-instagram-warm)"/><path d="${instagramPath}" fill="url(#link-icon-instagram-cool)"/></g></svg>`,
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
