---
title: "Colophon"
description: "How this website is made: typography, design system, and the engineering stack behind it."
---

A colophon is a statement of publication — a tradition in bookmaking and printing that describes how a work was designed, typeset, and produced. This page details the aesthetic decisions, engineering stack, and ethical boundaries that shape this website.

## Typography

Good typography is the backbone of comfortable, focused reading. This site pairs typefaces loaded via Astro's self-hosted font pipeline, ensuring zero third-party tracking, privacy by default, and no layout shifts:

- **Fraunces**: Used for display headings and article titles. A variable serif inspired by early 20th-century typefaces, configured with custom variable axes for a warm, soft touch (`SOFT: 100`, `WONK: 1`).
- **Geist**: The primary typeface for all body copy, navigation, and prose. Designed for legibility, precision, and geometric rhythm.
- **Geist Mono**: Used for code blocks, commit hashes, metadata badges, and technical labels.
- **Instrument Serif**: Reserved for subtle editorial accents and hero moments.

## Design & Color System

The aesthetic of this site is rooted in tactile, paper-like materials rather than flat, sterile digital canvases.

- **Canvas & Grain**: A subtle paper-grain texture layered onto a warm cream canvas (`sand` palette) in light mode and deep obsidian (`ink` palette) in dark mode.
- **Semantic Tokens**: Every color is expressed through Panda CSS semantic roles (`bg.*`, `text.*`, `border.*`, `accent.*`, `status.*`). No raw hex values or ad-hoc transparency are used in components.
- **Accessible Contrast**: Headings and body copy meet WCAG AA standards, with focus indicators explicitly styled using `border.focus` for keyboard accessibility.

For developers and agents interested in the token architecture, the full design system specification is published verbatim at [/design.md](/design.md).

## Technology Stack

This website is statically pre-rendered, prioritizing minimal client-side JavaScript, speed, and durability:

- **Framework**: [Astro](https://astro.build), operating in static output mode.
- **Styling**: [Panda CSS](https://panda-css.com), generating build-time CSS with zero runtime overhead.
- **Content & Markdown**: Astro Content Layer with Markdown parsed and rendered by [Comark](https://comark.dev).
- **Hosting**: Deployed globally on [Vercel](https://vercel.com).
- **Analytics**: Privacy-friendly analytics with zero tracking cookies or invasive finger-printing.

## Artificial Intelligence

Where AI is used on this site, where it is not, and how these pages are made readable by agents, is set out on its own page: [AI](/ai).

The short version: the prose is entirely human-authored, and every document here is also published as plain Markdown for machines that would rather not parse a stylesheet.

## License & Excerpts

All content on this site is the intellectual work of Paulo Henrique.

You are welcome and encouraged to quote excerpts with proper attribution and a link back to the original page. Full republishing, translations, or commercial usage require prior written consent.
