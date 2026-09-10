import { useEffect, useRef, useState } from "react";
import { navigate } from "astro:transitions/client";

import { css } from "../../../../styled-system/css";
import { trackReadingPosition, type ReadingPosition, type TocEntry } from "../../../utils/toc.ts";
import { Sheet, SheetContent, SheetGrabber, SheetHeader, SheetTitle, SheetTrigger } from "../sheet.tsx";

interface TocSheetProps {
  entries: TocEntry[];
  /** Sheet title, and the pill's text before the first heading is reached. */
  label: string;
}

// Same decelerating curve as the sheet itself, so the pill and the panel it
// opens move as one piece.
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const RING_RADIUS = 7;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

function ChevronIcon() {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={css({ flexShrink: 0, color: "text.muted" })}
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
}

/**
 * Mobile table of contents: a floating pill that names the section being read
 * and rings the article's progress, opening a bottom sheet of every heading.
 *
 * Hydrated only where the desktop rail is absent (see `toc-rail.astro`). The
 * pill echoes the header's — same blurred `bg.overlay`, same `elevation.pill` —
 * and stays out of the way until the reader is inside the article.
 */
export default function TocSheet({ entries, label }: TocSheetProps) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<ReadingPosition>({ activeId: null, progress: 0, inArticle: false });
  // The sheet opens on the section being read, not on whichever row is first.
  const activeLinkRef = useRef<HTMLAnchorElement>(null);
  // Set by a row click and consumed once the sheet has finished closing.
  const pendingId = useRef<string | null>(null);

  useEffect(
    () =>
      trackReadingPosition(
        entries.map((entry) => entry.id),
        setPosition,
      ),
    [entries],
  );

  const active = entries.find((entry) => entry.id === position.activeId);
  const shown = position.inArticle || open;

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => setOpen(next)}
      onOpenChangeComplete={(isOpen) => {
        // The jump waits for the sheet to be fully gone. While it is open the
        // page is scroll-locked, and releasing the lock restores the old scroll
        // position — a jump taken at click time would be undone on close.
        // `navigate` routes it through ClientRouter the same way a clicked
        // fragment link is, so history and focus behave natively.
        if (isOpen || pendingId.current === null) return;
        const id = pendingId.current;
        pendingId.current = null;
        void navigate(`#${id}`);
      }}
    >
      <SheetTrigger
        data-shown={shown}
        // Hidden off-screen outside the article; `inert` keeps it out of the tab
        // order and the accessibility tree while it is.
        inert={!shown}
        className={css({
          position: "fixed",
          zIndex: 1,
          left: "50%",
          bottom: "max(1rem, env(safe-area-inset-bottom))",
          display: "flex",
          h: 11,
          maxW: "calc(100vw - 2.5rem)",
          pl: 3,
          pr: 3.5,
          alignItems: "center",
          gap: 2.5,
          borderRadius: "full",
          border: "1px solid token(colors.border.hairline)",
          bg: "bg.overlay",
          backdropFilter: "blur(16px)",
          boxShadow: "elevation.pill",
          color: "text.primary",
          fontSize: "sm",
          fontWeight: "medium",
          cursor: "pointer",
          transform: "translateX(-50%)",
          transition: `transform 0.5s ${EASE}, opacity 0.3s ${EASE}`,
          "&[data-shown=false]": { opacity: 0, transform: "translate(-50%, calc(100% + 2rem))" },
          _focusVisible: { outline: "2px solid token(colors.border.focus)", outlineOffset: "2px" },
          _motionReduce: {
            transition: "opacity 0.15s ease-out",
            "&[data-shown=false]": { transform: "translateX(-50%)" },
          },
          // Server-rendered everywhere; never shown beside the desktop rail.
          "@media (min-width: 80rem) and (hover: hover)": { display: "none" },
        })}
      >
        <svg
          aria-hidden="true"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          strokeWidth="2"
          className={css({ flexShrink: 0, transform: "rotate(-90deg)" })}
        >
          <circle cx="9" cy="9" r={RING_RADIUS} className={css({ stroke: "bg.track" })} />
          <circle
            cx="9"
            cy="9"
            r={RING_RADIUS}
            strokeDasharray={RING_LENGTH}
            strokeDashoffset={RING_LENGTH * (1 - position.progress)}
            className={css({ stroke: "accent.default", transition: "stroke-dashoffset 0.15s linear" })}
          />
        </svg>
        {/* The visible text is the section's title, so its purpose is announced first. */}
        {active !== undefined && <span className="sr-only">{label}: </span>}
        <span className={css({ maxW: "15rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" })}>
          {active?.text ?? label}
        </span>
        <ChevronIcon />
      </SheetTrigger>

      <SheetContent
        side="bottom"
        closeButtonSide="left"
        aria-describedby={undefined}
        initialFocus={active !== undefined ? activeLinkRef : undefined}
        // A full-bleed bottom sheet reads as a phone idiom; on a tablet it keeps
        // a column's width, centred over the pill that opened it.
        className={css({ md: { maxW: "30rem", mx: "auto" } })}
      >
        <SheetGrabber />

        <SheetHeader className={css({ px: "3.5rem", pt: 3, pb: 4 })}>
          <SheetTitle className={css({ fontSize: "17px", letterSpacing: "-0.01em" })}>{label}</SheetTitle>
        </SheetHeader>

        {/* Inset grouped list, matching the language sheet. */}
        <ol
          className={css({
            mx: 4,
            mt: 2,
            mb: "max(1.25rem, env(safe-area-inset-bottom))",
            listStyle: "none",
            borderRadius: "0.875rem",
            bgColor: "sheet.group",
            overflowY: "auto",
            overscrollBehavior: "contain",
          })}
        >
          {entries.map((entry) => {
            const isActive = entry.id === position.activeId;

            return (
              <li
                key={entry.id}
                className={css({
                  position: "relative",
                  "&:not(:last-child)::after": {
                    content: "''",
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                    left: "1rem",
                    mr: "1rem",
                    h: "1px",
                    bgColor: "border.hairline",
                  },
                  "&:first-child > a": { borderTopLeftRadius: "0.875rem", borderTopRightRadius: "0.875rem" },
                  "&:last-child > a": { borderBottomLeftRadius: "0.875rem", borderBottomRightRadius: "0.875rem" },
                })}
              >
                <a
                  ref={isActive ? activeLinkRef : undefined}
                  href={`#${entry.id}`}
                  data-depth={entry.depth}
                  aria-current={isActive ? "location" : undefined}
                  onClick={(event) => {
                    // A modified click still opens the fragment in a new tab.
                    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                    event.preventDefault();
                    pendingId.current = entry.id;
                    setOpen(false);
                  }}
                  className={css({
                    position: "relative",
                    display: "flex",
                    minH: "48px",
                    px: 4,
                    py: 3,
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 3,
                    fontSize: "16px",
                    lineHeight: "1.35",
                    letterSpacing: "-0.01em",
                    color: "text.primary",
                    textDecoration: "none",
                    transition: "background-color 0.12s ease-out",
                    _active: { bgColor: "sheet.groupActive" },
                    _focusVisible: { outline: "2px solid token(colors.border.focus)", outlineOffset: "-2px" },
                    "&[data-depth='3']": { pl: 8, fontSize: "15px", color: "text.secondary" },
                    "&[aria-current]": { fontWeight: "semibold", color: "text.primary" },
                  })}
                >
                  <span>{entry.text}</span>
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className={css({ flexShrink: 0, w: 1.5, h: 1.5, borderRadius: "full", bg: "accent.default" })}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ol>
      </SheetContent>
    </Sheet>
  );
}
