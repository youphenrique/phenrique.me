---
title: "Colophon"
description: "How this website is made: typography, design system, engineering stack, and my approach to craft and artificial intelligence."
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

## Artificial Intelligence & Craft

We live in an era where AI can produce endless content with minimal effort. This makes intentionality, human thought, and genuine care more valuable, not less. Here is how artificial intelligence intersects with this space:

::callout{type="note" title="Human-authored writing"}
Every essay, reflection, book review, and opinion published on this website is 100% written and articulated by Paulo Henrique. No generative AI writes or ghostwrites the prose you read here.
::

### How I use AI

1. **Engineering Co-pilot**: I use AI tools (such as Claude and agentic coding environments) for exploring code structures, drafting boilerplate, generating CSS tokens, and speeding up refactors.
2. **Intellectual Sparring**: When researching technical topics or architectural decisions, I use LLMs to challenge assumptions, debate trade-offs, and suggest alternatives.
3. **Clarity & Proofreading**: Occasionally, I use language models to spot typos or refine phrasing across English and Portuguese.

### AI Training & The Open Web

::callout{type="insight" title="The Open Web Commons"}
This website does not block AI scrapers or crawlers via `robots.txt`. If models are trained on the public web to advance human knowledge, this space is open. Thoughtful, authentic human writing belongs in the common heritage of human knowledge.
::

All I ask is what honest scholarship has always required: when humans quote or reference ideas from this site, give credit where credit is due and link back to the original essay.

## License & Excerpts

All content on this site is the intellectual work of Paulo Henrique.

You are welcome and encouraged to quote excerpts with proper attribution and a link back to the original page. Full republishing, translations, or commercial usage require prior written consent.
