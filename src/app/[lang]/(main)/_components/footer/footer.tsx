import { basehub } from "basehub";
import { css } from "@/panda/css";
import { hstack } from "@/panda/patterns";
import type { Languages } from "@/types/app";
import { InnerContainer } from "@/app/_components/inner-container";
import { getAppDictionary } from "@/app/_dictionaries/dictionaries";

type FooterProps = {
  displayLanguage: Languages;
};

export async function Footer(props: FooterProps) {
  const dict = await getAppDictionary(props.displayLanguage);

  const data = await basehub().query({
    layout: {
      footer: {
        socialLinks: {
          items: {
            _title: true,
            label: true,
            icon: true,
            href: true,
          },
        },
        source: true,
      },
    },
  });

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
          {data.layout.footer.socialLinks.items.map((item) => (
            <a
              key={item._title}
              target="_blank"
              href={item.href}
              title={item.label}
              rel="noopener noreferrer"
              dangerouslySetInnerHTML={{ __html: item.icon }}
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
          href={data.layout.footer.source}
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
