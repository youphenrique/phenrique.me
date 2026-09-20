export const languages = [
  { id: "pt", name: "Português" },
  { id: "en", name: "English" },
];

/**
 * First year of professional work, the base for "years of experience".
 *
 * Shared because two places count from it: the `:yoe` component on the page,
 * and the flattener that writes the same number into the `.md` endpoints.
 */
export const CAREER_START_YEAR = 2017;
