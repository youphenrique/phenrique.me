export interface WorkDictionary {
  "page-title": string;
  /** Label on the pill linking to the PDF résumé. */
  "resume-cta": string;
  sections: {
    highlights: string;
    projects: string;
    experience: string;
    stack: string;
    education: string;
    languages: string;
  };
  /** End of an ongoing role, in place of a date. */
  present: string;
  /** Renders the `arrangement` key a work entry carries in its frontmatter. */
  arrangement: {
    "on-site": string;
    hybrid: string;
    remote: string;
  };
  /** Accessible name for a project card, which links to the project's repository. */
  "project-link": string;
}
