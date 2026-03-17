"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Fragment, useEffect, useState, useRef } from "react";
import { Separator, ToggleButton } from "react-aria-components";

import { css } from "@/panda/css";
import type { Languages } from "@/types/app";
import type { MediaData } from "@/types/basehub";
import { center, flex, hstack, vstack } from "@/panda/patterns";
import { useMediaQuery } from "@/app/_hooks/use-media-query";
import { languageItems } from "@/app/_data/language-items";
import { LanguagesIcon } from "@/app/_components/languages-icon";
import { getAppDictionary } from "@/app/_dictionaries/dictionaries";
import { ThemeToggle } from "@/app/[lang]/(main)/_components/header/theme-toggle";
import { LanguagesMenu } from "@/app/[lang]/(main)/_components/header/languages-menu";

type NavLink = {
  _title: string;
  label: string;
  path: string;
  icon: string | null;
};

type NavLinks = {
  items: NavLink[];
};

type CHeaderProps = {
  avatar: MediaData;
  navLinks: NavLinks;
  displayLanguage: Languages;
  dict: Awaited<ReturnType<typeof getAppDictionary>>;
};

export function CHeader(props: CHeaderProps) {
  const pathname = usePathname();
  const lastScrollY = useRef(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const isSMScreen = useMediaQuery("(min-width: 640px)");

  useEffect(() => {
    if (isSMScreen && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isSMScreen, isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    function handleScroll() {
      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        const currentScrollY = window.scrollY;
        const scrollDifference = Math.abs(currentScrollY - lastScrollY.current);

        if (currentScrollY > lastScrollY.current && scrollDifference > 50) {
          setIsHeaderVisible(false);
          if (isMenuOpen) {
            setIsMenuOpen(false);
          }
        } else if (scrollDifference > 50 || currentScrollY < 10) {
          setIsHeaderVisible(true);
        }

        lastScrollY.current = currentScrollY;
      }, 50); // Small debounce for better performance
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [isMenuOpen]);

  return (
    <div
      data-component="header"
      className={flex({
        top: 4,
        zIndex: 2,
        width: "100%",
        position: "fixed",
        transition: "transform 0.3s ease",
        transform: isHeaderVisible ? "translateY(0)" : "translateY(-4.5rem)",
      })}
    >
      <header className={css({ w: "full", px: { base: 5, md: 0 } })}>
        <motion.div
          variants={{
            open: { height: "auto", borderRadius: "1.875rem" },
            closed: { height: "3.5rem", borderRadius: "2rem" },
          }}
          initial="closed"
          transition={{ duration: 0.3 }}
          style={{ backdropFilter: "blur(8px)" }}
          animate={isMenuOpen ? "open" : "closed"}
          className={vstack({
            mx: "auto",
            overflow: "hidden",
            alignItems: "stretch",
            bgColor: "clr_neutral_100_950_alpha_20",
            w: { base: "full", sm: "fit-content" },
            border: "1px solid token(colors.clr_neutral_300_700)",
          })}
        >
          <motion.div
            initial="closed"
            animate={isMenuOpen ? "open" : "closed"}
            variants={{
              open: { paddingTop: "16px", paddingInline: "18px" },
              closed: { paddingTop: "7px", paddingInline: "12px" },
            }}
            className={flex({ alignItems: "center" })}
          >
            <div className={hstack({ gap: 6 })}>
              <Link
                href={`/${props.displayLanguage}`}
                className={css({
                  h: 10,
                  w: 10,
                  borderRadius: "full",
                  border: "2px solid token(colors.clr_coral_flame)",
                })}
              >
                <Image
                  priority
                  src={props.avatar.url}
                  width={props.avatar.width}
                  height={props.avatar.height}
                  alt={props.avatar.alt ?? "Avatar"}
                  className={css({
                    border: "1px solid",
                    borderRadius: "full",
                    borderColor: "neutral.900",
                  })}
                />
              </Link>
              <div
                className={css({
                  height: 5,
                  width: "1px",
                  hideBelow: "sm",
                  bgColor: "clr_neutral_300_700",
                })}
              />
            </div>
            <nav className={hstack({ gap: 4, fontSize: "sm", px: 5, hideBelow: "sm" })}>
              {props.navLinks.items.map((link, index) => (
                <Link
                  key={link._title}
                  href={`/${props.displayLanguage}` + link.path}
                  className={css({
                    pointerEvents:
                      link.path !== "/reading" && link.path !== "/about" ? "none" : "default", // Remove later when menu pages are ready
                    p: 1.5,
                    position: "relative",
                    fontWeight: "medium",
                    color: "clr_neutral_800_200",
                    transition: "color 0.15s ease-in-out",
                    _hover: { color: "clr_coral_flame" },
                  })}
                >
                  {link.label}
                  {(pathname.includes("reading") && index === 3) ||
                  (pathname.includes("about") && index === 0) ? (
                    <span
                      className={css({
                        left: 0,
                        right: 0,
                        height: "2px",
                        bottom: "-11px",
                        bgGradient: "to-r",
                        position: "absolute",
                        gradientFrom: "red.400/0",
                        gradientVia: "red.400/40",
                        gradientTo: "red.400/0",
                      })}
                    />
                  ) : null}
                  {link.path !== "/" && link.path !== "/reading" && link.path !== "/about" ? (
                    <span
                      className={css({
                        position: "absolute",
                        top: "-8px",
                        right: "-16px",
                        fontSize: "xs",
                        fontWeight: "semibold",
                        color: "white",
                        bg: "clr_coral_flame",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: "full",
                        transform: "rotate(10deg)",
                      })}
                    >
                      {props.dict.header["soon-link"]}
                    </span>
                  ) : null}
                </Link>
              ))}
            </nav>
            <div className={flex({ hideFrom: "sm", flex: 1, justifyContent: "flex-end" })}>
              <ToggleButton
                isSelected={isMenuOpen}
                onChange={setIsMenuOpen}
                aria-label="Menu"
                className={vstack({
                  ml: 6,
                  width: 10,
                  height: 10,
                  borderRadius: "full",
                  border: "1px dashed",
                  borderColor: "clr_neutral_300_700",
                  justifyContent: "center",
                  position: "relative",
                  cursor: "pointer",
                })}
              >
                <motion.span
                  transition={{ duration: 0.2 }}
                  animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 0 : -4 }}
                  className={css({
                    width: 5,
                    height: "1px",
                    position: "absolute",
                    bg: "clr_neutral_950_snow",
                  })}
                />
                <motion.span
                  transition={{ duration: 0.2 }}
                  animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? 0 : 4 }}
                  className={css({
                    width: 5,
                    height: "1px",
                    position: "absolute",
                    bg: "clr_neutral_950_snow",
                  })}
                />
              </ToggleButton>
            </div>
            <div className={hstack({ gap: 6, hideBelow: "sm" })}>
              <div
                className={css({
                  height: 5,
                  width: "1px",
                  bgColor: "clr_neutral_300_700",
                })}
              />
              <LanguagesMenu displayLanguage={props.displayLanguage} dict={props.dict} />
              <ThemeToggle />
            </div>
          </motion.div>
          <AnimatePresence>
            {isMenuOpen ? (
              <motion.div
                exit={{ height: 0 }}
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                transition={{ duration: 0.3 }}
                className={css({ pb: 4 })}
              >
                <motion.nav
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className={css({
                    mb: 4,
                    pt: 4,
                    gap: 3,
                    px: "1rem",
                    display: "grid",
                    overflow: "hidden",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  })}
                >
                  {props.navLinks.items.map((link) => (
                    <Link
                      key={link._title}
                      href={`/${props.displayLanguage}` + link.path}
                      className={hstack({
                        pointerEvents:
                          link.path !== "/reading" && link.path !== "/about" ? "none" : "default", // Remove later when menu pages are ready
                        p: 1.5,
                        fontSize: "sm",
                        position: "relative",
                        fontWeight: "medium",
                        color: "clr_neutral_800_200",
                        transition: "color 0.15s ease-in-out",
                        _hover: { color: "clr_coral_flame" },
                      })}
                    >
                      <span dangerouslySetInnerHTML={{ __html: link.icon! }} />
                      {link.label}
                      {link.path !== "/" && link.path !== "/reading" && link.path !== "/about" ? (
                        <span
                          className={css({
                            position: "absolute",
                            top: "-8px",
                            left: 16,
                            fontSize: "xs",
                            fontWeight: "bold",
                            color: "white",
                            bg: "clr_coral_flame",
                            px: 1.5,
                            py: 0.5,
                            borderRadius: "full",
                            transform: "rotate(10deg)",
                          })}
                        >
                          {props.dict.header["soon-link"]}
                        </span>
                      ) : null}
                    </Link>
                  ))}
                </motion.nav>
                <motion.div
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className={flex({
                    alignItems: "center",
                    justifyContent: "space-between",
                    pt: 5,
                    px: 5,
                  })}
                >
                  <div className={hstack({ gap: 5 })}>
                    <span className={center({ w: 5, h: 5, color: "clr_neutral_800_200" })}>
                      <LanguagesIcon />
                    </span>
                    <div className={hstack({ gap: 2 })}>
                      {languageItems.map((language, index) => (
                        <Fragment key={language.id}>
                          {index !== 0 ? (
                            <Separator
                              orientation="vertical"
                              className={css({
                                height: 5,
                                width: "1px",
                                bgColor: "clr_neutral_300_700",
                              })}
                            />
                          ) : null}
                          <Link
                            key={language.id}
                            href={pathname.replace(/^(\/(en|pt|de))/, `/${language.id}`)}
                            className={css({
                              fontWeight: "semibold",
                              color:
                                props.displayLanguage === language.id
                                  ? "clr_neutral_900_50"
                                  : "clr_neutral_400_500",
                            })}
                          >
                            {language.id}
                          </Link>
                        </Fragment>
                      ))}
                    </div>
                  </div>
                  <ThemeToggle />
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </header>
    </div>
  );
}
