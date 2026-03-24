import { css } from "@/panda/css";
import { vstack } from "@/panda/patterns";
import type { Languages } from "@/app/_types/app";
import type { LinkbioPage } from "content-collections";
import Image from "next/image";

type PresentationProps = {
  displayLanguage: Languages;
  linkbioPage: LinkbioPage;
};

export async function Presentation(props: PresentationProps) {
  return (
    <div className={css({ mt: 2, textAlign: "center" })}>
      <div className={css({ maxW: 24, mx: "auto" })}>
        <Image
          priority
          src={`${process.env.NEXT_PUBLIC_VERCEL_BLOB_STORAGE_URL}/linkbio-page.me.webp`}
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
      <div lang={props.displayLanguage} className={vstack({ mt: 3, gap: 0.5 })}>
        <h2
          className={css({
            fontSize: "sm",
            color: "hsl(0 0% 100%/.85)",
            fontWeight: "semibold",
            maxWidth: { base: "sm", sm: "md" },
          })}
        >
          {props.linkbioPage.bioSection.description}
        </h2>
        {props.linkbioPage.bioSection.quote ? (
          <h3
            className={css({
              fontSize: "sm",
              display: "block",
              color: "#fffcf4b0",
              fontStyle: "italic",
              fontWeight: "semibold",
              maxWidth: { base: "sm", sm: "md" },
            })}
          >
            {props.linkbioPage.bioSection.quote}
          </h3>
        ) : null}
      </div>
    </div>
  );
}
