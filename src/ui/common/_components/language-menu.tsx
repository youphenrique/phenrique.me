import { Menu as BaseMenu } from "@base-ui/react/menu";

import { css, cx } from "../../../../styled-system/css";
import { flex, hstack } from "../../../../styled-system/patterns";

interface LanguageOption {
  id: string;
  name: string;
  href: string;
}

interface LanguageMenuProps {
  currentLocale: string;
  menuLabel: string;
  languages: LanguageOption[];
  /** Popup alignment relative to the trigger. */
  align?: "start" | "end";
  /** Renders the active locale next to the globe, inside a pill-shaped trigger. */
  withLabel?: boolean;
}

function GlobeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 8 6 6" />
      <path d="m4 14 6-6 2-3" />
      <path d="M2 5h12" />
      <path d="M7 2h1" />
      <path d="m22 22-5-10-5 10" />
      <path d="M14 18h6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default function LanguageMenu(props: LanguageMenuProps) {
  const { align = "end", withLabel = false } = props;

  return (
    <BaseMenu.Root modal={false}>
      <BaseMenu.Trigger
        aria-label={props.menuLabel}
        className={cx(
          css({
            display: "flex",
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "full",
            color: "text.secondary",
            background: "none",
            transition: "color 0.15s ease-in-out",
            _hover: { color: "text.primary" },
            "&[data-popup-open]": { color: "text.primary" },
          }),
          withLabel
            ? hstack({
                h: 10,
                px: 3,
                gap: 2,
                fontSize: "sm",
                fontWeight: "semibold",
                textTransform: "uppercase",
                border: "1px dashed token(colors.border.default)",
              })
            : // 40x40 hit area for pointer/touch targets; negative margins keep the
              // icon's visual spacing in the header row unchanged.
              css({ w: 10, h: 10, mx: "-10px", p: 0, border: "none" }),
        )}
      >
        <GlobeIcon />
        {withLabel && <span>{props.currentLocale}</span>}
      </BaseMenu.Trigger>

      <BaseMenu.Portal>
        <BaseMenu.Positioner align={align} sideOffset={12} className={css({ zIndex: 10, outline: "none" })}>
          <BaseMenu.Popup
            className={css({
              m: 0,
              p: 1,
              minW: 48,
              boxShadow: "lg",
              borderRadius: "lg",
              border: "1px solid",
              bgColor: "bg.raised",
              borderColor: "border.default",
              outline: "none",
              transformOrigin: "var(--transform-origin)",
              transition: "opacity 0.15s ease-out, transform 0.15s ease-out",
              "&[data-starting-style], &[data-ending-style]": {
                opacity: 0,
                transform: "scale(0.95) translateY(-4px)",
              },
            })}
          >
            {props.languages.map((language) => (
              <BaseMenu.LinkItem
                key={language.id}
                href={language.href}
                className={flex({
                  p: 2,
                  borderRadius: "md",
                  alignItems: "center",
                  color: "text.secondary",
                  justifyContent: "space-between",
                  transition: "background-color 0.15s ease-in-out",
                  _hover: { bg: "bg.hover", cursor: "pointer" },
                  "&[data-highlighted]": { bg: "bg.hover" },
                  textDecoration: "none",
                  outline: "none",
                })}
              >
                <span className={css({ fontSize: "sm", fontWeight: "medium" })}>{language.name}</span>
                {language.id === props.currentLocale && <CheckIcon />}
              </BaseMenu.LinkItem>
            ))}
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  );
}
