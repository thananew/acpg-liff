import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { useLiff } from "./hooks/useLiff";
import "./styles/app.css";

function RootRedirect() {
  const params = new URLSearchParams(window.location.search);
  const pageParam = params.get("page") || params.get("action");
  if (pageParam === "login") {
    return <Navigate to="/login" replace />;
  }
  // Default to /register for convenience when opening rich menu LIFF
  return <Navigate to="/register" replace />;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  // Wait for liff.init() to finish reading/consuming the LINE login callback
  // params (code/state/liff.state) before any route redirect touches the
  // URL — redirecting first strips those params and breaks the login,
  // causing a login loop when opened from the LINE app.
  const { isReady } = useLiff();

  if (!isReady) {
    return null;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <main className="app">
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/register" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
