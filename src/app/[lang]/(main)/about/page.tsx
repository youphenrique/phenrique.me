import Image from "next/image";
import { notFound } from "next/navigation";

import { css } from "@/panda/css";
import { vstack } from "@/panda/patterns";
import type { Languages } from "@/app/_types/app";
import { InnerContainer } from "@/app/_components/inner-container";
import { getAboutPage } from "@/app/[lang]/(main)/about/_utils/content";

type AboutPageProps = Pick<PageProps<"/[lang]/about">, "params">;

export default async function AboutPage(props: AboutPageProps) {
  const displayLanguage = ((await props.params)?.lang ?? "en") as Languages;

  const aboutPage = getAboutPage(displayLanguage);

  if (aboutPage === undefined) {
    notFound();
  }

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
        {aboutPage.bioSection.title}
      </h1>
      <Image
        priority
        width={1350}
        height={607}
        alt={aboutPage.bioSection.imageAltText}
        src={`${process.env.NEXT_PUBLIC_VERCEL_BLOB_STORAGE_URL}/about-page.me.webp`}
        className={css({
          borderRadius: "xl",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -4px rgba(0, 0, 0, .1)",
        })}
      />
      <div lang={displayLanguage} className={`prose-ui antialiased formal-text ${css({ mt: { base: 4, md: 0 } })}`}>
        Teste
      </div>
    </InnerContainer>
  );
}
