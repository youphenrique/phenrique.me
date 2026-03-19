import type { Languages } from "@/app/_types/app";
import { CHeader } from "@/app/[lang]/(main)/_components/header/header.client";
import { getAppDictionary } from "@/app/_dictionaries/dictionaries";

type HeaderProps = {
  displayLanguage: Languages;
};

export async function Header(props: HeaderProps) {
  const dict = await getAppDictionary(props.displayLanguage);

  return <CHeader dict={dict} displayLanguage={props.displayLanguage} />;
}
