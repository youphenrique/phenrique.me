export interface WritingDictionary {
  "page-title": string;
  /** Label on the link back to the article index, shown above a post. */
  "back-to-index": string;
  /** Suffix after the number of minutes a post takes to read. */
  "reading-time": string;
  /** Shown in place of the index when no post has been published yet. */
  "empty-state": {
    title: string;
    description: string;
  };
}
