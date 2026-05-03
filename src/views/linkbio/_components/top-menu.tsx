import * as React from "react";
import { languages } from "../../../utils/constants.ts";
import type { LinkbioDictionary } from "../../../i18n/linkbio/en.ts";
import {
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuLabel,
  MenuLinkItem,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
} from "../../../ui/common/menu";

interface ShareLink {
  id: string;
  name: string;
  href: string;
  iconHtml: string;
}

interface TopMenuProps {
  currentLocale: string;
  dict: LinkbioDictionary;
  linkbioUrl: string;
  shareLinks: ShareLink[];
  icons: {
    check: string;
    copy: string;
    external: string;
    menu: string;
  };
  classNames: {
    root: string;
    trigger: string;
    triggerIcon: string;
    content: string;
    positioner: string;
    label: string;
    languageItem: string;
    shareItem: string;
    shareIcon: string;
    externalIcon: string;
    separator: string;
  };
}

function HtmlIcon({ className, html }: { className?: string; html: string }) {
  return <span aria-hidden="true" className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function TopMenu({
  currentLocale,
  dict,
  linkbioUrl,
  shareLinks,
  icons,
  classNames,
}: TopMenuProps) {
  const [open, setOpen] = React.useState(false);
  const [toast, setToast] = React.useState<{ id: number; message: string } | null>(null);
  const toastTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  function showToast(message: string) {
    if (toastTimerRef.current !== null) {
      clearTimeout(toastTimerRef.current);
    }

    setToast({
      id: Date.now(),
      message,
    });

    toastTimerRef.current = setTimeout(() => {
      setToast(null);
      toastTimerRef.current = null;
    }, 2500);
  }

  function handleCopyLink() {
    if (!("clipboard" in navigator)) {
      console.warn("Clipboard write failed");
      return;
    }

    void navigator.clipboard.writeText(linkbioUrl).then(
      () => {
        setOpen(false);
        showToast(dict.toast.feedback);
      },
      () => {
        console.warn("Clipboard write failed");
      },
    );
  }

  return (
    <div lang={currentLocale} className={classNames.root}>
      <MenuRoot modal={false} open={open} onOpenChange={setOpen}>
        <MenuTrigger asChild aria-label={dict["top-menu"]["menu-label"]} id="top-menu-trigger">
          <button type="button" className={classNames.trigger}>
            <HtmlIcon className={classNames.triggerIcon} html={icons.menu} />
          </button>
        </MenuTrigger>

        <MenuContent
          id="top-menu-popover"
          className={classNames.content}
          positionerClassName={classNames.positioner}
          positionerProps={{
            align: "end",
            sideOffset: 8,
          }}
        >
          <MenuGroup>
            <MenuLabel className={classNames.label}>{dict["top-menu"].menu.language}</MenuLabel>

            {languages.map((language) => (
              <MenuLinkItem
                key={language.id}
                className={classNames.languageItem}
                href={language.id === "en" ? "/linkbio" : `/linkbio/${language.id}`}
              >
                <span>{language.name}</span>
                {language.id === currentLocale && <HtmlIcon html={icons.check} />}
              </MenuLinkItem>
            ))}
          </MenuGroup>

          <MenuSeparator className={classNames.separator} />

          <MenuGroup>
            <MenuLabel className={classNames.label}>{dict["top-menu"].menu.share}</MenuLabel>

            <MenuItem asChild closeOnClick={false} nativeButton onClick={handleCopyLink}>
              <button type="button" className={classNames.shareItem}>
                <HtmlIcon className={classNames.shareIcon} html={icons.copy} />
                <span>{dict["top-menu"].menu.copy}</span>
              </button>
            </MenuItem>

            {shareLinks.map((item) => (
              <MenuLinkItem
                key={item.id}
                className={classNames.shareItem}
                href={item.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                <HtmlIcon className={classNames.shareIcon} html={item.iconHtml} />
                <span>{item.name}</span>
                <HtmlIcon className={classNames.externalIcon} html={icons.external} />
              </MenuLinkItem>
            ))}
          </MenuGroup>
        </MenuContent>
      </MenuRoot>

      {toast !== null && (
        <div key={toast.id} id="linkbio-toast" role="alert" aria-live="assertive">
          {toast.message}
        </div>
      )}
    </div>
  );
}
