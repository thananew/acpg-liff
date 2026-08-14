import { useState, useEffect } from "react";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { RegisterPage } from "./pages/RegisterPage";
import "./styles/app.css";

type Page = "home" | "register" | "profile";

export default function App() {
  const [page, setPage] = useState<Page>(() => {
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get("page") || params.get("action");
    if (pageParam === "register" || pageParam === "registration") {
      return "register";
    }
    return "register"; // Default to register for convenience when opening rich menu LIFF
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <main className="app">
      {page === "register" && (
        <RegisterPage onBackToHome={() => setPage("home")} />
      )}
      {page === "home" && (
        <Home
          onNavigateToProfile={() => setPage("profile")}
          onNavigateToRegister={() => setPage("register")}
        />
      )}
      {page === "profile" && <Profile onBack={() => setPage("home")} />}
    </main>
  );
}
