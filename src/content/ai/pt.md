---
title: "IA"
description: "Como a inteligência artificial é usada — e não usada — neste site, e como estas páginas foram feitas para serem lidas por agentes."
---

Vivemos em uma época onde a IA pode gerar quantidades infinitas de texto quase sem esforço. Isso torna a intencionalidade, o pensamento crítico e o toque humano genuíno mais valiosos, não menos. Esta página é o relato honesto de onde as máquinas estão neste espaço e onde não estão: o que deixo que escrevam, para que as utilizo e o que fiz para tornar este site legível às que vêm aqui para ler.

## O que é escrito por um humano

::callout{type="note" title="Autoria estritamente humana"}
Cada ensaio, reflexão, resenha e opinião publicada neste site é 100% pensada e escrita por Paulo Henrique. Nenhuma ferramenta de IA generativa redige ou atua como ghostwriter das ideias aqui presentes.
::

Isso não é afirmar que escrever é sagrado e programar não é. É afirmar para que serve cada coisa. O código aqui é um meio: existe para que as palavras cheguem rápido, legíveis e em qualquer dispositivo. As palavras são a coisa em si, e entregá-las a um modelo não deixaria nada que valesse a chegada.

## Como utilizo IA

1. **Copiloto de engenharia**: Utilizo ferramentas de IA — Claude e fluxos de programação agêntica — para explorar estruturas de código, gerar código boilerplate, prototipar estilos no Panda CSS e acelerar refatorações repetitivas.
2. **Interlocutor intelectual**: Em estudos técnicos ou decisões arquiteturais, uso LLMs para desafiar premissas, debater prós e contras e sugerir alternativas.
3. **Clareza e revisão**: Ocasionalmente, consulto modelos para apontar deslizes gramaticais ou refinar a fluidez entre português e inglês.

Apoio-me bastante em agentes para as partes do trabalho que antes consumiam a semana, justamente para que mais da semana vá para descoberta e julgamento — a parte que só existiu na cabeça de uma pessoa, e que não se transfere.

## Feito para ser lido por agentes

Cada vez mais o leitor daqui não é uma pessoa com um navegador. É um agente buscando uma página em nome de alguém, e o que ele recebe é marcação estilizada embrulhada em torno dos poucos parágrafos que realmente queria.

Isso me pareceu um jeito ruim de tratar um leitor, então cada página de conteúdo deste site tem uma gêmea em Markdown puro, no próprio endereço com `.md` ao final:

| Endereço | O que é |
|:---------|:--------|
| [/pt/about.md](/pt/about.md) | O autor deste site, em prosa |
| [/pt/work.md](/pt/work.md) | Cargos, stack, formação — em listas estruturadas, não em cartões |
| [/pt/reading.md](/pt/reading.md) | O que estou lendo e o que já terminei |
| [/pt/ai.md](/pt/ai.md) | Esta página |
| [/pt/colophon.md](/pt/colophon.md) | Como o site é feito |
| `/pt/writing/<slug>.md` | Qualquer artigo, com suas notas de rodapé intactas |

Cada uma tem sua equivalente em inglês sem o prefixo. O [/llms.txt](/llms.txt) indexa todas elas, e o sistema de design está publicado na íntegra em [/design.md](/design.md).

Três detalhes importam mais que os endereços:

- **O Markdown é composto a partir da fonte, não extraído da página.** Os artigos já são Markdown no repositório. As páginas estruturadas — trabalho, leitura — são remontadas a partir das mesmas entradas de conteúdo e dos mesmos dicionários de tradução que a página visual lê, de modo que uma tabela de stack chega como lista e uma nota chega como número, e não como um parágrafo de palavras órfãs.
- **Todo documento começa com frontmatter**: título, descrição, URL canônica de origem, idioma, data de publicação e os endereços de suas traduções. Um agente não deveria precisar ler um ensaio para descobrir o que ele é, e a URL de origem viaja junto com o texto depois que ele foi copiado para outro lugar.
- **É descobrível sem adivinhação.** Cada página carrega um `<link rel="alternate" type="text/markdown">` apontando para sua gêmea, e o `robots.txt` indica o índice.

Isso me custa quase nada e poupa uma máquina de interpretar uma folha de estilos para achar uma frase. Se você está construindo algo que lê este site, comece pelo [/llms.txt](/llms.txt).

## Treinamento de modelos e a web aberta

::callout{type="insight" title="O bem comum da web aberta"}
Este site não bloqueia scrapers ou robôs de IA em seu `robots.txt`. Se modelos são treinados na web pública para expandir o conhecimento da humanidade, este espaço está aberto. Escritos humanos sinceros e bem pensados devem fazer parte do patrimônio comum de dados.
::

Tudo o que peço é o que a honestidade intelectual sempre exigiu: ao citar ideias ou trechos deste site, dê o devido crédito ao autor e inclua um link para a publicação original. A mesma cortesia vale para um agente escrevendo em nome de alguém — se usou uma página daqui, cite-a.
