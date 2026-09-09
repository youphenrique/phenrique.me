---
title: "A forma de uma boa mudança"
description: "Uma forma prática de fazer mudanças em software que sejam mais fáceis de entender, revisar e reverter."
slug: "a-forma-de-uma-boa-mudanca"
locale: "pt"
date: "2026-08-21"
draft: true
---

As mudanças mais difíceis raramente são difíceis porque o código é longo. Elas são difíceis porque as consequências não estão claras. Um botão pode tocar permissões, analytics, migração de dados, tradução, acessibilidade e a rotina diária de alguém de uma só vez.

A resposta não é fazer toda pull request minúscula. É dar à mudança uma forma que outro engenheiro consiga compreender.

## Dê um nome à promessa

Começo escrevendo uma frase em linguagem simples: *depois desta mudança, uma pessoa pode fazer X, e o sistema fará Y.* Se não consigo escrevê-la, normalmente ainda estou segurando várias mudanças juntas na cabeça.

Depois organizo o trabalho em três camadas:

1. **Comportamento** — o que se torna possível ou diferente para uma pessoa.
2. **Fronteiras** — quais APIs, dados armazenados ou permissões são atravessados.
3. **Evidência** — como saberemos que a promessa continua válida.

| Camada        | Pergunta útil                             | Artefato típico                      |
|:--------------|:------------------------------------------|:-------------------------------------|
| Comportamento | O que alguém deve perceber?               | Exemplo de aceitação                 |
| Fronteiras    | O que pode falhar ou ficar desatualizado? | Contrato ou migração                 |
| Evidência     | O que protege o caminho importante?       | Teste, métrica ou verificação manual |

## Deixe a costura visível

Uma mudança fica mais simples de revisar quando a decisão vive perto da sua fronteira. Em vez de deixar a interface deduzir se uma funcionalidade está disponível a partir de várias flags soltas, dê a ela uma pergunta honesta.

```ts [can-publish.ts]
type Article = { status: "draft" | "review" | "published"; hasRequiredFields: boolean };

export const canPublish = (article: Article) =>
  article.status === "review" && article.hasRequiredFields;
```

Não é código esperto. Esse é o ponto. A regra tem nome, lugar e uma superfície pequena. Uma pessoa revisando consegue questionar a política sem antes escavar a árvore de componentes.

## Um ritual antes do merge

Antes de abrir uma mudança para revisão, tento completar esta lista curta:

- [ ] Consigo descrever o resultado para o usuário sem termos de implementação.
- [ ] Exercitei o caminho feliz e o caminho de falha mais provável.
- [ ] Texto, foco e estados vazios receberam a mesma atenção que a chamada de API.
- [ ] A história de rollback é proporcional ao risco.

Isso não é uma lista para alcançar perfeição, mas uma defesa contra complexidade acidental. Uma boa mudança é legível o bastante para ser questionada, pequena o bastante para ser revista e completa o bastante para que a pessoa que usa o produto não herde nosso pensamento inacabado.

---

Software é memória colaborativa. O código deve ajudar a próxima pessoa a recuperar não apenas *o que* mudou, mas por que a mudança merecia existir.
