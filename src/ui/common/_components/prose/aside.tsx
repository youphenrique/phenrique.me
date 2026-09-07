import type { ReactNode } from "react";

import { css } from "../../../../../styled-system/css";
import type { ProseDictionary } from "../../../../i18n/prose/types";

/**
 * `::aside` — marginalia: a remark the argument can afford to lose.
 *
 * Rendered in the text column for now, de-emphasised and rule-marked so it
 * reads as a step out of the main voice. It is deliberately the same authoring
 * shape a right-hand sidenote would need, so promoting these into the wide
 * gutter later is a change to this component and the grid, not to any content.
 */
const asideStyles = css({
  pl: "1em",
  borderLeft: "1px solid",
  borderColor: "border.subtle",
  fontSize: "0.9375rem",
  color: "text.muted",
});

const labelStyles = css({
  display: "block",
  mb: "0.35em",
  fontSize: "0.75rem",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "text.faint",
});

interface Props {
  /** Overrides the default label. */
  title?: string;
  children?: ReactNode;
}

export function createAside(dictionary: ProseDictionary) {
  return function Aside({ title, children }: Props) {
    return (
      <aside className={asideStyles}>
        <span className={labelStyles}>{title ?? dictionary["aside-label"]}</span>
        {children}
      </aside>
    );
  };
}
