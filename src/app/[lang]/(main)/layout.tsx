import { css } from "@/panda/css";
import { flex } from "@/panda/patterns";
import type { Languages } from "@/app/_types/app";
import { Header } from "@/app/[lang]/(main)/_components/header";
import { Footer } from "@/app/[lang]/(main)/_components/footer";
import { GermanLanguageToast } from "@/app/[lang]/(main)/_components/german-language-toast";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "pt" }, { lang: "de" }];
}

type LayoutProps = React.PropsWithChildren<Pick<PageProps<"/[lang]">, "params">>;

export default async function MainLayout(props: LayoutProps) {
  const displayLanguage = ((await props.params)?.lang ?? "en") as Languages;

  return (
    <div
      data-component="main-layout"
      className={flex({
        minH: "100dvh",
        bgColor: "clr_white_neutral_900",
        flexDirection: "column",
      })}
    >
      <Header displayLanguage={displayLanguage} />
      <div className={css({ flex: 1 })}>{props.children}</div>
      <Footer displayLanguage={displayLanguage} />
      <GermanLanguageToast displayLanguage={displayLanguage} />
    </div>
  );
}
