---
title: "Interfaces are arguments"
description: "Why frontend work is less about decoration than helping people form accurate mental models."
slug: "interfaces-are-arguments"
locale: "en"
date: "2026-08-28"
draft: false
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

The same argument survives the move to a native client, and a stricter language can hold you to it. In Kotlin, a sealed interface turns the list of states into something the compiler enforces: add an outcome, and every `when` that turns a result into words stops compiling until someone decides what the person should read.

```kotlin [SaveMessage.kt]
package app.profile

import kotlinx.coroutines.delay
import kotlin.time.Duration
import kotlin.time.Duration.Companion.seconds

/** Every outcome a save can have; the UI has to answer each one. */
sealed interface SaveResult {
    data object Saved : SaveResult
    data class Offline(val retryIn: Duration) : SaveResult
    data class Invalid(val fields: List<String>) : SaveResult
}

@JvmInline
value class Message(val text: String)

fun SaveResult.toMessage(): Message = when (this) {
    SaveResult.Saved -> Message("Your changes are saved.")
    is SaveResult.Offline ->
        Message("You’re offline. Retrying in $retryIn.")
    is SaveResult.Invalid -> {
        // “Something went wrong” is not a next step. Name the fields.
        val noun = if (fields.size == 1) "field" else "fields"
        Message("Please review the $noun: ${fields.joinToString()}.")
    }
}

suspend fun saveWithRetry(
    attempts: Int = 3,
    save: suspend () -> SaveResult,
): SaveResult {
    var last: SaveResult = SaveResult.Offline(retryIn = 5.seconds)
    repeat(attempts) { attempt ->
        last = save()
        if (last !is SaveResult.Offline) return last
        delay((attempt + 1) * 1_000L)
    }
    return last
}
```

The retry loop is the quieter half of the argument. An offline save is not a failure to report but a state to wait out, so the interface only speaks once waiting has stopped being useful.

## A small review rubric

Before I call an interface finished, I look for evidence of these things:

| Question                          | What I am looking for                                                     |
|:----------------------------------|:--------------------------------------------------------------------------|
| Is the purpose clear?             | A first-time visitor can say what this page is for.                       |
| Is the state honest?              | The UI does not imply success, freshness, or permission it does not have. |
| Is the next action proportionate? | The most likely task is easier than the exceptional one.                  |
| Is recovery possible?             | Errors explain what happened and preserve useful work.                    |

The details matter: the [Web Content Accessibility Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/) are not a final compliance pass, but part of the discipline of making meaning available to more people.

## A static social-post example

::tweet{author="Mark Chen" handle="markchen90" href="https://x.com/markchen90/status/2097400166554993041" avatar="/images/tweets/mark-chen.jpg" date="Sep 8, 2026"}
Two things to distinguish: Did any human or agent look at user data as part of the Navier Stokes effort? No. Do we use user feedback and de-identified data to improve ChatGPT and Codex in a holistic way? Yes. And so does every LLM company.

:::tweet{author="levent" href="https://x.com/__alpoge__/status/2097383870773748190" avatar="/images/tweets/levent-alpoge.jpg"}
“We cannot rule out that de-identified data derived from their usage of our products helped improve our models.” I mean props to them for straight coming clean.
:::
::

Good frontend engineering joins systems thinking with editorial judgment. The screen is where the system makes a promise. Our job is to make that promise intelligible—and, as far as we can, true.
