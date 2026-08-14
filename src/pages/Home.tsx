import { liffClient } from "../lib/liff-client";
import { useLiff } from "../hooks/useLiff";

interface HomeProps {
  onNavigateToProfile: () => void;
  onNavigateToRegister: () => void;
}

export function Home({ onNavigateToProfile, onNavigateToRegister }: HomeProps) {
  const { isReady, isLoggedIn, isInClient, error } = useLiff();

  return (
    <section className="step-content">
      <h1 className="main-title">LINE OA — LIFF Home</h1>

      <div className="card">
        <p>
          LIFF init status: <strong>{isReady ? "ready" : "initializing..."}</strong>
        </p>
        <p>
          Running inside LINE app: <strong>{isInClient ? "yes" : "no (browser dev mode)"}</strong>
        </p>
        {error && <p className="error">Failed to init LIFF: {error.message}</p>}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "20px" }}>
        <button className="btn-primary" onClick={onNavigateToRegister}>
          📝 หน้าลงทะเบียน (Register Rich Menu)
        </button>

        {isReady && !isLoggedIn && !error && (
          <button className="btn-secondary" onClick={() => liffClient.login()}>
            Login with LINE
          </button>
        )}

        {isReady && isLoggedIn && (
          <button className="btn-secondary" onClick={onNavigateToProfile}>
            View Profile
          </button>
        )}
      </div>
    </section>
  );
}
