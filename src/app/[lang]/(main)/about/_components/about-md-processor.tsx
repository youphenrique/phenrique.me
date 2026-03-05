"use client";

import { css } from "@/panda/css";

type AboutMdProcessorProps = React.PropsWithChildren;

export function AboutMdProcessor(props: AboutMdProcessorProps) {
  return (
    <div
      data-component="about-md-processor"
      className={`prose-ui antialiased formal-text ${css({ mt: { base: 4, md: 0 } })}`}
    >
      {props.children}
    </div>
  );
}
