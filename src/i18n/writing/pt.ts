import type { WritingDictionary } from "./types";

const pt: WritingDictionary = {
  "page-title": "Escrita",
  "page-description": "Artigos e notas sobre temas pelos quais sou apaixonado.",
  "back-to-index": "Voltar ao blog",
  "draft-label": "Rascunho",
  "filter-label": "Filtrar por tipo",
  "filter-all": "Tudo",
  kinds: {
    article: {
      plural: "Artigos",
      singular: "Artigo",
      description: "Textos mais longos e completos sobre temas pelos quais sou apaixonado.",
      empty: "Nenhum artigo ainda",
    },
    note: {
      plural: "Notas",
      singular: "Nota",
      description: "Notas curtas: uma ideia cada, escrita enquanto ainda está fresca.",
      empty: "Nenhuma nota ainda",
    },
  },
  "reading-time": "min de leitura",
  "empty-state": {
    title: "Nada por aqui ainda",
    description: "Os primeiros textos ainda estão sendo escritos. Em breve haverá algo para ler aqui.",
  },
};

export default pt;
