export interface ReadingDictionary {
  "page-title": string;
  "currently-reads": {
    "section-title": string;
    "no-reads": {
      title: string;
      description: string;
    };
    "last-update": string;
  };
  "more-reads": string;
}
