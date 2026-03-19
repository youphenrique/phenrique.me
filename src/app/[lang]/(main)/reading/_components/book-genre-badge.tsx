import type { PropsWithChildren } from "react";
import { css } from "@/panda/css";

type BookGenreBadgeProps = PropsWithChildren;

export function BookGenreBadge(props: BookGenreBadgeProps) {
  return (
    <span
      className={css({
        px: 2,
        py: 1,
        fontSize: "xs",
        w: "fit-content",
        borderRadius: "md",
        whiteSpace: "nowrap",
        fontWeight: "medium",
        alignItems: "center",
        display: "inline-flex",
        bg: "clr_neutral_100_800",
        color: "clr_neutral_800_200",
        ring: "1px solid",
        ringColor: "clr_neutral_300_700",
      })}
    >
      {props.children ?? "Unknown"}
    </span>
  );
}
