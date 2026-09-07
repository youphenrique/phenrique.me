/**
 * Estimated minutes to read a body of Markdown.
 *
 * Returns the number rather than a phrase so the caller can supply the unit
 * from its own dictionary — the site renders posts in English and Portuguese.
 */
export function readingTimeMinutes(markdown: string): number {
  const textOnly = markdown.replace(/<[^>]+>/g, "");
  const wordCount = textOnly.split(/\s+/).length;
  return Number((wordCount / 200 + 1).toFixed());
}

export function dateRange(startDate: Date, endDate?: Date | string): string {
  const startMonth = startDate.toLocaleString("default", { month: "short" });
  const startYear = startDate.getFullYear().toString();
  let endMonth;
  let endYear;

  if (endDate) {
    if (typeof endDate === "string") {
      endMonth = "";
      endYear = endDate;
    } else {
      endMonth = endDate.toLocaleString("default", { month: "short" });
      endYear = endDate.getFullYear().toString();
    }
  }

  return `${startMonth}${startYear} - ${endMonth}${endYear}`;
}
