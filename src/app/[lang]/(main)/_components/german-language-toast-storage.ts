const STORAGE_KEY = "german-language-toast-seen";

const isSessionStorageAvailable = () =>
  typeof window !== "undefined" && typeof window.sessionStorage !== "undefined";

export function hasSeenGermanToast(): boolean {
  if (!isSessionStorageAvailable()) {
    return false;
  }

  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function markGermanToastSeen() {
  if (!isSessionStorageAvailable()) {
    return;
  }

  try {
    window.sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // ignore write failures
  }
}
