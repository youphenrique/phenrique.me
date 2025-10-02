import { basehub } from "basehub";
import { draftMode } from "next/headers";

import { css } from "@/panda/css";
import { MDX } from "@/app/_components/mdx";
import type { Languages } from "@/types/app";
import { CurrentAge } from "@/app/[lang]/about/_mdx-components/current-age";
import { AboutMdProcessor } from "@/app/[lang]/about/_components/about-md-processor";

export const dynamic = "force-static";

type AboutPageProps = Pick<PageProps<"/[lang]/about">, "params">;

export default async function AboutPage(props: AboutPageProps) {
  const displayLanguage = ((await props.params)?.lang ?? "en") as Languages;

  const data = await basehub({ draft: (await draftMode()).isEnabled }).query({
    about: {
      bioSection: {
        __args: {
          variants: { language: displayLanguage },
        },
        description: {
          markdown: true,
        },
      },
    },
  });

  console.log(data.about.bioSection.description);

  return (
    <div className={css({ mt: 32, mb: 12 })}>
      <h1
        className={css({
          fontSize: "4xl",
          color: "transparent",
          fontWeight: "semibold",
          backgroundClip: "text",
          backgroundImage: `linear-gradient(to bottom, token(colors.clr_neutral_950_snow), token(colors.clr_neutral_950_snow) 40%, #999999)`,
        })}
      >
        About me
      </h1>
      <MDX
        displayLanguage={displayLanguage}
        internalMdxComponents={{ CurrentAge }}
        data={data.about.bioSection.description.markdown}
        wrapper={(props) => <AboutMdProcessor>{props.children}</AboutMdProcessor>}
      />
    </div>
  );
}
