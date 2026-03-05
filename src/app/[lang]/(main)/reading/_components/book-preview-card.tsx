"use client";

import { useRef } from "react";
import Image from "next/image";

import { css } from "@/panda/css";
import { flex, hstack, vstack } from "@/panda/patterns";
import { useOverflow } from "@/app/_hooks/use-overflow";
import { BookGenreBadge } from "@/app/[lang]/(main)/reading/_components/book-genre-badge";

type BookPreviewCardProps = {
  title: string;
  genres: string[];
  authors: string[];
  coverUrl: string | null;
  progress: number | null;
};

export function BookPreviewCard(props: BookPreviewCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { isOverflowing, scrollPos } = useOverflow<HTMLDivElement>(ref);

  const bookProgress = props.progress ?? 0;
  const overflowGradient = scrollPos.atStart
    ? "linear-gradient(to right, black 75%, transparent 100%)" // fade only the right edge
    : scrollPos.atEnd
      ? "linear-gradient(to left, black 75%, transparent 100%)" // fade only the left edge
      : `linear-gradient(to right, transparent 0, black 2rem, black calc(100% - 2rem), transparent 100%)`; // fade both edges

  return (
    <div
      className={flex({
        boxShadow: "xs",
        borderRadius: "xl",
        border: "1px solid",
        bgColor: "clr_white_neutral_900",
        borderColor: "clr_neutral_300_700",
      })}
    >
      <Image
        priority
        width={539}
        height={784}
        alt={props.title}
        src={props.coverUrl ?? "/images/book-cover-placeholder.png"}
        className={css({
          borderTopLeftRadius: "xl",
          borderBottomLeftRadius: "xl",
          maxWidth: 28,
          boxShadow: "sm",
        })}
      />
      <div
        className={flex({
          flexDirection: "column",
          justifyContent: "space-between",
          px: 5,
          py: 4,
          flex: 1,
          overflow: "hidden",
        })}
      >
        <div className={vstack({ gap: 3, alignItems: "stretch" })}>
          <h3
            title={props.title}
            className={flex({
              fontSize: "sm",
              lineHeight: 1.3,
              fontWeight: "medium",
              color: "clr_neutral_900_50",
              lineClamp: 2,
              overflow: "hidden",
              boxOrient: "vertical",
              textOverflow: "ellipsis",
            })}
          >
            {props.title}
          </h3>
          <h4
            className={css({
              fontSize: "sm",
              lineHeight: "tight",
              fontWeight: "medium",
              color: "clr_neutral_700_400",
            })}
          >
            {props.authors.length === 0 ? "Unknown" : props.authors.join(", ")}
          </h4>
        </div>
        <div className={vstack({ alignItems: "stretch", width: "full" })}>
          <div
            ref={ref}
            className={hstack({
              gap: 2,
              ...(isOverflowing && {
                p: 0.5,
                overflowX: "scroll",
                WebkitMaskImage: overflowGradient,
                maskImage: overflowGradient,
              }),
            })}
          >
            {props.genres.map((genre) => (
              <BookGenreBadge key={genre}>{genre}</BookGenreBadge>
            ))}
          </div>
          <div className={flex({ gap: 2, alignItems: "center" })}>
            <div
              className={css({
                h: 1,
                w: "full",
                borderRadius: "sm",
                position: "relative",
                bg: "clr_neutral_300_700",
              })}
            >
              <div
                style={{ width: `${bookProgress}%` }}
                className={css({
                  h: 1,
                  top: 0,
                  left: 0,
                  display: "block",
                  borderRadius: "sm",
                  position: "absolute",
                  bgColor: "clr_coral_flame",
                })}
              />
            </div>
            <span className={css({ fontSize: "sm", color: "clr_neutral_700_400" })}>
              {bookProgress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
