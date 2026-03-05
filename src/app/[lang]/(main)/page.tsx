import { basehub } from "basehub";

import { css } from "@/panda/css";
import { MDX } from "@/app/_components/mdx";
import type { Languages } from "@/types/app";
import { InnerContainer } from "@/app/_components/inner-container";

export const dynamic = "force-static";

type HomePageProps = Pick<PageProps<"/[lang]">, "params">;

export default async function HomePage(props: HomePageProps) {
  const displayLanguage = ((await props.params)?.lang ?? "en") as Languages;

  const data = await basehub().query({
    home: {
      bioSection: {
        __args: {
          variants: { language: displayLanguage },
        },
        title: true,
        description: {
          markdown: true,
        },
      },
    },
  });

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
        {data.home.bioSection.title}
      </h1>
      <MDX
        displayLanguage={displayLanguage}
        data={data.home.bioSection.description.markdown}
        wrapper={(props) => (
          <div className={"prose-ui antialiased " + css({ mt: 4, maxW: "xl" })}>
            {props.children}
          </div>
        )}
      />
    </InnerContainer>
  );
}
