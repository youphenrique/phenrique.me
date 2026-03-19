import { notFound } from "next/navigation";
import { mdxComponents } from "@prose-ui/next";
import { MDXContent } from "@content-collections/mdx/react";

import { css } from "@/panda/css";
import type { Languages } from "@/app/_types/app";
import { getHomePage } from "@/app/[lang]/(main)/_utils/content";
import { InnerContainer } from "@/app/_components/inner-container";

type HomePageProps = Pick<PageProps<"/[lang]">, "params">;

export default async function HomePage(props: HomePageProps) {
  const displayLanguage = ((await props.params)?.lang ?? "en") as Languages;

  const homePage = getHomePage(displayLanguage);

  if (homePage === undefined) {
    notFound();
  }

  return (
    <InnerContainer styles={css.raw({ py: { base: 32, sm: 44, "2xl": 52 } })}>
      <h1
        className={css({
          fontSize: "5xl",
          color: "transparent",
          fontWeight: "semibold",
          backgroundClip: "text",
          fontFamily: "Vollkorn",
          backgroundImage: `linear-gradient(to bottom, token(colors.clr_neutral_950_snow), token(colors.clr_neutral_950_snow) 40%, #999999)`,
        })}
      >
        Paulo Henrique
      </h1>
      <div className={"prose-ui antialiased " + css({ mt: 4, maxW: "xl" })}>
        <MDXContent code={homePage.mdx} components={mdxComponents} />
      </div>
    </InnerContainer>
  );
}
