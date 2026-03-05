import { basehub } from "basehub";
import type { Languages } from "@/types/app";
import { CHeader } from "@/app/[lang]/(main)/_components/header/header.client";
import { getAppDictionary } from "@/app/_dictionaries/dictionaries";

type HeaderProps = {
  displayLanguage: Languages;
};

export async function Header(props: HeaderProps) {
  const dict = await getAppDictionary(props.displayLanguage);

  const data = await basehub().query({
    layout: {
      header: {
        avatar: {
          url: true,
          alt: true,
          width: true,
          height: true,
        },
        navLinks: {
          __args: {
            variants: { language: props.displayLanguage },
          },
          items: {
            _title: true,
            label: true,
            path: true,
            icon: true,
          },
        },
      },
    },
  });

  return (
    <CHeader
      dict={dict}
      avatar={data.layout.header.avatar}
      navLinks={data.layout.header.navLinks}
      displayLanguage={props.displayLanguage}
    />
  );
}
