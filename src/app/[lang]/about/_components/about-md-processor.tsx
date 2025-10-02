"use client";

import { useEffect, useRef } from "react";

import { css } from "@/panda/css";

type AboutMdProcessorProps = React.PropsWithChildren;

export function AboutMdProcessor(props: AboutMdProcessorProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (root === null) return;

    // Prevent double-processing
    if (root.dataset.paragraphsWrapped === "true") return;

    const firstParagraphEl = root.querySelector<HTMLParagraphElement>(":scope > p:nth-of-type(1)");
    const secondParagraphEl = root.querySelector<HTMLParagraphElement>(":scope > p:nth-of-type(2)");

    if (firstParagraphEl === null || secondParagraphEl === null) return; // Not enough paragraphs to wrap

    const containerEl = document.createElement("div");

    containerEl.className = css({
      gap: 7,
      display: "flex",
      flexDirection: { base: "column", sm: "row" },
      alignItems: { base: "flex-start", sm: "center" },
    });

    firstParagraphEl.className = css({
      flex: { base: 1, sm: "1 1 72%" },
      order: { base: 2, sm: 1 },
    });

    secondParagraphEl.className = css({
      width: "full",
      display: "flex",
      order: { base: 1, sm: 2 },
      flex: { base: 1, sm: "1 1 28%" },
      justifyContent: { base: "center", sm: "flex-end" },
      "& img": {
        maxWidth: "11rem",
        transform: "rotate(2deg)",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -4px rgba(0, 0, 0, .1)",
      },
    });

    // Insert our container before the first paragraph, then move both into it
    firstParagraphEl.parentElement?.insertBefore(containerEl, firstParagraphEl);
    containerEl.appendChild(firstParagraphEl);
    containerEl.appendChild(secondParagraphEl);

    root.dataset.paragraphsWrapped = "true";
  }, []);

  return (
    <div
      ref={rootRef}
      data-component="about-md-processor"
      className={`prose-ui antialiased formal-text ${css({ mt: { base: 8, md: 4 } })}`}
    >
      {props.children}
    </div>
  );
}
