import type { ReactNode } from "react";

import { css } from "../../../../../styled-system/css";
import type { ProseDictionary } from "../../../../i18n/prose/types";

/**
 * The `table` renderer for Comark documents.
 *
 * A bare `<table>` is a shrink-to-fit box with no way to scroll, so a table
 * wider than the viewport pushed the whole page sideways on a phone. Wrapping
 * it in an overflow container confines the scroll to the table.
 *
 * The wrapper is focusable and labelled because a scrollable region that only
 * responds to pointer gestures is unreachable by keyboard — this is the pattern
 * WCAG 2.1.1 asks for, and `role="region"` is what makes the label announced.
 */
const wrapperStyles = css({
  overflowX: "auto",
  _focusVisible: {
    outline: "2px solid token(colors.border.accent)",
    outlineOffset: "2px",
    borderRadius: "sm",
  },
});

const tableStyles = css({
  width: "full",
  // Cells keep their content on one line where they can; the wrapper scrolls.
  minWidth: "max-content",
  borderCollapse: "collapse",
});

interface Props {
  children?: ReactNode;
}

export function createProseTable(dictionary: ProseDictionary) {
  return function ProseTable({ children }: Props) {
    return (
      <div className={wrapperStyles} data-prose-panel data-prose-track="wide" role="region" aria-label={dictionary["table-label"]} tabIndex={0}>
        <table className={tableStyles}>{children}</table>
      </div>
    );
  };
}
