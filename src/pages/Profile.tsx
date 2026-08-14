import { useEffect, useState } from "react";
import type { User } from "@line-oa/shared";
import { useLiff } from "../hooks/useLiff";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Mock user id for local dev — apps/api's in-memory repository has this seeded.
const MOCK_USER_ID = "usr_1";

interface ProfileProps {
  onBack: () => void;
}

export function Profile({ onBack }: ProfileProps) {
  const { profile, isLoggedIn, isReady } = useLiff();
  const [apiUser, setApiUser] = useState<User | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    if (!isReady || !isLoggedIn) return;

    const controller = new AbortController();

    fetch(`${API_BASE_URL}/users/${MOCK_USER_ID}`, { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error(`API responded with ${res.status}`);
        const data = (await res.json()) as { user: User };
        setApiUser(data.user);
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setApiError(err instanceof Error ? err.message : "Failed to fetch mock user");
      });

    return () => controller.abort();
  }, [isReady, isLoggedIn]);

  return (
    <section>
      <button className="link-button" onClick={onBack}>
        &larr; Back
      </button>
      <h1>Profile</h1>

      {!isLoggedIn && <p>You need to log in first.</p>}

      {isLoggedIn && (
        <>
          <div className="card">
            <h2>LIFF Profile</h2>
            {profile ? (
              <ul>
                <li>User ID: {profile.userId}</li>
                <li>Display name: {profile.displayName}</li>
                {profile.statusMessage && <li>Status message: {profile.statusMessage}</li>}
              </ul>
            ) : (
              <p>Loading LIFF profile...</p>
            )}
          </div>

          <div className="card">
            <h2>Mock API User (GET /users/{MOCK_USER_ID})</h2>
            {apiError && <p className="error">{apiError}</p>}
            {!apiError && !apiUser && <p>Loading...</p>}
            {apiUser && (
              <ul>
                <li>Id: {apiUser.id}</li>
                <li>Display name: {apiUser.displayName}</li>
                <li>Role: {apiUser.role}</li>
                <li>LINE user id: {apiUser.lineUserId}</li>
              </ul>
            )}
          </div>
        </>
      )}
    </section>
  );
}
