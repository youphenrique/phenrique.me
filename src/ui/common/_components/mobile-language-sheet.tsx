import { css } from "../../../../styled-system/css";
import { Sheet, SheetContent, SheetGrabber, SheetHeader, SheetTitle, SheetTrigger } from "./sheet";

interface LanguageOption {
  id: string;
  name: string;
  href: string;
}

interface MobileLanguageSheetProps {
  currentLocale: string;
  menuLabel: string;
  languages: LanguageOption[];
}

function GlobeIcon() {
  return (
    <svg
      aria-hidden="true"
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
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default function MobileLanguageSheet({ currentLocale, languages, menuLabel }: MobileLanguageSheetProps) {
  return (
    <Sheet>
      <SheetTrigger
        aria-label={menuLabel}
        className={css({
          display: "flex",
          w: 10,
          h: 10,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "full",
          color: "clr_neutral_800_200",
          transition: "color 0.15s ease-in-out, background-color 0.15s ease-in-out",
          _hover: { color: "clr_neutral_900_50", bgColor: "bg_neutral_100_700", cursor: "pointer" },
          _focusVisible: { outline: "2px solid token(colors.clr_coral_flame)", outlineOffset: "2px" },
        })}
      >
        <GlobeIcon />
      </SheetTrigger>

      <SheetContent side="bottom" closeButtonSide="left" aria-describedby={undefined}>
        <SheetGrabber />

        {/* Horizontal padding clears the absolutely positioned close button so the
            title stays optically centred, as it is on a native iOS sheet. */}
        <SheetHeader className={css({ px: "3.5rem", pt: 3, pb: 4 })}>
          <SheetTitle className={css({ fontSize: "17px", letterSpacing: "-0.01em" })}>{menuLabel}</SheetTitle>
        </SheetHeader>

        {/* iOS inset grouped list: one rounded card, hairline-separated rows. */}
        <ul
          className={css({
            mx: 4,
            mt: 6,
            mb: "max(1.25rem, env(safe-area-inset-bottom))",
            listStyle: "none",
            borderRadius: "0.875rem",
            bgColor: "clr_sheet_group_bg",
            overflowY: "auto",
            overscrollBehavior: "contain",
            WebkitOverflowScrolling: "touch",
          })}
        >
          {languages.map((language) => {
            const isCurrent = language.id === currentLocale;

            return (
              <li
                key={language.id}
                className={css({
                  position: "relative",
                  // Hairline inset from the text edge, iOS-style, and never on the last row.
                  "&:not(:last-child)::after": {
                    content: "''",
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                    left: "1rem",
                    mr: "1rem",
                    h: "1px",
                    bgColor: "clr_sheet_separator",
                  },
                })}
              >
                <a
                  href={language.href}
                  aria-current={isCurrent ? "page" : undefined}
                  className={css({
                    position: "relative",
                    display: "flex",
                    minH: "52px",
                    px: 4,
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 3,
                    fontSize: "17px",
                    fontWeight: isCurrent ? "semibold" : "normal",
                    letterSpacing: "-0.01em",
                    color: "clr_neutral_900_50",
                    textDecoration: "none",
                    transition: "background-color 0.12s ease-out",
                    _active: { bgColor: "clr_sheet_group_bg_active" },
                    _focusVisible: { outline: "2px solid token(colors.clr_coral_flame)", outlineOffset: "-2px" },
                  })}
                >
                  <span>{language.name}</span>
                  {isCurrent && (
                    <span className={css({ display: "flex", color: "clr_coral_flame" })}>
                      <CheckIcon />
                    </span>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
