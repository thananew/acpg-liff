import liff from "@line/liff";
import type { LineProfile } from "../types/shared";

const LIFF_ID = import.meta.env.VITE_LIFF_ID;

let initPromise: Promise<void> | null = null;

/**
 * Initializes the LIFF SDK exactly once. Safe to call multiple times
 * (e.g. from React StrictMode double-invocation) — subsequent calls
 * reuse the same in-flight/resolved promise.
 */
function init(): Promise<void> {
  if (!initPromise) {
    initPromise = liff.init({ liffId: LIFF_ID }).catch((err) => {
      // Reset so a future call can retry (e.g. after the user fixes config).
      initPromise = null;
      throw err;
    });
  }
  return initPromise;
}

/** True when running inside the LINE in-app browser / LINE app. */
function isInClient(): boolean {
  return liff.isInClient();
}

function isLoggedIn(): boolean {
  return liff.isLoggedIn();
}

function login(): void {
  liff.login();
}

function logout(): void {
  liff.logout();
}

async function getProfile(): Promise<LineProfile> {
  return liff.getProfile();
}

export const liffClient = {
  init,
  isInClient,
  isLoggedIn,
  login,
  logout,
  getProfile,
};
