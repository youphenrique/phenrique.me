import Image from "next/image";
import type { PropsWithChildren } from "react";

import { css } from "@/panda/css";

type HeadProps = PropsWithChildren;

export async function Head(props: HeadProps) {
  return (
    <div className={css({ mt: 2, textAlign: "center" })}>
      <div className={css({ maxW: 24, mx: "auto" })}>
        <Image
          priority
          src="https://assets.basehub.com/f4f66b1c/e908c4c73870138d738f48eadc6089fa/wmremove-transformed-edit.jpg"
          alt="A black and white photo of me smiling"
          width={1048}
          height={1048}
          className={css({
            mb: 6,
            mx: "auto",
            boxShadow: "lg",
            borderRadius: "full",
            outline: "1px solid rgba(243, 245, 247, 0.15)",
          })}
        />
      </div>
      <h1
        className={css({
          fontSize: "3xl",
          color: "transparent",
          fontWeight: "medium",
          fontFamily: "Vollkorn",
          backgroundClip: "text",
          backgroundImage: `linear-gradient(to bottom, #F5F5F5, #F5F5F5 40%, #999999)`,
        })}
      >
        Paulo Henrique
      </h1>
      {props.children}
    </div>
  );
}
