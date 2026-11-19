import type { WritingDictionary } from "./types";

const en: WritingDictionary = {
  "page-title": "Writing",
  "page-description": "Articles and notes on topics I am passionate about.",
  "back-to-index": "Back to blog",
  "draft-label": "Draft",
  "filter-label": "Filter by type",
  "filter-all": "All",
  kinds: {
    article: {
      plural: "Articles",
      singular: "Article",
      description: "Longer, comprehensive pieces on topics I am passionate about.",
      empty: "No articles yet",
    },
    note: {
      plural: "Notes",
      singular: "Note",
      description: "Short notes: one thought each, written down while it is fresh.",
      empty: "No notes yet",
    },
  },
  "reading-time": "min read",
  "empty-state": {
    title: "Nothing here yet",
    description: "The first pieces are still being written. There will be something to read here soon.",
  },
};

export default en;
