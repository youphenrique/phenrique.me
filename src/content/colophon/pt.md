---
title: "Colofão"
description: "Como este site é feito: tipografia, sistema de design, engenharia e a minha postura sobre artesanato e inteligência artificial."
---

Um colofão é uma nota editorial — uma tradição da tipografia e da produção de livros que descreve como uma obra foi concebida, composta e fabricada. Esta página detalha as decisões estéticas, a infraestrutura técnica e os limites éticos que dão forma a este site.

## Tipografia

Uma boa tipografia é a espinha dorsal de uma leitura confortável e atenta. Este espaço combina famílias tipográficas servidas diretamente pela infraestrutura de fontes do Astro, garantindo privacidade por padrão, zero rastreamento de terceiros e ausência de saltos visuais (*layout shifts*):

- **Fraunces** (por Undercase Type): Utilizada em títulos de destaque e nomes de artigos. Uma serifa variável inspirada nos tipos do início do século XX, ajustada com eixos variáveis para um toque acolhedor e orgânico (`SOFT: 100`, `WONK: 1`).
- **Geist** (por Vercel & Guillermo Rauch): A tipografia principal para todo o corpo de texto, navegação e prosa. Desenhada com foco em legibilidade, precisão e ritmo geométrico.
- **Geist Mono**: Usada em blocos de código, hashes de commits, etiquetas de metadados e elementos técnicos.
- **Instrument Serif**: Reservada para momentos editoriais sutis e clássicos.

## Design & Sistema de Cores

A estética deste site se apoia em materiais táteis e na sensação de papel, evitando telas digitais frias ou genéricas.

- **Canvas & Textura**: Uma textura sutil de fibra de papel (*paper grain*) aplicada sobre uma tela creme acolhedora (paleta `sand`) no tema claro e obsidiana profunda (paleta `ink`) no tema escuro.
- **Tokens Semânticos**: Cada cor é expressa por papéis semânticos via Panda CSS (`bg.*`, `text.*`, `border.*`, `accent.*`, `status.*`). Nenhum valor hexadecimal fixo ou transparência avulsa é utilizado nos componentes.
- **Contraste Acessível**: Títulos e corpos de texto respeitam os padrões WCAG AA, com indicadores de foco desenhados especificamente com `border.focus` para navegação acessível por teclado.

Para quem tiver interesse técnico nas especificações completas de tokens, a documentação do sistema está publicada na íntegra em [/design.md](/design.md).

## Engenharia & Stack

Este site é pré-renderizado estaticamente, priorizando velocidade instantânea, durabilidade e o mínimo indispensável de JavaScript no cliente:

- **Framework**: [Astro](https://astro.build), operando em modo de saída estática.
- **Estilos**: [Panda CSS](https://panda-css.com), gerando CSS em tempo de compilação sem impacto em tempo de execução.
- **Conteúdo & Markdown**: Astro Content Layer com Markdown processado e renderizado por [Comark](https://comark.dev).
- **Hospedagem**: Distribuído globalmente na [Vercel](https://vercel.com).
- **Métricas**: Estatísticas com foco em privacidade, sem cookies de rastreamento ou identificação invasiva.

## Inteligência Artificial & Artesanato

Vivemos em uma época onde a IA pode gerar quantidades infinitas de texto quase sem esforço. Isso torna a intencionalidade, o pensamento crítico e o toque humano genuíno mais valiosos, não menos. É assim que a inteligência artificial se relaciona com este site:

::callout{type="note" title="Autoria estritamente humana"}
Cada ensaio, reflexão, resenha e opinião publicada neste site é 100% pensada e escrita por Paulo Henrique. Nenhuma ferramenta de IA generativa redige ou atua como ghostwriter das ideias aqui presentes.
::

### Como utilizo IA

1. **Copiloto de Engenharia**: Utilizo ferramentas de IA (como Claude e fluxos de programação agêntica) para explorar estruturas de código, gerar código boilerplate, prototipar estilos no Panda CSS e acelerar refatorações repetitivas.
2. **Interlocutor Intelectual**: Em estudos técnicos ou decisões arquiteturais, uso LLMs para desafiar premissas, debater prós e contras e sugerir alternativas.
3. **Clareza & Revisão**: Ocasionalmente, consulto modelos para apontar deslizes gramaticais ou refinar a fluidez entre português e inglês.

### Treinamento de Modelos & A Web Aberta

::callout{type="insight" title="O bem comum da web aberta"}
Este site não bloqueia scrapers ou robôs de IA em seu `robots.txt`. Se modelos são treinados na web pública para expandir o conhecimento da humanidade, este espaço está aberto. Escritos humanos sinceros e bem pensados devem fazer parte do patrimônio comum de dados.
::

Tudo o que peço é o que a honestidade intelectual sempre exigiu: ao citar ideias ou trechos deste site, dê o devido crédito ao autor e inclua um link para a publicação original.

## Direitos & Citações

Todo o conteúdo deste site é obra intelectual de Paulo Henrique.

Citações de trechos com a devida atribuição e link para o original são sempre bem-vindas e encorajadas. Republicações integrais, traduções ou uso comercial dependem de autorização prévia por escrito.
