---
title: "Interfaces are arguments"
description: "Why frontend work is less about decoration than helping people form accurate mental models."
slug: "interfaces-are-arguments"
translationKey: "interfaces-are-arguments"
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
package com.example.kotlin

import java.util.Random as Rand
import android.support.v7.app.AppCompatActivity
import org.amshove.kluent.`should equal` as Type

fun main(@NonNull args: Array<String>) {
    println("Hello Kotlin! ${/*test*/}")

    val map = mutableMapOf("A" to "B")

    thing.apply("random string here \n\t\r")
    thing.let { test: ->    }

    val string = "${getThing()}"
}

val items = listOf("apple", "banana", "kiwifruit")
var x = 9
const val CONSTANT = 99

@get:Rule
val activityRule = ActivityTestRule(SplashActivity::class.java)

val oneMillion = 1_000_000
val creditCardNumber = 1234_5678_9012_3456L
val socialSecurityNumber = 999_99_9999L
val hexBytes = 0xFF_EC_DE_5E
val float = 0.043_331F
val bytes = 0b11010010_01101001_10010100_10010010

if(test == "") {
    1 and 2 not 3
} else {
    
}

fun <T> foo() {
    val x  = Bar::class
    val y = hello?.test
}

suspend fun <T, U> SequenceBuilder<Int>.yieldIfOdd(x: Int) {
    if (x % 2 != 0) yield(x)
}

val function = fun(@Inject x: Int, y: Int, lamda: (A, B) -> Unit): Int {
    test.test()
    return x + y;
}

abstract fun onCreate(savedInstanceState: Bundle?)

fun isOdd(x: Int) = x % 2 != 0
fun isOdd(s: String) = s == "brillig" || s == "slithy" || s == "tove"

val numbers = listOf(1, 2, 3)
println(numbers.filter(::isOdd))

fun foo(node: Node?): String? {
    val parent = node.getParent() ?: return null
}

interface Greetable {
    fun greet()
}

open class Greeter: Greetable {
    companion object {
        private const val GREETING = "Hello, World!"
    }
    
    override fun greet() {
        println(GREETING)
    }
}

expect class Foo(bar: String) {
    fun frob() 
}

actual class Foo actual constructor(val bar: String) {
    actual fun frob() {
        println("Frobbing the $bar")
    }
}

expect fun formatString(source: String, vararg args: Any): String
expect annotation class Test

actual fun formatString(source: String, vararg args: Any) = String.format(source, args)
actual typealias Test = org.junit.Test

sealed class Expr
data class Const(val number: Double) : Expr()
data class Sum(val e1: Expr, val e2: Expr) : Expr()
object NotANumber : Expr()

@file:JvmName("Foo")
private sealed class InjectedClass<T, U> @Inject constructor(
    val test: Int = 50, 
    var anotherVar: String = "hello world"
) : SomeSuperClass(test, anotherVar) {

    init {
        //
    }

    constructor(param1: String, param2: Int): this(param1, param2) {
        //
    }

    companion object {
        //
    }
}
annotation class Suspendable
val f = @Suspendable { Fiber.sleep(10) }


private data class Foo(
    /**
     * ```
     * ($)
     * ```
     */
    val variables: Map<String, String>
)

data class Response(@SerializedName("param1") val param1: String,
                    @SerializedName("param2") val param2: String,
                    @SerializedName("param3") val param3: String) {
}

object DefaultListener : MouseAdapter() {
    override fun mouseClicked(e: MouseEvent) { }

    override fun mouseEntered(e: MouseEvent) { }
}

class Feature : Node("Title", "Content", "Description") {

}

class Outer {
    inner class Inner {}
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
