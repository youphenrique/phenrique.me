import type { ReactNode } from "react";

import { css } from "../../../../../styled-system/css";
import type { ProseDictionary } from "../../../../i18n/prose/types";

/**
 * `::callout{type="note"}` — an aside that interrupts the argument.
 *
 * Three types, each pinned to one editorial tint. The mapping is explicit
 * rather than derived from a list index so that adding a type never re-colours
 * the existing ones, and the styles are literal `css()` calls because Panda
 * extracts statically — a computed `tint.${type}.surface` emits no CSS at all.
 */
export type CalloutType = "note" | "warning" | "insight";

const CALLOUT_TYPES = new Set<CalloutType>(["note", "warning", "insight"]);

const shared = {
  px: "1.25em",
  py: "1em",
  borderRadius: "lg",
  borderLeft: "3px solid",
} as const;

const surfaces: Record<CalloutType, string> = {
  note: css({ ...shared, bg: "tint.sky.surface", borderColor: "tint.sky.text" }),
  warning: css({ ...shared, bg: "tint.ochre.surface", borderColor: "tint.ochre.text" }),
  insight: css({ ...shared, bg: "tint.sage.surface", borderColor: "tint.sage.text" }),
};

const labelBase = {
  display: "block",
  mb: "0.4em",
  fontSize: "0.75rem",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
} as const;

const labels: Record<CalloutType, string> = {
  note: css({ ...labelBase, color: "tint.sky.text" }),
  warning: css({ ...labelBase, color: "tint.ochre.text" }),
  insight: css({ ...labelBase, color: "tint.sage.text" }),
};

const defaultLabelKeys = {
  note: "callout-note",
  warning: "callout-warning",
  insight: "callout-insight",
} as const;

interface Props {
  type?: string;
  /** Overrides the type's default label, e.g. `title="On terminology"`. */
  title?: string;
  children?: ReactNode;
}

export function createCallout(dictionary: ProseDictionary) {
  return function Callout({ type, title, children }: Props) {
    const resolved: CalloutType = CALLOUT_TYPES.has(type as CalloutType) ? (type as CalloutType) : "note";
    const label = title ?? dictionary[defaultLabelKeys[resolved]];

    return (
      <div className={surfaces[resolved]} data-prose-block="callout">
        <span className={labels[resolved]}>{label}</span>
        {children}
      </div>
    );
  };
}
