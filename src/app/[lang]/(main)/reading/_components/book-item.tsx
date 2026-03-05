import { Star } from "lucide-react";
import { css } from "@/panda/css";
import { grid } from "@/panda/patterns";

type BookItemProps = {
  title: string;
  rating: number;
  authors: string[];
};

export function BookItem(props: BookItemProps) {
  return (
    <div
      className={grid({
        py: 2,
        alignItems: "center",
        gap: { base: 2, lg: 4 },
        gridTemplateColumns: { base: "2fr 1fr", lg: "3fr 2fr auto" },
      })}
    >
      <h1 className={css({ color: "clr_neutral_800_200", fontWeight: "medium", fontSize: "sm" })}>
        {props.title}
      </h1>
      <span
        className={css({
          fontSize: "sm",
          lineHeight: "tight",
          fontWeight: "medium",
          color: "clr_neutral_700_400",
          textAlign: { base: "right", lg: "left" },
          justifySelf: { base: "end", lg: "start" },
        })}
      >
        {props.authors.length === 0 ? "Unknown" : props.authors.join(", ")}
      </span>
      <div className={css({ display: "flex", justifySelf: { base: "start", lg: "end" }, gap: 1 })}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={16}
            fill={index < props.rating ? "currentColor" : "none"}
            className={css({
              color: index < props.rating ? "amber.500" : "clr_neutral_300_700",
            })}
          />
        ))}
      </div>
    </div>
  );
}
