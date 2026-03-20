const STORAGE_KEY = "german-language-toast-seen";

const isBrowserSession = () => typeof window !== "undefined" && typeof window.sessionStorage !== "undefined";

export function hasSeenGermanToast(): boolean {
  if (!isBrowserSession()) {
    return false;
  }

  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function markGermanToastSeen() {
  if (!isBrowserSession()) {
    return;
  }

  try {
    window.sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // ignore write failures
  }
}
