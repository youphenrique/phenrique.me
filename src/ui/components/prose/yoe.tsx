import { CAREER_START_YEAR } from "../../../utils/constants.ts";

/**
 * Years of experience
 */
export default function YOE() {
  return <span>{new Date().getFullYear() - CAREER_START_YEAR}</span>;
}
