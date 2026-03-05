import Image from "next/image";
import { basehub } from "basehub";
import { draftMode } from "next/headers";
import { vstack } from "@/panda/patterns";

import { css } from "@/panda/css";
import { MDX } from "@/app/_components/mdx";
import type { Languages } from "@/types/app";
import { InnerContainer } from "@/app/_components/inner-container";
import { CurrentAge } from "@/app/[lang]/(main)/about/_mdx-components/current-age";
import { AboutMdProcessor } from "@/app/[lang]/(main)/about/_components/about-md-processor";

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
        title: true,
        image: {
          url: true,
          alt: true,
          width: true,
          height: true,
        },
        description: {
          markdown: true,
        },
      },
    },
  });

  console.log(data.about.bioSection);

  return (
    <InnerContainer styles={vstack.raw({ mt: 44, mb: 12, gap: 16 })}>
      <h1
        className={css({
          fontSize: "5xl",
          textAlign: "center",
          color: "transparent",
          lineHeight: "1.2",
          fontWeight: "semibold",
          backgroundClip: "text",
          fontFamily: "Vollkorn",
          backgroundImage: `linear-gradient(to bottom, token(colors.clr_neutral_950_snow), token(colors.clr_neutral_950_snow) 40%, #999999)`,
        })}
      >
        {data.about.bioSection.title}
      </h1>
      <Image
        priority
        src={data.about.bioSection.image.url}
        width={data.about.bioSection.image.width}
        height={data.about.bioSection.image.height}
        alt={data.about.bioSection.image.alt ?? "A laptop computer sitting on top of a wooden desk"}
        className={css({
          borderRadius: "xl",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -4px rgba(0, 0, 0, .1)",
        })}
      />
      <MDX
        displayLanguage={displayLanguage}
        internalMdxComponents={{ CurrentAge }}
        data={data.about.bioSection.description.markdown}
        wrapper={(props) => <AboutMdProcessor>{props.children}</AboutMdProcessor>}
      />
    </InnerContainer>
  );
}
