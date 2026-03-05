import Image from "next/image";
import { basehub } from "basehub";
import type { PropsWithChildren } from "react";

import { css } from "@/panda/css";

type HeadProps = PropsWithChildren;

export async function Head(props: HeadProps) {
  const data = await basehub().query({
    linkbio: {
      bioSection: {
        name: true,
        avatar: {
          on_BlockImage: {
            url: true,
            alt: true,
            width: true,
            height: true,
          },
        },
      },
    },
  });

  return (
    <div className={css({ mt: 2, textAlign: "center" })}>
      <div className={css({ maxW: 24, mx: "auto" })}>
        <Image
          priority
          src={data.linkbio.bioSection.avatar.url}
          // @ts-ignore
          alt={data.linkbio.bioSection.avatar.alt}
          // @ts-ignore
          width={data.linkbio.bioSection.avatar.width}
          // @ts-ignore
          height={data.linkbio.bioSection.avatar.height}
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
        {data.linkbio.bioSection.name}
      </h1>
      {props.children}
    </div>
  );
}
