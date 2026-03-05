import type { Languages } from "@/types/app";
import { CTopMenu } from "@/app/[lang]/linkbio/_components/top-menu.client";
import { getLinkbioDictionary } from "@/app/[lang]/linkbio/_dictionaries/dictionaries";

type TopMenuProps = {
  displayLanguage: Languages;
};

export async function TopMenu(props: TopMenuProps) {
  const dict = await getLinkbioDictionary(props.displayLanguage);

  return <CTopMenu displayLanguage={props.displayLanguage} dict={dict} />;
}
