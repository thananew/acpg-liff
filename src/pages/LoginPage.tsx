import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLiff } from "../hooks/useLiff";
import { RoleSelectionPage } from "./RoleSelectionPage";
import type { RegisterRole } from "../types/register";
import type { User } from "../types/shared";
import acpgLogo from "../assets/acpg_logo.svg";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:4000").replace(/\/+$/, "");

export function LoginPage() {
  const navigate = useNavigate();
  const { profile, liffObject } = useLiff();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedRole, setSelectedRole] = useState<RegisterRole | null>(null);
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successUser, setSuccessUser] = useState<User | null>(null);

  const handleSelectRole = (roleId: RegisterRole) => {
    setSelectedRole(roleId);
    setErrorMessage(null);
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const codeLabel = selectedRole === "agent" ? "Agent code" : "Staff code";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const lineUserId = profile?.userId || "mock_line_user_id";

      const response = await fetch(`${API_BASE_URL}/users/redeem-agent-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lineUserId,
          code: code.trim(),
          displayName: profile?.displayName || "Agent User",
          pictureUrl: profile?.pictureUrl ?? null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const message =
          data.error?.message ||
          data.message ||
          "รหัส Code ไม่ถูกต้อง กรุณาตรวจสอบรหัสอีกครั้ง";
        setErrorMessage(message);
        return;
      }

      setSuccessUser(data.user);
      setStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: unknown) {
      setErrorMessage("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseLiff = () => {
    if (liffObject?.isInClient()) {
      liffObject.closeWindow();
    } else {
      navigate("/home");
    }
  };

  return (
    <div className="register-container">
      <header className="register-header">
        <button
          className="icon-button back-nav"
          onClick={
            step === 2
              ? () => setStep(1)
              : step === 3
                ? () => navigate("/home")
                : () => navigate("/home")
          }
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

      {step === 1 && (
        <RoleSelectionPage
          onSelectRole={handleSelectRole}
          title="Login"
          subtitle="Select your role to continue"
        />
      )}

      {/* STEP 2: LOGIN FORM */}
      {step === 2 && (
        <section className="step-content acpg-step2">
          <div className="acpg-brand-header">
            <img src={acpgLogo} alt="ACPG" className="acpg-logo" />
          </div>

          <div className="step-title-group">
            <h1 className="main-title">Login</h1>
            <p className="sub-title">
              By logging in, you agree to our terms of Use.
            </p>
          </div>

          {errorMessage && (
            <div className="error-alert" style={{
              backgroundColor: "#fee2e2",
              color: "#dc2626",
              padding: "12px 16px",
              borderRadius: "8px",
              marginBottom: "16px",
              fontSize: "14px",
              fontWeight: 500
            }}>
              ⚠️ {errorMessage}
            </div>
          )}

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

      {/* STEP 3: SUCCESS CONFIRMATION */}
      {step === 3 && (
        <section className="step-content success-view">
          <div className="success-icon-badge">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="main-title">เข้าสู่ระบบสำเร็จ!</h1>
          <p className="sub-title">
            ยินดีต้อนรับเข้าสู่ระบบ Alpha Capital Partners Group
          </p>

          <div className="summary-card">
            <div className="summary-row">
              <span className="summary-label">ชื่อผู้ใช้งาน:</span>
              <span className="summary-value">
                {successUser?.displayName || profile?.displayName || "Agent"}
              </span>
            </div>
            {phone && (
              <div className="summary-row">
                <span className="summary-label">เบอร์โทรศัพท์:</span>
                <span className="summary-value">{phone}</span>
              </div>
            )}
            <div className="summary-row">
              <span className="summary-label">บทบาท:</span>
              <span className="summary-value role-tag-summary">
                {successUser?.role || selectedRole?.toUpperCase() || "AGENT"}
              </span>
            </div>
          </div>

          <p className="success-note">
            ระบบได้เปลี่ยนสิทธิ์และอัปเดต Rich Menu บัญชี LINE ของท่านเรียบร้อยแล้ว
          </p>

          <button className="btn-primary full-width" onClick={handleCloseLiff}>
            ตกลง / กลับสู่ LINE
          </button>
        </section>
      )}
    </div>
  );
}
