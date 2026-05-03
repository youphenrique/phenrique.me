import * as React from "react";
import { Menu as BaseMenu } from "@base-ui/react/menu";

import { css } from "../../../../styled-system/css";
import { languages } from "../../../utils/constants.ts";
import type { LinkbioDictionary } from "../../../i18n/linkbio/en.ts";
import { hstack } from "../../../../styled-system/patterns";

interface ShareLink {
  id: string;
  name: string;
  href: string;
  iconHtml: string;
}

interface TopMenuProps {
  currentLocale: string;
  dict: LinkbioDictionary;
  linkbioUrl: string;
  shareLinks: ShareLink[];
  icons: {
    check: string;
    copy: string;
    external: string;
    menu: string;
  };
}

const labelClass = css({
  p: 2,
  fontSize: "xs",
  color: "#fffcf4b0",
  fontWeight: "medium",
  textTransform: "uppercase",
});

const shareItemClass = hstack({
  p: 2,
  width: "full",
  color: "#EEE",
  borderRadius: "md",
  display: "flex",
  alignItems: "center",
  transition: "background-color 0.15s ease-in-out",
  _hover: { bg: "neutral.700", cursor: "default" },
  textDecoration: "none",
  textAlign: "left",
  background: "none",
  border: "none",
  font: "inherit",
  gap: 2,
  "&[data-highlighted]": {
    bg: "neutral.700",
  },
});

const shareIconClass = css({ w: 6, h: 6 });

function HtmlIcon({ className, html }: { className?: string; html: string }) {
  return <span aria-hidden="true" className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function TopMenu(props: TopMenuProps) {
  function handleCopyLink() {
    if (!("clipboard" in navigator)) {
      console.warn("Clipboard write failed");
      return;
    }

    void navigator.clipboard.writeText(props.linkbioUrl).then(
      () => {
        // toastManager.add({ title: "Link copied to clipboard" });
      },
      () => {
        console.warn("Clipboard write failed");
      },
    );
  }

  return (
    <div
      lang={props.currentLocale}
      className={css({
        mb: 6,
        display: "flex",
        justifyContent: "flex-end",
      })}
    >
      <BaseMenu.Root modal={false}>
        <BaseMenu.Trigger
          aria-label={props.dict["top-menu"]["menu-label"]}
          id="top-menu-trigger"
          className={css({
            width: 10,
            height: 10,
            display: "flex",
            cursor: "pointer",
            alignItems: "center",
            borderRadius: "full",
            justifyContent: "center",
            backgroundColor: "zinc.800",
            transition: "background-color 0.15s ease-in-out",
            _hover: {
              backgroundColor: "zinc.900",
            },
            "&[data-popup-open]": {
              backgroundColor: "zinc.900",
            },
          })}
        >
          <HtmlIcon
            className={css({
              width: 5,
              height: 5,
              display: "block",
              color: "white",
            })}
            html={props.icons.menu}
          />
        </BaseMenu.Trigger>

        <BaseMenu.Portal>
          <BaseMenu.Positioner
            id="top-menu-popover"
            align="end"
            sideOffset={8}
            className={css({ zIndex: 20, outline: "none" })}
          >
            <BaseMenu.Popup
              className={css({
                m: 0,
                p: 1,
                minW: 48,
                boxShadow: "2xl",
                borderRadius: "lg",
                border: "1px solid",
                bg: "neutral.800",
                borderColor: "rgb(37, 37, 37)",
                outline: "none",
              })}
            >
              <BaseMenu.Group>
                <BaseMenu.GroupLabel className={labelClass}>{props.dict["top-menu"].menu.language}</BaseMenu.GroupLabel>

                {languages.map((language) => (
                  <BaseMenu.LinkItem
                    key={language.id}
                    href={language.id === "en" ? "/linkbio" : `/${language.id}/linkbio`}
                    className={css({
                      p: 2,
                      width: "full",
                      color: "#EEE",
                      borderRadius: "md",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      transition: "background-color 0.15s ease-in-out",
                      _hover: { bg: "neutral.700", cursor: "default" },
                      "&[data-highlighted]": {
                        bg: "neutral.700",
                      },
                      textDecoration: "none",
                      textAlign: "left",
                      background: "none",
                      border: "none",
                      font: "inherit",
                    })}
                  >
                    <span>{language.name}</span>
                    {language.id === props.currentLocale && <HtmlIcon html={props.icons.check} />}
                  </BaseMenu.LinkItem>
                ))}
              </BaseMenu.Group>

              <BaseMenu.Separator
                className={css({
                  height: "1px",
                  mx: 2,
                  my: 1,
                  bg: "zinc.700",
                })}
              />

              <BaseMenu.Group>
                <BaseMenu.GroupLabel className={labelClass}>{props.dict["top-menu"].menu.share}</BaseMenu.GroupLabel>

                <BaseMenu.Item closeOnClick={false} onClick={handleCopyLink} className={shareItemClass}>
                  <HtmlIcon className={shareIconClass} html={props.icons.copy} />
                  <span>{props.dict["top-menu"].menu.copy}</span>
                </BaseMenu.Item>

                {props.shareLinks.map((item) => (
                  <BaseMenu.LinkItem key={item.id} className={shareItemClass} href={item.href} target="_blank">
                    <HtmlIcon className={shareIconClass} html={item.iconHtml} />
                    <span>{item.name}</span>
                    <HtmlIcon
                      className={css({ top: -2, left: -1.5, position: "relative" })}
                      html={props.icons.external}
                    />
                  </BaseMenu.LinkItem>
                ))}
              </BaseMenu.Group>
            </BaseMenu.Popup>
          </BaseMenu.Positioner>
        </BaseMenu.Portal>
      </BaseMenu.Root>
    </div>
  );
}
