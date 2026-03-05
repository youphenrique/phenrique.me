import { basehub } from "basehub";

import { css } from "@/panda/css";
import { vstack } from "@/panda/patterns";
import type { Languages } from "@/types/app";
import { ErrorFallback } from "@/app/_components/error-fallback";
import { getAppDictionary } from "@/app/_dictionaries/dictionaries";

type PresentationProps = {
  displayLanguage: Languages;
};

export async function Presentation(props: PresentationProps) {
  try {
    const data = await basehub().query({
      linkbio: {
        bioSection: {
          __args: {
            variants: { language: props.displayLanguage },
          },
          name: true,
          quote: true,
          description: true,
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
      <div lang={props.displayLanguage} className={vstack({ mt: 3, gap: 0.5 })}>
        <h2
          className={css({
            fontSize: "sm",
            color: "hsl(0 0% 100%/.85)",
            fontWeight: "semibold",
            maxWidth: { base: "sm", sm: "md" },
          })}
        >
          {data.linkbio.bioSection.description}
        </h2>
        {data.linkbio.bioSection.quote ? (
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
            {data.linkbio.bioSection.quote}
          </h3>
        ) : null}
      </div>
    );
  } catch (err) {
    const dict = await getAppDictionary(props.displayLanguage);

    return (
      <div className={css({ mt: 6 })}>
        <ErrorFallback error={err} dict={dict} />
      </div>
    );
  }
}
