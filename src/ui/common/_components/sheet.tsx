import * as React from "react";
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";

import { css, cx } from "../../../../styled-system/css";

// Decelerating curve for sheet presentation: quick to commit, long soft landing.
// Softer than UIKit's own bezier, which front-loads so much of the distance that
// the slide reads as instantaneous on screen. Dismissal runs the same curve on a
// shorter duration.
const SHEET_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const contentClass = css({
  position: "fixed",
  zIndex: 50,
  display: "flex",
  flexDirection: "column",
  color: "clr_neutral_800_200",
  bgColor: "clr_neutral_100_800",
  boxShadow: "0 -16px 48px rgba(10, 10, 10, 0.18)",
  transition: `opacity 320ms ${SHEET_EASE}, transform 620ms ${SHEET_EASE}`,
  outline: "none",
  // Edge-anchored sides slide fully off-screen instead of cross-fading, which is
  // what makes the motion read as native rather than as a popover.
  "&[data-ending-style]": { transitionDuration: "420ms" },
  "&:not([data-side=bottom])[data-starting-style], &:not([data-side=bottom])[data-ending-style]": { opacity: 0 },
  "&[data-side=bottom]": {
    right: 0,
    bottom: 0,
    left: 0,
    maxH: "88dvh",
    borderTopLeftRadius: "1.75rem",
    borderTopRightRadius: "1.75rem",
    bgColor: "clr_sheet_bg",
    boxShadow: "0 -0.5px 0 rgba(10, 10, 10, 0.08), 0 -20px 60px rgba(10, 10, 10, 0.24)",
    transform: "translateY(100%)",
  },
  "&[data-side=left]": {
    top: 0,
    bottom: 0,
    left: 0,
    w: "3/4",
    maxW: "sm",
    transform: "translateX(-100%)",
  },
  "&[data-side=right]": {
    top: 0,
    right: 0,
    bottom: 0,
    w: "3/4",
    maxW: "sm",
    transform: "translateX(100%)",
  },
  "&[data-side=top]": {
    top: 0,
    right: 0,
    left: 0,
    borderBottomRightRadius: "1.75rem",
    borderBottomLeftRadius: "1.75rem",
    transform: "translateY(-100%)",
  },
  "&[data-open][data-side]": { transform: "translate(0)" },
  "@media (prefers-reduced-motion: reduce)": {
    transition: "opacity 150ms ease-out",
    "&[data-side]": { transform: "translate(0)" },
    "&[data-starting-style], &[data-ending-style]": { opacity: 0 },
  },
});

function Sheet(props: SheetPrimitive.Root.Props) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger(props: SheetPrimitive.Trigger.Props) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose(props: SheetPrimitive.Close.Props) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal(props: SheetPrimitive.Portal.Props) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({ className, ...props }: SheetPrimitive.Backdrop.Props) {
  return (
    <SheetPrimitive.Backdrop
      data-slot="sheet-overlay"
      className={(state) =>
        cx(
          css({
            position: "fixed",
            inset: 0,
            zIndex: 50,
            bg: "rgba(10, 10, 10, 0.32)",
            backdropFilter: "blur(2px)",
            transition: `opacity 460ms ${SHEET_EASE}`,
            "&[data-starting-style], &[data-ending-style]": { opacity: 0 },
            "@media (prefers-reduced-motion: reduce)": { transition: "opacity 150ms ease-out" },
          }),
          typeof className === "function" ? className(state) : className,
        )
      }
      {...props}
    />
  );
}

/** Drag indicator rendered at the top edge of a bottom sheet. */
function SheetGrabber({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-grabber"
      aria-hidden="true"
      className={cx(
        css({ w: "36px", h: "5px", mx: "auto", mt: 2, borderRadius: "full", bgColor: "clr_sheet_grabber" }),
        className,
      )}
      {...props}
    />
  );
}

type SheetSide = "top" | "right" | "bottom" | "left";

interface SheetContentProps extends SheetPrimitive.Popup.Props {
  side?: SheetSide;
  showCloseButton?: boolean;
  /** Which header corner the close button occupies. iOS bottom sheets place it on the left. */
  closeButtonSide?: "left" | "right";
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  closeButtonSide = "right",
  ...props
}: SheetContentProps) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        data-side={side}
        className={(state) => cx(contentClass, typeof className === "function" ? className(state) : className)}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetClose
            aria-label="Close"
            className={css({
              position: "absolute",
              display: "flex",
              w: 10,
              h: 10,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "full",
              color: "clr_neutral_700_400",
              bgColor: "clr_sheet_group_bg",
              boxShadow: "shadow_floating_control",
              transition:
                "color 0.15s ease-in-out, background-color 0.15s ease-in-out, box-shadow 0.2s ease-out, transform 0.1s ease-out",
              _hover: { color: "clr_neutral_900_50", cursor: "pointer" },
              _active: {
                transform: "scale(0.92)",
                bgColor: "clr_sheet_group_bg_active",
                boxShadow: "shadow_floating_control_pressed",
              },
              _focusVisible: { outline: "2px solid token(colors.clr_coral_flame)", outlineOffset: "2px" },
            })}
            style={{
              // Optically centred against the sheet title; bottom sheets sit lower
              // because a grabber precedes the header.
              top: side === "bottom" ? "1.25rem" : "0.75rem",
              ...(closeButtonSide === "left" ? { left: "1rem" } : { right: "1rem" }),
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </SheetClose>
        )}
      </SheetPrimitive.Popup>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="sheet-header" className={cx(css({ p: 5, pb: 3, textAlign: "center" }), className)} {...props} />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sheet-footer" className={cx(css({ p: 5, pt: 3, mt: "auto" }), className)} {...props} />;
}

function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={(state) =>
        cx(
          css({ fontSize: "lg", fontWeight: "semibold", color: "clr_neutral_900_50" }),
          typeof className === "function" ? className(state) : className,
        )
      }
      {...props}
    />
  );
}

function SheetDescription({ className, ...props }: SheetPrimitive.Description.Props) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={(state) =>
        cx(
          css({ mt: 1, fontSize: "sm", color: "clr_neutral_700_400" }),
          typeof className === "function" ? className(state) : className,
        )
      }
      {...props}
    />
  );
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetGrabber,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
};
