import type { Languages } from "@/app/_types/app";
import { TopMenuClient } from "@/app/[lang]/linkbio/_components/top-menu.client";
import { getLinkbioDictionary } from "@/app/[lang]/linkbio/_dictionaries/dictionaries";

type TopMenuProps = {
  displayLanguage: Languages;
};

export async function TopMenu(props: TopMenuProps) {
  const dict = await getLinkbioDictionary(props.displayLanguage);

  return <TopMenuClient displayLanguage={props.displayLanguage} dict={dict} />;
}
