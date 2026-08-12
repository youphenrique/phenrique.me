export interface LinkbioDictionary {
  "top-menu": {
    "menu-label": string;
    menu: {
      language: string;
      share: string;
      copy: string;
      "link-text": string;
    };
  };
  "copy-action-feedback": string;
}

const en: LinkbioDictionary = {
  "top-menu": {
    "menu-label": "Menu",
    menu: {
      language: "Language",
      share: "Share",
      copy: "Copy link",
      "link-text": "Check out this Linkbio!",
    },
  },
  "copy-action-feedback": "Link copied!",
};

export default en;
