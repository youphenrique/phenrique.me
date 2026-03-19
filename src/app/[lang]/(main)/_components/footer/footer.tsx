import { css } from "@/panda/css";
import { hstack } from "@/panda/patterns";
import type { Languages } from "@/app/_types/app";
import { allSocialLinks } from "content-collections";
import { InnerContainer } from "@/app/_components/inner-container";
import { getAppDictionary } from "@/app/_dictionaries/dictionaries";

type FooterProps = {
  displayLanguage: Languages;
};

export async function Footer(props: FooterProps) {
  const dict = await getAppDictionary(props.displayLanguage);

  const socialLinks = allSocialLinks.filter((link) => link.icon !== undefined);

  return (
    <footer>
      <InnerContainer
        styles={css.raw({
          py: 6,
          display: "flex",
          justifyContent: "space-between",
        })}
      >
        <div className={hstack({ gap: { base: 6, lg: 4 } })}>
          {socialLinks.map((item, idx) => (
            <a
              key={idx}
              target="_blank"
              href={item.link}
              title={item.name}
              rel="noopener noreferrer"
              dangerouslySetInnerHTML={{ __html: item.icon! }}
              className={css({
                w: 4,
                color: "clr_neutral_700_400",
                "& svg path": {
                  transition: "fill 0.15s ease-in-out",
                },
                "& svg:hover path": {
                  fill: "clr_neutral_900_50",
                },
              })}
            />
          ))}
        </div>
        <a
          href="https://github.com/youphenrique/phenrique.me"
          target="_blank"
          rel="noopener noreferrer"
          className={css({
            fontSize: "xs",
            fontWeight: "medium",
            color: "clr_neutral_700_400",
            textDecoration: "underline",
            fontFamily: "GeistMono, 'Geist Mono'",
            transition: "color 0.15s ease-in-out",
            _hover: {
              color: "clr_neutral_900_50",
            },
          })}
        >
          {dict.footer.source}
        </a>
      </InnerContainer>
    </footer>
  );
}
