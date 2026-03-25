import type { Languages } from "@/app/_types/app";
import { HeaderClient } from "@/app/[lang]/(main)/_components/header.client";
import { getAppDictionary } from "@/app/_dictionaries/dictionaries";

type HeaderProps = {
  displayLanguage: Languages;
};

export async function Header(props: HeaderProps) {
  const dict = await getAppDictionary(props.displayLanguage);

  return <HeaderClient dict={dict} displayLanguage={props.displayLanguage} />;
}
