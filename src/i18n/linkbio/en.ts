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
  toast: {
    feedback: string;
  };
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
  toast: {
    feedback: "Link copied!",
  },
};

export default en;
