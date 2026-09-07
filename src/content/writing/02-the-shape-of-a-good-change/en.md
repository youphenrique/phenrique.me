---
title: "The shape of a good change"
description: "A practical way to make software changes that are easier to reason about, review, and reverse."
slug: "the-shape-of-a-good-change"
locale: "en"
date: "2026-08-21"
---

Most difficult changes are not difficult because the code is long. They are difficult because the consequences are unclear. A button may touch permissions, analytics, data migration, translation, accessibility, and someone’s daily routine all at once.

The answer is not to make every pull request tiny. It is to give a change a shape that another engineer can understand.

## Name the promise

I begin by writing one sentence in plain language: *after this change, a person can do X, and the system will do Y.* If I cannot write it, I am usually still holding several changes together in my head.

Then I map the work in three layers:

1. **Behavior** — what becomes possible or different for a person.
2. **Boundaries** — which APIs, storage, or permissions are crossed.
3. **Proof** — how we will know the promise still holds.

| Layer | Useful question | Typical artifact |
| :-- | :-- | :-- |
| Behavior | What should someone notice? | Acceptance example |
| Boundaries | What can fail or become stale? | Contract or migration |
| Proof | What protects the important path? | Test, metric, or manual check |

## Keep the seam visible

A change becomes easier to review when the decision lives near its boundary. For example, instead of letting UI code infer whether a feature is available from several unrelated flags, give it one honest question to ask.

```ts [can-publish.ts]
type Article = { status: "draft" | "review" | "published"; hasRequiredFields: boolean };

export const canPublish = (article: Article) =>
  article.status === "review" && article.hasRequiredFields;
```

This is not clever code. That is the point. The rule has a name, a home, and a small surface area. A reviewer can challenge the policy without first excavating the component tree.

## A pre-merge ritual

Before opening a change for review, I try to complete this short list:

- [ ] I can describe the user-facing result without implementation terms.
- [ ] The happy path and the most likely failure path have both been exercised.
- [ ] Copy, focus behavior, and empty states received the same attention as the API call.
- [ ] The rollback story is proportionate to the risk.

This is less a checklist for perfection than a defense against accidental complexity. A good change is legible enough to be questioned, small enough to be revised, and complete enough that the person using the product does not inherit our unfinished thinking.

---

Software is collaborative memory. The code should help the next person recover not only *what* changed, but why the change deserved to exist.
