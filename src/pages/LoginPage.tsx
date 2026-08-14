import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RoleSelectionPage } from "./RoleSelectionPage";
import type { RegisterRole } from "../types/register";
import acpgLogo from "../assets/acpg_logo.svg";

export function LoginPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedRole, setSelectedRole] = useState<RegisterRole | null>(null);
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelectRole = (roleId: RegisterRole) => {
    setSelectedRole(roleId);
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const codeLabel = selectedRole === "agent" ? "Agent code" : "Staff code";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="register-container">
      <header className="register-header">
        <button
          className="icon-button back-nav"
          onClick={step === 2 ? () => setStep(1) : () => navigate("/home")}
          aria-label="Back"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </header>

      {step === 1 && <RoleSelectionPage onSelectRole={handleSelectRole} />}

      {step === 2 && (
        <section className="step-content acpg-step2">
          <div className="acpg-brand-header">
            <img src={acpgLogo} alt="ACPG" className="acpg-logo" />
          </div>

          <div className="step-title-group">
            <h1 className="main-title">Login</h1>
            <p className="sub-title">
              By logging in, you agree to our company of Use.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label htmlFor="code">{codeLabel}</label>
              <input
                id="code"
                type="text"
                required
                placeholder={codeLabel}
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone number</label>
              <input
                id="phone"
                type="tel"
                required
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
        </section>
      )}
    </div>
  );
}
