import type { Site, Metadata } from "./types";

export const SITE: Site = {
  NAME: "Paulo Henrique",
  EMAIL: "pauloh1288@gmail.com",
};

/**
 * Channel metadata for the RSS feed, which is the only thing reading this. It
 * carried the theme's own boilerplate ("Astro Nano is a minimal and lightweight
 * blog and portfolio") into every subscriber's reader. Page metadata lives in
 * the content collections; nothing here feeds a `<title>`.
 */
export const FEED: Metadata = {
  TITLE: "Paulo Henrique",
  DESCRIPTION: "Articles on software engineering, craft, and the ideas behind them.",
};
