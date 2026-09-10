---
title: "Interfaces são argumentos"
description: "Por que trabalho de frontend não é decoração, mas uma forma de ajudar pessoas a formar modelos mentais precisos."
slug: "interfaces-sao-argumentos"
locale: "pt"
date: "2026-08-28"
draft: true
---

Durante algum tempo, pensei que o trabalho de frontend começava depois que a engenharia de verdade terminava. A API precisava funcionar; o modelo de dados precisava sobreviver ao mundo real; a interface apenas tornava tudo isso disponível.

Essa explicação é confortável e está errada. Uma interface não apenas *mostra* um sistema. Ela propõe uma maneira de compreendê-lo. Seus rótulos, padrões, estados vazios, erros e sequência de ações argumentam sobre o que importa e sobre o que alguém deve fazer em seguida.

## O modelo que a pessoa carrega

Quando construo um produto, tento fazer uma pergunta antes de decidir qual componente usar: **com que modelo desse sistema alguém deve sair daqui?**

Essa pergunta tem consequências práticas. Uma boa interface torna o estado importante visível, usa uma linguagem que pertence à pessoa que a utiliza e oferece retorno cedo o bastante para preservar a confiança. Uma tela bonita que esconde o próximo passo continua sendo um mau argumento.

> Cuidado na interface é uma forma de consideração. Ele diz: pensei no contexto em que você chegou e não deixei que você carregasse uma incerteza desnecessária.

## Comece pelo estado, não pela tela

Em uma funcionalidade recente, a primeira tentação foi desenhar um dashboard rico. O melhor passo foi nomear os estados que a pessoa de fato encontraria:

- carregando, quando o sistema ainda não conquistou confiança;
- vazio, quando não há nada sobre o que agir;
- pronto, quando a tarefa principal precisa estar óbvia;
- interrompido, quando a recuperação importa mais que o acabamento.

A implementação ficou menor quando esses estados se tornaram explícitos:

```ts [save-profile.ts]
type SaveResult = { ok: true } | { ok: false; reason: "offline" | "invalid" };

export function messageFor(result: SaveResult) {
  if (result.ok) return "Suas alterações foram salvas.";
  if (result.reason === "offline") return "Você está offline. Tentaremos novamente ao reconectar.";
  return "Revise os campos destacados.";
}
```

Repare no que o código se recusa a fazer: ele não reduz toda falha a “Algo deu errado”. Especificidade não é luxo. É como o software ajuda alguém a dar um próximo passo competente.

O mesmo argumento sobrevive à mudança para um cliente nativo, e uma linguagem mais rígida pode cobrar você por ele. Em Kotlin, uma sealed interface transforma a lista de estados em algo que o compilador exige: acrescente um desfecho, e todo `when` que transforma um resultado em palavras deixa de compilar até que alguém decida o que a pessoa deve ler.

```kotlin [SaveMessage.kt]
package app.profile

import kotlinx.coroutines.delay
import kotlin.time.Duration
import kotlin.time.Duration.Companion.seconds

/** Todo desfecho de um salvamento; a interface responde a cada um. */
sealed interface SaveResult {
    data object Saved : SaveResult
    data class Offline(val retryIn: Duration) : SaveResult
    data class Invalid(val fields: List<String>) : SaveResult
}

@JvmInline
value class Message(val text: String)

fun SaveResult.toMessage(): Message = when (this) {
    SaveResult.Saved -> Message("Suas alterações foram salvas.")
    is SaveResult.Offline ->
        Message("Você está offline. Nova tentativa em $retryIn.")
    is SaveResult.Invalid -> {
        // “Algo deu errado” não é um próximo passo. Nomeie os campos.
        val label = if (fields.size == 1) "o campo" else "os campos"
        Message("Revise $label: ${fields.joinToString()}.")
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

O laço de novas tentativas é a metade mais discreta do argumento. Estar offline ao salvar não é uma falha a relatar, mas um estado a esperar passar; por isso a interface só se manifesta quando esperar deixou de ser útil.

## Uma pequena régua de revisão

Antes de considerar uma interface pronta, procuro evidências destas coisas:

| Pergunta                       | O que procuro                                                            |
|:-------------------------------|:-------------------------------------------------------------------------|
| O propósito está claro?        | Uma pessoa em sua primeira visita sabe dizer para que serve a página.    |
| O estado é honesto?            | A interface não sugere sucesso, atualização ou permissão que não possui. |
| A próxima ação é proporcional? | A tarefa mais provável é mais simples que a excepcional.                 |
| A recuperação é possível?      | Os erros explicam o que houve e preservam trabalho útil.                 |

Os detalhes importam: as [Web Content Accessibility Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/) não são uma verificação final de conformidade, mas parte da disciplina de tornar o significado disponível a mais pessoas.

Boa engenharia de frontend une pensamento sistêmico e juízo editorial. A tela é onde o sistema faz uma promessa. Nosso trabalho é tornar essa promessa inteligível — e, tanto quanto possível, verdadeira.
