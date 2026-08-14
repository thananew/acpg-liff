import { useEffect, useState } from "react";
import type { Liff } from "@line/liff";
import liff from "@line/liff";
import type { LineProfile } from "../types/shared";
import { liffClient } from "../lib/liff-client";

interface UseLiffState {
  liffObject: Liff | null;
  profile: LineProfile | null;
  isReady: boolean;
  isLoggedIn: boolean;
  isInClient: boolean;
  error: Error | null;
}

/** Initializes LIFF on mount and exposes its state to components. */
export function useLiff() {
  const [state, setState] = useState<UseLiffState>({
    liffObject: null,
    profile: null,
    isReady: false,
    isLoggedIn: false,
    isInClient: false,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    liffClient
      .init()
      .then(async () => {
        if (cancelled) return;

        const loggedIn = liffClient.isLoggedIn();
        const profile = loggedIn ? await liffClient.getProfile() : null;

        if (cancelled) return;

        setState({
          liffObject: liff,
          profile,
          isReady: true,
          isLoggedIn: loggedIn,
          isInClient: liffClient.isInClient(),
          error: null,
        });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setState((prev) => ({
          ...prev,
          isReady: true,
          error: err instanceof Error ? err : new Error("Failed to initialize LIFF"),
        }));
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
