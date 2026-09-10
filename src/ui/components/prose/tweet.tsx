import type { ReactNode } from "react";

import { css } from "../../../../styled-system/css";

/**
 * `::tweet{author="Mark Chen" href="https://x.com/markchen90/status/…"}`
 * renders an X post as first-party, static HTML. The Markdown between the
 * directive markers is the post body, so emphasis and links keep working.
 *
 * `avatar` should point at an image under `public/`. It is optional: when it is
 * absent, the card uses the author's initial and makes no third-party request.
 * A referenced post is another `::tweet`, nested with Comark's `:::` syntax.
 */

const cardStyles = css({
  px: { base: "1em", sm: "1.25em" },
  py: "1.1em",
  border: "1px solid",
  borderColor: "border.subtle",
  borderRadius: "xl",
  bg: "bg.raised",
  color: "text.secondary",
  fontFamily: "GeistSans, sans-serif",
  fontSize: "0.9375rem",
  lineHeight: 1.55,
});

const headerStyles = css({
  display: "flex",
  alignItems: "center",
  gap: "0.75em",
});

const avatarStyles = css({
  flexShrink: 0,
  width: "2.5rem",
  height: "2.5rem",
  borderRadius: "full",
  objectFit: "cover",
  border: "1px solid",
  borderColor: "border.hairline",
});

const avatarFallbackStyles = css({
  display: "grid",
  placeItems: "center",
  flexShrink: 0,
  width: "2.5rem",
  height: "2.5rem",
  borderRadius: "full",
  bg: "tint.sky.surface",
  color: "tint.sky.text",
  fontWeight: 600,
});

const identityStyles = css({
  minWidth: 0,
  display: "grid",
  lineHeight: 1.3,
});

const authorStyles = css({
  color: "text.primary",
  fontWeight: 600,
  textDecoration: "none",
  _hover: { color: "text.accent" },
});

const handleStyles = css({
  color: "text.muted",
  fontSize: "0.8125rem",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const xLinkStyles = css({
  display: "grid",
  placeItems: "center",
  flexShrink: 0,
  width: "1.25rem",
  height: "1.25rem",
  ml: "auto",
  color: "text.muted",
  _hover: { color: "text.accent" },
  "& svg": { width: "full", height: "full" },
});

const bodyStyles = css({
  mt: "0.9em",
  overflowWrap: "anywhere",
  "& > :first-child": { mt: 0 },
  // A plain quote inside a post is still interface content, not the site's
  // editorial pull-quote treatment, so it stays in Geist.
  "& blockquote": {
    px: "0.85em",
    py: "0.7em",
    border: "1px solid",
    borderColor: "border.subtle",
    borderRadius: "xl",
    color: "text.secondary",
    fontFamily: "GeistSans, sans-serif",
    fontSize: "0.875rem",
    fontStyle: "normal",
    lineHeight: 1.55,
    letterSpacing: "normal",
  },
  // Nested `::tweet` directives are referenced posts. Keep the full identity
  // and link semantics, but tighten the card to match X's inset treatment.
  "& [data-prose-block='tweet']": {
    mt: "1em",
    px: "0.85em",
    py: "0.8em",
    borderRadius: "xl",
    bg: "transparent",
    fontSize: "0.875rem",
  },
  "& [data-prose-block='tweet'] [data-tweet-avatar]": {
    width: "2rem",
    height: "2rem",
  },
  "& [data-prose-block='tweet'] [data-tweet-header]": {
    gap: "0.6em",
  },
  "& [data-prose-block='tweet'] [data-tweet-body]": {
    mt: "0.65em",
  },
  "& [data-prose-block='tweet'] [data-tweet-x]": {
    width: "1rem",
    height: "1rem",
  },
});

const footerStyles = css({
  display: "block",
  mt: "0.85em",
  color: "text.muted",
  fontSize: "0.75rem",
  textDecoration: "none",
  _hover: { color: "text.accent" },
});

const XMark = () => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1 1.5625h5.906l4.201 5.862 5.08-5.862h2.25l-6.311 7.283L19 18.438h-5.906l-4.201-5.862-5.08 5.862h-2.25l6.311-7.283L1 1.562Zm12.96 15.188L4.286 3.25H6.04l9.675 13.5H13.96Z"
    />
  </svg>
);

interface Props {
  author?: string;
  handle?: string;
  href?: string;
  avatar?: string;
  /** Human-readable publication date, for example `Mar 11, 2025`. */
  date?: string;
  children?: ReactNode;
}

function assertXHref(href: string): void {
  let hostname: string;
  try {
    hostname = new URL(href).hostname.replace(/^www\./, "");
  } catch {
    throw new Error(`[prose] ::tweet received an invalid href: "${href}".`);
  }

  if (hostname !== "x.com" && hostname !== "twitter.com") {
    throw new Error(`[prose] ::tweet href must point to x.com or twitter.com, received "${hostname}".`);
  }
}

function displayHandleFor(handle: string | undefined, href: string): string {
  const handleFromHref = new URL(href).pathname.split("/").filter(Boolean)[0];
  const source = handle ?? handleFromHref ?? "";
  // Comark's React renderer currently normalises paired underscores in string
  // props as paired asterisks. X handles only allow letters, numbers and
  // underscores, so restoring those characters here is unambiguous.
  const normalized = source.replace(/^@/, "").replaceAll("*", "_").replaceAll("\\", "");
  if (!/^[A-Za-z0-9_]{1,15}$/.test(normalized)) {
    throw new Error(`[prose] ::tweet could not resolve a valid handle from "${source}".`);
  }
  return `@${normalized}`;
}

export default function Tweet({ author, handle, href, avatar, date, children }: Props) {
  if (author === undefined || href === undefined) {
    throw new Error("[prose] ::tweet requires author and href attributes.");
  }
  assertXHref(href);

  const displayHandle = displayHandleFor(handle, href);
  const initial = author.trim().charAt(0).toLocaleUpperCase() || "X";

  return (
    <article className={cardStyles} data-prose-panel data-prose-block="tweet" aria-label={`Post on X by ${author}`}>
      <header className={headerStyles} data-tweet-header>
        {avatar === undefined ? (
          <span className={avatarFallbackStyles} data-tweet-avatar aria-hidden="true">
            {initial}
          </span>
        ) : (
          <img
            className={avatarStyles}
            data-tweet-avatar
            src={avatar}
            alt=""
            width="40"
            height="40"
            loading="lazy"
            decoding="async"
          />
        )}
        <span className={identityStyles}>
          <a className={authorStyles} href={href} target="_blank" rel="noopener noreferrer">
            {author}
          </a>
          <span className={handleStyles}>{displayHandle}</span>
        </span>
        <a
          className={xLinkStyles}
          data-tweet-x
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View post on X"
        >
          <XMark />
        </a>
      </header>
      <div className={bodyStyles} data-tweet-body>
        {children}
      </div>
      {date !== undefined && (
        <a className={footerStyles} href={href} target="_blank" rel="noopener noreferrer">
          {date}
        </a>
      )}
    </article>
  );
}
