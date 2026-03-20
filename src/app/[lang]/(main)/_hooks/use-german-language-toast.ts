"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
// ToastQueue is currently exposed as an unstable API in react-aria-components.
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
  const visibleToasts = useSyncExternalStore(
    queue.subscribe.bind(queue),
    () => queue.visibleToasts,
    () => []
  );

  useEffect(() => {
    if (displayLanguage !== "de") {
      if (visibleToasts.length > 0) {
        queue.clear();
      }

      lastToastKey.current = null;
      return;
    }

    if (hasSeenGermanToast() || lastToastKey.current) {
      return;
    }

    lastToastKey.current = queue.add(germanToastCopy);
  }, [displayLanguage, queue, visibleToasts.length]);

  useEffect(() => {
    if (displayLanguage === "de" && !hasSeenGermanToast() && visibleToasts.length > 0) {
      markGermanToastSeen();
    }
  }, [displayLanguage, visibleToasts.length]);

  const dismiss = () => {
    if (lastToastKey.current) {
      queue.close(lastToastKey.current);
      lastToastKey.current = null;
      return;
    }

    if (visibleToasts.length > 0) {
      queue.clear();
    }
  };

  return { queue, dismiss };
}
