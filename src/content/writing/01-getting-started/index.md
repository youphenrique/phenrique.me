---
title: "Interfaces are arguments"
description: "Why frontend work is less about decoration than helping people form accurate mental models."
slug: "interfaces-are-arguments"
locale: "en"
date: "2026-08-28"
draft: true
---

I used to think frontend work began after the real engineering was finished. The API had to work; the data model had to survive contact with reality; the interface merely needed to make those things available.

That account is comforting and wrong. An interface does not simply *show* a system. It proposes a way to understand it. Its labels, defaults, empty states, errors, and sequence of actions make an argument about what matters and what a person should do next.

## The model a person carries

When I build a product, I try to ask a question before I ask which component to use: **what model of this system should someone leave with?**

That question has practical consequences. A good interface makes the important state visible, uses language that belongs to the person using it, and gives feedback soon enough to preserve confidence. A beautiful screen that obscures the next step is still a poor argument.

> Craft in user interfaces is a form of care. It says: I considered the context in which you are arriving, and I did not make you carry unnecessary uncertainty.

## Start with the state, not the screen

On a recent feature, the tempting first move was to sketch a rich dashboard. The better move was to name the states the person would actually encounter:

- loading, when the system has not yet earned trust;
- empty, when there is nothing to act on;
- ready, when the main task should be obvious;
- interrupted, when recovery matters more than polish.

The implementation became smaller once those states were explicit:

```ts [save-profile.ts]
type SaveResult = { ok: true } | { ok: false; reason: "offline" | "invalid" };

export function messageFor(result: SaveResult) {
  if (result.ok) return "Your changes are saved.";
  if (result.reason === "offline") return "You’re offline. We’ll retry when you reconnect.";
  return "Please review the highlighted fields.";
}
```

Notice what the code refuses to do: it does not collapse every failure into “Something went wrong.” Specificity is not a luxury. It is how software helps a person make a competent next move.

## A small review rubric

Before I call an interface finished, I look for evidence of these things:

| Question                          | What I am looking for                                                     |
|:----------------------------------|:--------------------------------------------------------------------------|
| Is the purpose clear?             | A first-time visitor can say what this page is for.                       |
| Is the state honest?              | The UI does not imply success, freshness, or permission it does not have. |
| Is the next action proportionate? | The most likely task is easier than the exceptional one.                  |
| Is recovery possible?             | Errors explain what happened and preserve useful work.                    |

The details matter: the [Web Content Accessibility Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/) are not a final compliance pass, but part of the discipline of making meaning available to more people.

Good frontend engineering joins systems thinking with editorial judgment. The screen is where the system makes a promise. Our job is to make that promise intelligible—and, as far as we can, true.
