export interface MainDictionary {
  header: {
    "about-label": string;
    "reading-label": string;
    "work-label": string;
    "writing-label": string;
    "soon-label": string;
    "menu-label": string;
  };
  footer: {
    source: string;
  };
}

const dict: MainDictionary = {
  header: {
    "about-label": "About",
    "reading-label": "Reading",
    "work-label": "Work",
    "writing-label": "Writing",
    "soon-label": "Soon",
    "menu-label": "Languages",
  },
  footer: {
    source: "Source",
  },
};

export default dict;
