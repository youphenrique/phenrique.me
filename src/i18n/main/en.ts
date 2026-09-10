export interface MainDictionary {
  header: {
    "skip-label": string;
    "home-label": string;
    "about-label": string;
    "reading-label": string;
    "work-label": string;
    "writing-label": string;
    "soon-label": string;
    "menu-label": string;
  };
  footer: {
    "latest-commit": string;
    "colophon-label": string;
  };
}

const dict: MainDictionary = {
  header: {
    "skip-label": "Skip to content",
    "home-label": "Home",
    "about-label": "About",
    "reading-label": "Reading",
    "work-label": "Work",
    "writing-label": "Writing",
    "soon-label": "Soon",
    "menu-label": "Languages",
  },
  footer: {
    "latest-commit": "latest commit",
    "colophon-label": "Colophon",
  },
};

export default dict;
