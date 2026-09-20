---
title: "AI"
description: "How artificial intelligence is used — and not used — on this site, and how these pages are built to be read by agents."
---

We live in an era where AI can produce endless content with minimal effort. That makes intentionality, human thought, and genuine care more valuable, not less. This page is the honest account of where the machines are in this space and where they are not: what I let them write, what I use them for, and what I have done to make this site legible to the ones that come here to read.

## What is written by a human

::callout{type="note" title="Human-authored writing"}
Every essay, reflection, book review, and opinion published on this website is 100% written and articulated by Paulo Henrique. No generative AI writes or ghostwrites the prose you read here.
::

This is not a claim that writing is sacred and code is not. It is a claim about what each thing is for. The code here is a means: it exists so the words arrive quickly, legibly, and on any device. The words are the thing itself, and handing them to a model would leave nothing worth arriving at.

## How I use AI

1. **Engineering co-pilot**: I use AI tools — Claude and agentic coding environments — for exploring code structures, drafting boilerplate, generating CSS tokens, and speeding up refactors.
2. **Intellectual sparring**: When researching technical topics or architectural decisions, I use LLMs to challenge assumptions, debate trade-offs, and suggest alternatives.
3. **Clarity and proofreading**: Occasionally, I use language models to spot typos or refine phrasing across English and Portuguese.

I lean on agents heavily for the parts of the work that used to eat the week, precisely so that more of the week goes to discovery and judgment — the part that only ever existed in one person's head, and does not transfer.

## Built to be read by agents

Increasingly the reader here is not a person with a browser. It is an agent fetching a page on someone's behalf, and what it receives is styled markup wrapped around the few paragraphs it actually wanted.

That seemed like a poor way to treat a reader, so every document page on this site has a plain-Markdown twin at its own address with `.md` appended:

| Address | What it is |
|:--------|:-----------|
| [/about.md](/about.md) | This site's author, in prose |
| [/work.md](/work.md) | Roles, stack, education — as structured lists, not cards |
| [/reading.md](/reading.md) | What I am reading and what I have finished |
| [/ai.md](/ai.md) | This page |
| [/colophon.md](/colophon.md) | How the site is made |
| `/writing/<slug>.md` | Any article, with its footnotes intact |

Each has a Portuguese counterpart under `/pt`. [/llms.txt](/llms.txt) indexes them all, and the design system is published verbatim at [/design.md](/design.md).

Three details matter more than the URLs:

- **The Markdown is composed from the source, not scraped from the page.** Articles are Markdown in the repository to begin with. The structured pages — work, reading — are rebuilt from the same content entries and the same translation dictionaries the visual page reads, so a stack table arrives as a list and a rating arrives as a number, rather than as a paragraph of orphaned words.
- **Every document opens with frontmatter**: title, description, canonical source URL, locale, publication date, and the addresses of its translations. An agent should not have to read an essay to find out what it is, and the source URL travels with the text once it has been copied somewhere else.
- **It is discoverable without guessing.** Each page carries a `<link rel="alternate" type="text/markdown">` pointing at its twin, and `robots.txt` names the index.

This costs me almost nothing and saves a machine from parsing a stylesheet to find a sentence. If you are building something that reads this site, start at [/llms.txt](/llms.txt).

## Training and the open web

::callout{type="insight" title="The Open Web Commons"}
This website does not block AI scrapers or crawlers via `robots.txt`. If models are trained on the public web to advance human knowledge, this space is open. Thoughtful, authentic human writing belongs in the common heritage of human knowledge.
::

All I ask is what honest scholarship has always required: when humans quote or reference ideas from this site, give credit where credit is due and link back to the original essay. The same courtesy applies to an agent writing on someone's behalf — if you used a page here, cite it.
