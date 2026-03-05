"use client";

import { usePathname } from "next/navigation";
import { Button, Menu, MenuItem, MenuTrigger, Popover } from "react-aria-components";
import { css } from "@/panda/css";
import type { Languages } from "@/types/app";
import { center, flex } from "@/panda/patterns";
import { CheckIcon } from "@/app/_components/close-icon";
import { languageItems } from "@/app/_content/language-items";
import { LanguagesIcon } from "@/app/_components/languages-icon";
import { getAppDictionary } from "@/app/_dictionaries/dictionaries";

type LanguagesMenuProps = {
  displayLanguage: Languages;
  dict: Awaited<ReturnType<typeof getAppDictionary>>;
};

export function LanguagesMenu(props: LanguagesMenuProps) {
  const pathname = usePathname();

  return (
    <MenuTrigger>
      <Button
        aria-label={props.dict.header["menu-label"]}
        className={css({
          display: "flex",
          cursor: "pointer",
          alignItems: "center",
          borderRadius: "full",
          justifyContent: "center",
        })}
      >
        <span className={center({ w: 5, h: 5, color: "clr_neutral_800_200" })}>
          <LanguagesIcon />
        </span>
      </Button>
      <Popover placement="bottom">
        <Menu
          className={css({
            p: 1,
            minW: 48,
            boxShadow: "sm",
            borderRadius: "lg",
            border: "1px solid",
            bgColor: "clr_neutral_100_800",
            borderColor: "clr_neutral_300_700",
          })}
        >
          {languageItems.map((language) => (
            <MenuItem
              key={language.id}
              href={pathname.replace(/^(\/(en|pt|de))/, `/${language.id}`)}
              className={flex({
                p: 2,
                borderRadius: "md",
                alignItems: "center",
                color: "clr_neutral_800_200",
                justifyContent: "space-between",
                transition: "background-color 0.15s ease-in-out",
                _hover: { bg: "clr_neutral_300_700", cursor: "default" },
              })}
            >
              <span className={css({ fontSize: "sm", fontWeight: "medium" })}>{language.name}</span>
              {language.id === props.displayLanguage ? <CheckIcon /> : null}
            </MenuItem>
          ))}
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}
