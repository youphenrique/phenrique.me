"use client";

import * as React from "react";
import { motion } from "motion/react";
import {
  Button,
  QueuedToast,
  UNSTABLE_Toast as Toast,
  UNSTABLE_ToastRegion as ToastRegion,
  UNSTABLE_ToastContent as ToastContent,
} from "react-aria-components";

import { css } from "@/panda/css";
import { flex } from "@/panda/patterns";
import type { Languages } from "@/app/_types/app";
import { queue, type TToastContent } from "@/lib/toast";

const STORAGE_KEY = "phenrique.me@german-language-toast-seen";

const toastMotion = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const germanToastContent: TToastContent = {
  title: "Mein Deutsch ist noch im Aufbau",
  description: `Ich bin noch Anfänger, daher kann der Inhalt manchmal etwas seltsam klingen.`,
};

function subscribe(callback: () => void) {
  return queue.subscribe(callback);
}

function getSnapshot() {
  return queue.visibleToasts;
}

type GermanLanguageToastClientProps = {
  displayLanguage: Languages;
};

export function GermanLanguageToastClient(props: GermanLanguageToastClientProps) {
  const lastToastKey = React.useRef<string | null>(null);
  // This useRef (it could also be a useState) is necessary to prevent the error "The result of getServerSnapshot should be cached to avoid an infinite loop"
  const initialServerVisibleToasts = React.useRef<QueuedToast<TToastContent>[]>([]);
  const visibleToasts = React.useSyncExternalStore(subscribe, getSnapshot, function getServerSnapshot() {
    return initialServerVisibleToasts.current;
  });

  React.useEffect(() => {
    if (props.displayLanguage !== "de") {
      if (visibleToasts.length > 0) {
        queue.clear();
        lastToastKey.current = null;
      }
    } else if (!hasSeenGermanToast() && lastToastKey.current === null) {
      lastToastKey.current = queue.add(germanToastContent);
      markGermanToastSeen();
    }
  }, [props.displayLanguage, visibleToasts]);

  function hasSeenGermanToast() {
    return window.sessionStorage.getItem(STORAGE_KEY) === "true";
  }

  function markGermanToastSeen() {
    window.sessionStorage.setItem(STORAGE_KEY, "true");
  }

  function dismiss() {
    if (lastToastKey.current !== null) {
      queue.close(lastToastKey.current);
      lastToastKey.current = null;
    } else if (visibleToasts.length > 0) {
      queue.clear();
    }
  }

  return (
    <ToastRegion
      queue={queue}
      className={css({
        insetInlineEnd: { base: 4, md: 6 },
        insetBlockEnd: { base: 4, md: 6 },
        position: "fixed",
        zIndex: 50,
        display: "grid",
        gap: 3,
      })}
    >
      {({ toast }) => (
        <Toast
          toast={toast}
          className={css({
            w: "full",
            maxW: { base: "calc(100% - 1rem)", md: "sm" },
            ml: { base: "auto", md: 0 },
            pointerEvents: "auto",
          })}
        >
          <motion.div
            initial="hidden"
            variants={toastMotion}
            animate="visible"
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <ToastContent
              style={{ backdropFilter: "blur(8px)" }}
              className={flex({
                gap: 3,
                p: 4,
                boxShadow: "lg",
                alignItems: "flex-start",
                borderRadius: "md",
                border: "1px solid",
                color: "white",
                bgColor: "rgba(18, 18, 18, 0.75)",
                borderColor: "rgba(255, 255, 255, 0.08)",
              })}
            >
              <div
                aria-hidden
                className={flex({
                  w: 7,
                  h: 7,
                  rounded: "md",
                  alignItems: "center",
                  justifyContent: "center",
                  bgColor: "rgba(234, 179, 8, 0.18)",
                  border: "1px solid",
                  borderColor: "rgba(234, 179, 8, 0.35)",
                  color: "#fbbf24",
                })}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M11.077 3.707c.341-.614 1.19-.614 1.53 0l8.134 14.663c.338.609-.096 1.367-.764 1.367H3.708c-.668 0-1.102-.758-.764-1.367zM13 17.5v-2h-2v2zm0-3.5v-5h-2v5z" />
                </svg>
              </div>
              <div className={flex({ direction: "column", gap: 1, flex: 1 })}>
                <p className={css({ fontWeight: "semibold", letterSpacing: "0.01em", fontSize: "sm" })}>
                  {toast.content.title}
                </p>
                <p className={css({ lineHeight: 1.5, color: "rgba(255,255,255,0.85)", fontSize: "sm" })}>
                  {toast.content.description}
                </p>
              </div>
              <Button
                aria-label="Dismiss"
                onPress={dismiss}
                className={css({
                  p: 2,
                  rounded: "full",
                  color: "rgba(255,255,255,0.82)",
                  transition: "background-color 0.15s ease",
                  _hover: { bgColor: "rgba(255,255,255,0.08)" },
                  _focusVisible: { boxShadow: "0 0 0 2px rgba(251, 191, 36, 0.45)" },
                })}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                  <path d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.9 4.89a1 1 0 1 0 1.41 1.42L12 13.41l4.89 4.9a1 1 0 0 0 1.42-1.42L13.41 12l4.9-4.89a1 1 0 0 0-.01-1.4" />
                </svg>
              </Button>
            </ToastContent>
          </motion.div>
        </Toast>
      )}
    </ToastRegion>
  );
}
