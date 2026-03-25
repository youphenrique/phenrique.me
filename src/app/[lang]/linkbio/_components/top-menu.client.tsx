"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Button, Header, Popover, MenuItem, MenuSection, MenuTrigger } from "react-aria-components";
import { css } from "@/panda/css";
import type { Languages } from "@/app/_types/app";
import { flex, hstack } from "@/panda/patterns";
import { MenuIcon } from "@/app/_components/menu-icon";
import { CheckIcon } from "@/app/_components/close-icon";
import { languageItems } from "@/app/_data/language-items";
import { getLinkbioDictionary } from "@/app/[lang]/linkbio/_dictionaries/dictionaries";

const shareLinks = [
  {
    id: "x-twitter",
    name: "X (Twitter)",
    link: (text: string) => `https://x.com/intent/tweet?text=${text}! - https://phenrique.me/linkbio`,
    icon: (
      <svg viewBox="0 0 48 48">
        <circle cx="50%" cy="50%" r="50%" fill="black"></circle>
        <path
          d="M11.559 12.251L20.825 25.1736L11.5 35.6775H13.6L21.763 26.4794L28.359 35.6786H35.5L25.712 22.029L34.392 12.25H32.293L24.775 20.7211L18.7 12.251H11.559ZM14.645 13.8625H17.925L32.413 34.0661H29.133L14.644 13.8635L14.645 13.8625Z"
          fill="white"
        ></path>
      </svg>
    ),
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    link: (text: string) => `https://wa.me/?text=${text}! - https://phenrique.me/linkbio`,
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="50%" cy="50%" r="50%" fill="#22C55E"></circle>
        <path
          d="M16.201 7.746a5.9 5.9 0 0 0-4.205-1.745c-3.276 0-5.945 2.669-5.948 5.945 0 1.049.274 2.07.793 2.973L6 18.001l3.153-.826a5.95 5.95 0 0 0 2.843.724h.003c3.275 0 5.944-2.669 5.947-5.948A5.92 5.92 0 0 0 16.2 7.746m-4.205 9.146c-.89 0-1.76-.24-2.518-.69l-.18-.108-1.87.49.5-1.824-.118-.188a4.9 4.9 0 0 1-.755-2.63 4.95 4.95 0 0 1 4.944-4.937c1.32 0 2.56.516 3.495 1.448a4.92 4.92 0 0 1 1.445 3.496 4.95 4.95 0 0 1-4.943 4.943m2.711-3.7a27 27 0 0 0-1.015-.485c-.137-.049-.236-.074-.334.074-.1.148-.384.485-.47.582-.085.1-.174.11-.322.037s-.627-.231-1.195-.739a4.5 4.5 0 0 1-.827-1.029c-.085-.148-.008-.228.066-.302.066-.066.148-.174.223-.26.074-.085.1-.148.148-.248s.025-.185-.012-.259-.333-.807-.459-1.103c-.12-.291-.242-.251-.333-.254C10.09 9.2 9.99 9.2 9.892 9.2c-.1 0-.26.037-.397.185-.136.149-.519.508-.519 1.24 0 .733.534 1.438.608 1.537.074.1 1.046 1.6 2.537 2.244.354.154.63.245.847.314.356.114.678.097.935.06.285-.043.878-.36 1.004-.707.122-.348.122-.645.085-.707-.037-.063-.137-.1-.285-.174"
          fill="#fff"
        ></path>
      </svg>
    ),
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    link: (_: string) => "https://www.linkedin.com/sharing/share-offsite/?url=https://phenrique.me/linkbio",
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="50%" cy="50%" r="50%" fill="#0A66C2"></circle>
        <path
          d="M8.656 10.132h-2.46V18h2.46zm.221-2.705A1.417 1.417 0 0 0 7.47 6h-.044a1.426 1.426 0 0 0 0 2.852A1.416 1.416 0 0 0 8.877 7.47zM18 13.22c0-2.365-1.505-3.285-3-3.285a2.8 2.8 0 0 0-2.488 1.269h-.07v-1.072h-2.31V18h2.458v-4.186a1.633 1.633 0 0 1 1.476-1.76h.093c.782 0 1.362.492 1.362 1.731V18h2.46z"
          fill="#fff"
        ></path>
      </svg>
    ),
  },
  {
    id: "email",
    name: "E-mail",
    link: (text: string) => `mailto:?subject=${text}! &body= ${text} - https://phenrique.me/linkbio`,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#60696c" />
        <g transform="translate(4.5 4.5)">
          <path
            d="M1 2C0.447715 2 0 2.44772 0 3V12C0 12.5523 0.447715 13 1 13H14C14.5523 13 15 12.5523 15 12V3C15 2.44772 14.5523 2 14 2H1ZM1 3L14 3V3.92494C13.9174 3.92486 13.8338 3.94751 13.7589 3.99505L7.5 7.96703L1.24112 3.99505C1.16621 3.94751 1.0826 3.92486 1 3.92494V3ZM1 4.90797V12H14V4.90797L7.74112 8.87995C7.59394 8.97335 7.40606 8.97335 7.25888 8.87995L1 4.90797Z"
            fill="white"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </g>
      </svg>
    ),
  },
];

type TopMenuClientProps = {
  displayLanguage: Languages;
  dict: Awaited<ReturnType<typeof getLinkbioDictionary>>;
};

export function TopMenuClient(props: TopMenuClientProps) {
  const [isToastShown, setIsToastShown] = useState(false);

  function onCopyLinkbio() {
    if (!isToastShown) {
      navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_SITE_URL}/${props.displayLanguage}/linkbio`).then(
        () => {
          setIsToastShown(true);
          setTimeout(() => {
            setIsToastShown(false);
          }, 2500);
        },
        () => {
          console.log("clipboard write failed");
        },
      );
    }
  }

  return (
    <>
      <MenuTrigger>
        <Button
          aria-label={props.dict["top-menu"]["menu-label"]}
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
          })}
        >
          <span
            className={css({
              width: 5,
              height: 5,
              display: "block",
            })}
          >
            <MenuIcon />
          </span>
        </Button>
        <Popover placement="bottom right">
          <Menu
            className={css({
              p: 1,
              minW: 48,
              boxShadow: "2xl",
              borderRadius: "lg",
              border: "1px solid",
              bg: "neutral.800",
              borderColor: "rgb(37, 37, 37)",
            })}
          >
            <MenuSection>
              <Header
                className={css({
                  p: 2,
                  fontSize: "xs",
                  color: "#fffcf4b0",
                  fontWeight: "medium",
                  textTransform: "uppercase",
                })}
              >
                {props.dict["top-menu"].menu.language}
              </Header>
              {languageItems.map((language) => (
                <MenuItem
                  key={language.id}
                  href={`/${language.id}/linkbio`}
                  className={flex({
                    p: 2,
                    color: "#EEE",
                    borderRadius: "md",
                    alignItems: "center",
                    justifyContent: "space-between",
                    transition: "background-color 0.15s ease-in-out",
                    _hover: { bg: "neutral.700", cursor: "default" },
                  })}
                >
                  <span>{language.name}</span>
                  {language.id === props.displayLanguage ? <CheckIcon /> : null}
                </MenuItem>
              ))}
            </MenuSection>
            <MenuSection>
              <Header
                className={css({
                  p: 2,
                  fontSize: "xs",
                  color: "#fffcf4b0",
                  fontWeight: "medium",
                  textTransform: "uppercase",
                })}
              >
                {props.dict["top-menu"].menu.share}
              </Header>
              <MenuItem
                onAction={() => onCopyLinkbio()}
                className={hstack({
                  p: 2,
                  color: "#EEE",
                  borderRadius: "md",
                  transition: "background-color 0.15s ease-in-out",
                  _hover: { bg: "neutral.700", cursor: "default" },
                })}
              >
                <div className={css({ w: 6, h: 6 })}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#e0e2d9" />
                    <g transform="translate(4.5 4.5)">
                      <path
                        d="M4.62471 4.00001L4.56402 4.00001C4.04134 3.99993 3.70687 3.99988 3.4182 4.055C2.2379 4.28039 1.29846 5.17053 1.05815 6.33035C0.999538 6.61321 0.999604 6.93998 0.999703 7.43689L0.999711 7.50001L0.999703 7.56313C0.999604 8.06004 0.999538 8.38681 1.05815 8.66967C1.29846 9.8295 2.2379 10.7196 3.4182 10.945C3.70688 11.0001 4.04135 11.0001 4.56403 11L4.62471 11H5.49971C5.77585 11 5.99971 10.7762 5.99971 10.5C5.99971 10.2239 5.77585 10 5.49971 10H4.62471C4.02084 10 3.78907 9.99777 3.60577 9.96277C2.80262 9.8094 2.19157 9.21108 2.03735 8.46678C2.00233 8.29778 1.99971 8.08251 1.99971 7.50001C1.99971 6.91752 2.00233 6.70225 2.03735 6.53324C2.19157 5.78895 2.80262 5.19062 3.60577 5.03725C3.78907 5.00225 4.02084 5.00001 4.62471 5.00001H5.49971C5.77585 5.00001 5.99971 4.77615 5.99971 4.50001C5.99971 4.22387 5.77585 4.00001 5.49971 4.00001H4.62471ZM10.3747 5.00001C10.9786 5.00001 11.2104 5.00225 11.3937 5.03725C12.1968 5.19062 12.8079 5.78895 12.9621 6.53324C12.9971 6.70225 12.9997 6.91752 12.9997 7.50001C12.9997 8.08251 12.9971 8.29778 12.9621 8.46678C12.8079 9.21108 12.1968 9.8094 11.3937 9.96277C11.2104 9.99777 10.9786 10 10.3747 10H9.49971C9.22357 10 8.99971 10.2239 8.99971 10.5C8.99971 10.7762 9.22357 11 9.49971 11H10.3747L10.4354 11C10.9581 11.0001 11.2925 11.0001 11.5812 10.945C12.7615 10.7196 13.701 9.8295 13.9413 8.66967C13.9999 8.38681 13.9998 8.06005 13.9997 7.56314L13.9997 7.50001L13.9997 7.43688C13.9998 6.93998 13.9999 6.61321 13.9413 6.33035C13.701 5.17053 12.7615 4.28039 11.5812 4.055C11.2925 3.99988 10.9581 3.99993 10.4354 4.00001L10.3747 4.00001H9.49971C9.22357 4.00001 8.99971 4.22387 8.99971 4.50001C8.99971 4.77615 9.22357 5.00001 9.49971 5.00001H10.3747ZM5.00038 7C4.72424 7 4.50038 7.22386 4.50038 7.5C4.50038 7.77614 4.72424 8 5.00038 8H10.0004C10.2765 8 10.5004 7.77614 10.5004 7.5C10.5004 7.22386 10.2765 7 10.0004 7H5.00038Z"
                        fill="black"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      />
                    </g>
                  </svg>
                </div>
                <span>{props.dict["top-menu"].menu.copy}</span>
              </MenuItem>
              {shareLinks.map((item) => (
                <MenuItem
                  key={item.id}
                  href={item.link(props.dict["top-menu"].menu["link-text"])}
                  target="_blank"
                  className={hstack({
                    p: 2,
                    color: "#EEE",
                    borderRadius: "md",
                    transition: "background-color 0.15s ease-in-out",
                    _hover: { bg: "neutral.700" },
                  })}
                >
                  <div className={css({ w: 6, h: 6 })}>{item.icon}</div>
                  <span>{item.name}</span>
                  <svg
                    width="7"
                    height="7"
                    viewBox="0 0 6 6"
                    aria-hidden="true"
                    className={css({
                      top: -2,
                      left: -1.5,
                      position: "relative",
                    })}
                  >
                    <path
                      d="M1.25215 5.54731L0.622742 4.9179L3.78169 1.75597H1.3834L1.38936 0.890915H5.27615V4.78069H4.40513L4.41109 2.38538L1.25215 5.54731Z"
                      fill="#EEE"
                    ></path>
                  </svg>
                </MenuItem>
              ))}
            </MenuSection>
          </Menu>
        </Popover>
      </MenuTrigger>
      <AnimatePresence>
        {isToastShown ? (
          <motion.div
            layout
            role="alertdialog"
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className={css({
              bottom: 4,
              right: 4,
              fontSize: "sm",
              position: "fixed",
              padding: "10px 14px",
              color: "neutral.50",
              borderRadius: "8px",
              fontWeight: "medium",
              bgColor: "neutral.950",
              border: "1px solid rgb(42, 42, 42)",
            })}
          >
            {props.dict.toast.feedback}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
