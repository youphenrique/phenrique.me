import { useEffect, useState } from "react";
import { type Key, ToggleButton, ToggleButtonGroup } from "react-aria-components";
import { flex } from "@/panda/patterns";

type Theme = "dark" | "light" | "system";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    setTheme(storedTheme ?? "system");
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    function onMediaChange() {
      const htmlElement = document.documentElement;
      htmlElement.classList.remove("dark", "light");
      htmlElement.classList.add(mediaQuery.matches ? "dark" : "light");
    }

    mediaQuery.addEventListener("change", onMediaChange);

    return () => mediaQuery.removeEventListener("change", onMediaChange);
  }, [theme]);

  useEffect(() => {
    function onStorageChange(event: StorageEvent) {
      if (event.key === "theme") {
        const newTheme = event.newValue as Theme;
        const htmlElement = document.documentElement;
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        htmlElement.classList.remove("dark", "light");

        if (newTheme === "dark" || newTheme === "light") {
          setTheme(newTheme);
          htmlElement.classList.add(newTheme);
        } else {
          setTheme("system");
          htmlElement.classList.add(mediaQuery.matches ? "dark" : "light");
        }
      }
    }

    window.addEventListener("storage", onStorageChange);

    return () => window.removeEventListener("storage", onStorageChange);
  }, []);

  function onSelectionChange(value: Set<Key>) {
    if (value.size === 0) return;

    const theme = value.values().next().value as Theme;

    try {
      const htmlElement = document.documentElement;
      htmlElement.classList.remove("dark", "light");

      if (theme === "system") {
        localStorage.removeItem("theme");
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        htmlElement.classList.add(mediaQuery.matches ? "dark" : "light");
      } else {
        localStorage.setItem("theme", theme);
        htmlElement.classList.add(theme === "dark" ? "dark" : "light");
      }

      setTheme(theme);
    } catch (error) {
      console.error("Failed to update theme in localStorage:", error);
    }
  }

  return (
    <ToggleButtonGroup
      selectionMode="single"
      onSelectionChange={onSelectionChange}
      selectedKeys={new Set(theme === null ? [] : [theme])}
      className={flex({
        p: "3px",
        mr: "-2px",
        w: "fit-content",
        alignItems: "center",
        borderRadius: "full",
        border: "1px dashed token(colors.clr_neutral_300_700)",
      })}
    >
      <ToggleButton
        id="light"
        className={flex({
          w: 8,
          h: 8,
          borderRadius: "full",
          alignItems: "center",
          justifyContent: "center",
          color: "clr_neutral_800_200",
          bgColor: theme === "light" ? "clr_neutral_300_700" : "transparent",
          transition: "color 0.15s ease-in-out, background-color 0.15s ease-in-out",
          _hover: { cursor: "pointer", color: "clr_neutral_900_50" },
        })}
      >
        <svg width="16" height="16" strokeLinejoin="round" viewBox="0 0 16 16">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.75 0.75V0H7.25V0.75V2V2.75H8.75V2V0.75ZM11.182 3.75732L11.7123 3.22699L12.0659 2.87344L12.5962 2.34311L13.6569 3.40377L13.1265 3.9341L12.773 4.28765L12.2426 4.81798L11.182 3.75732ZM8 10.5C9.38071 10.5 10.5 9.38071 10.5 8C10.5 6.61929 9.38071 5.5 8 5.5C6.61929 5.5 5.5 6.61929 5.5 8C5.5 9.38071 6.61929 10.5 8 10.5ZM8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12ZM13.25 7.25H14H15.25H16V8.75H15.25H14H13.25V7.25ZM0.75 7.25H0V8.75H0.75H2H2.75V7.25H2H0.75ZM2.87348 12.0659L2.34315 12.5962L3.40381 13.6569L3.93414 13.1265L4.28769 12.773L4.81802 12.2426L3.75736 11.182L3.22703 11.7123L2.87348 12.0659ZM3.75735 4.81798L3.22702 4.28765L2.87347 3.9341L2.34314 3.40377L3.4038 2.34311L3.93413 2.87344L4.28768 3.22699L4.81802 3.75732L3.75735 4.81798ZM12.0659 13.1265L12.5962 13.6569L13.6569 12.5962L13.1265 12.0659L12.773 11.7123L12.2426 11.182L11.182 12.2426L11.7123 12.773L12.0659 13.1265ZM8.75 13.25V14V15.25V16H7.25V15.25V14V13.25H8.75Z"
            fill="currentColor"
          ></path>
        </svg>
      </ToggleButton>
      <ToggleButton
        id="system"
        className={flex({
          w: 8,
          h: 8,
          borderRadius: "full",
          alignItems: "center",
          justifyContent: "center",
          color: "clr_neutral_800_200",
          bgColor: theme === "system" ? "clr_neutral_300_700" : "transparent",
          transition: "color 0.15s ease-in-out, background-color 0.15s ease-in-out",
          _hover: { cursor: "pointer", color: "clr_neutral_900_50" },
        })}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" strokeLinejoin="round">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 2C0 1.44772 0.447715 1 1 1H15C15.5523 1 16 1.44772 16 2V10.5C16 11.0523 15.5523 11.5 15 11.5H8.75V14.5H9.75H10.5V16H9.75H6.25H5.5V14.5H6.25H7.25V11.5H1C0.447714 11.5 0 11.0523 0 10.5V2ZM1.5 2.5V10H14.5V2.5H1.5Z"
            fill="currentColor"
          ></path>
        </svg>
      </ToggleButton>
      <ToggleButton
        id="dark"
        className={flex({
          w: 8,
          h: 8,
          borderRadius: "full",
          alignItems: "center",
          justifyContent: "center",
          color: "clr_neutral_800_200",
          bgColor: theme === "dark" ? "clr_neutral_300_700" : "transparent",
          transition: "color 0.15s ease-in-out, background-color 0.15s ease-in-out",
          _hover: { cursor: "pointer", color: "clr_neutral_900_50" },
        })}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" strokeLinejoin="round">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.5 8.00005C1.5 5.53089 2.99198 3.40932 5.12349 2.48889C4.88136 3.19858 4.75 3.95936 4.75 4.7501C4.75 8.61609 7.88401 11.7501 11.75 11.7501C11.8995 11.7501 12.048 11.7454 12.1953 11.7361C11.0955 13.1164 9.40047 14.0001 7.5 14.0001C4.18629 14.0001 1.5 11.3138 1.5 8.00005ZM6.41706 0.577759C2.78784 1.1031 0 4.22536 0 8.00005C0 12.1422 3.35786 15.5001 7.5 15.5001C10.5798 15.5001 13.2244 13.6438 14.3792 10.9921L13.4588 9.9797C12.9218 10.155 12.3478 10.2501 11.75 10.2501C8.71243 10.2501 6.25 7.78767 6.25 4.7501C6.25 3.63431 6.58146 2.59823 7.15111 1.73217L6.41706 0.577759ZM13.25 1V1.75V2.75L14.25 2.75H15V4.25H14.25H13.25V5.25V6H11.75V5.25V4.25H10.75L10 4.25V2.75H10.75L11.75 2.75V1.75V1H13.25Z"
            fill="currentColor"
          ></path>
        </svg>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
