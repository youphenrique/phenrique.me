import type { WritingKind } from "../../utils/writing-kinds.ts";

export interface WritingDictionary {
  "page-title": string;
  /** Meta description for the article index. */
  "page-description": string;
  /** Label on the link back to the article index, shown above a post. */
  "back-to-index": string;
  /** Suffix after the number of minutes a post takes to read. */
  "reading-time": string;
  "draft-label": string;
  /** Accessible name of the Articles/Notes filter above the index. */
  "filter-label": string;
  /** The filter's unfiltered option. */
  "filter-all": string;
  /** Per-kind copy, keyed by `WritingKind`. */
  kinds: Record<
    WritingKind,
    {
      /** Filter option and `<title>` prefix: "Notes". */
      plural: string;
      /** Marker on a post of this kind: "Note". */
      singular: string;
      /** Meta description of the filtered index. */
      description: string;
      /** Heading of the filtered index when it has nothing in it. */
      empty: string;
    }
  >;
  /** Shown in place of the index when no post has been published yet. */
  "empty-state": {
    title: string;
    description: string;
  };
}
