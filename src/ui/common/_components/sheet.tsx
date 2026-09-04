import * as React from "react";
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";

import { css, cx } from "../../../../styled-system/css";

const contentClass = css({
  position: "fixed",
  zIndex: 50,
  display: "flex",
  flexDirection: "column",
  color: "clr_neutral_800_200",
  bgColor: "clr_neutral_100_800",
  boxShadow: "0 -16px 48px rgba(10, 10, 10, 0.18)",
  transition: "opacity 0.25s ease-out, transform 0.25s ease-out",
  outline: "none",
  "&[data-starting-style], &[data-ending-style]": { opacity: 0 },
  "&[data-side=bottom]": {
    right: 0,
    bottom: 0,
    left: 0,
    borderTopLeftRadius: "2xl",
    borderTopRightRadius: "2xl",
    transform: "translateY(2.5rem)",
  },
  "&[data-side=left]": {
    top: 0,
    bottom: 0,
    left: 0,
    w: "3/4",
    maxW: "sm",
    transform: "translateX(-2.5rem)",
  },
  "&[data-side=right]": {
    top: 0,
    right: 0,
    bottom: 0,
    w: "3/4",
    maxW: "sm",
    transform: "translateX(2.5rem)",
  },
  "&[data-side=top]": {
    top: 0,
    right: 0,
    left: 0,
    borderBottomRightRadius: "2xl",
    borderBottomLeftRadius: "2xl",
    transform: "translateY(-2.5rem)",
  },
  "&[data-open][data-side]": { transform: "translate(0)" },
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
            bg: "rgba(10, 10, 10, 0.24)",
            backdropFilter: "blur(4px)",
            transition: "opacity 0.2s ease-out",
            "&[data-starting-style], &[data-ending-style]": { opacity: 0 },
          }),
          typeof className === "function" ? className(state) : className,
        )
      }
      {...props}
    />
  );
}

type SheetSide = "top" | "right" | "bottom" | "left";

interface SheetContentProps extends SheetPrimitive.Popup.Props {
  side?: SheetSide;
  showCloseButton?: boolean;
}

function SheetContent({ className, children, side = "right", showCloseButton = true, ...props }: SheetContentProps) {
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
              top: 3,
              right: 4,
              display: "flex",
              w: 8,
              h: 8,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "full",
              color: "clr_neutral_700_400",
              bgColor: "bg_neutral_100_700",
              transition: "color 0.15s ease-in-out, background-color 0.15s ease-in-out",
              _hover: { color: "clr_neutral_900_50", cursor: "pointer" },
              _focusVisible: { outline: "2px solid token(colors.clr_coral_flame)", outlineOffset: "2px" },
            })}
          >
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
};
