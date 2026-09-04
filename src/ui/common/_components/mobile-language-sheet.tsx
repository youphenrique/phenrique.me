import { css } from "../../../../styled-system/css";
import { flex, hstack, vstack } from "../../../../styled-system/patterns";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./sheet";

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
      width="18"
      height="18"
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
      <SheetContent side="bottom" aria-describedby={undefined}>
        <div className={css({ w: 9, h: 1, mx: "auto", mt: 2, borderRadius: "full", bgColor: "clr_neutral_300_700" })} />
        <SheetHeader>
          <SheetTitle>{menuLabel}</SheetTitle>
        </SheetHeader>
        <div className={vstack({ gap: 1, px: 4, pb: "max(1rem, env(safe-area-inset-bottom))" })}>
          {languages.map((language) => {
            const isCurrent = language.id === currentLocale;

            return (
              <a
                key={language.id}
                href={language.href}
                aria-current={isCurrent ? "page" : undefined}
                className={hstack({
                  minH: 12,
                  px: 4,
                  borderRadius: "lg",
                  color: "clr_neutral_800_200",
                  justifyContent: "space-between",
                  textDecoration: "none",
                  transition: "background-color 0.15s ease-in-out",
                  _hover: { bgColor: "bg_neutral_100_700" },
                  _focusVisible: { outline: "2px solid token(colors.clr_coral_flame)", outlineOffset: "2px" },
                })}
              >
                <span className={flex({ gap: 3, alignItems: "center" })}>
                  <span className={css({ fontSize: "md", fontWeight: "medium" })}>{language.name}</span>
                  {isCurrent && (
                    <span className={css({ fontSize: "xs", color: "clr_neutral_700_400" })}>
                      {currentLocale.toUpperCase()}
                    </span>
                  )}
                </span>
                {isCurrent && (
                  <span className={css({ color: "clr_coral_flame" })}>
                    <CheckIcon />
                  </span>
                )}
              </a>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
