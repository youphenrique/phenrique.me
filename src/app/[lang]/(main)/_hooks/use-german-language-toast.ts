"use client";

import { useEffect, useRef, useState } from "react";
import { UNSTABLE_ToastQueue as ToastQueue } from "react-aria-components";
import type { Languages } from "@/app/_types/app";
import { hasSeenGermanToast, markGermanToastSeen } from "@/app/[lang]/(main)/_components/german-language-toast-storage";

export type GermanToastContent = {
  title: string;
  message: string;
};

const germanToastCopy: GermanToastContent = {
  title: "Hinweis",
  message: "Mein Deutsch ist noch im Aufbau 🚧 Ich bin noch Anfänger, daher kann der Inhalt manchmal etwas seltsam klingen.",
};

export function useGermanLanguageToast(displayLanguage: Languages) {
  const [queue] = useState(() => new ToastQueue<GermanToastContent>({ maxVisibleToasts: 1 }));
  const lastToastKey = useRef<string | null>(null);

  useEffect(() => {
    if (displayLanguage !== "de") {
      if (queue.visibleToasts.length > 0) {
        queue.clear();
      }

      lastToastKey.current = null;
      return;
    }

    if (hasSeenGermanToast()) {
      return;
    }

    lastToastKey.current = queue.add(germanToastCopy);
    markGermanToastSeen();
  }, [displayLanguage, queue]);

  const dismiss = () => {
    if (lastToastKey.current) {
      queue.close(lastToastKey.current);
      lastToastKey.current = null;
    } else {
      queue.clear();
    }
  };

  return { queue, dismiss };
}
