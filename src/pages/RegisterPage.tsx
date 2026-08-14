import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLiff } from "../hooks/useLiff";
import { RoleSelectionPage } from "./RoleSelectionPage";
import {
  ROLE_OPTIONS,
  type RegisterFormData,
  type RegisterRole,
} from "../types/register";
import acpgLogo from "../assets/acpg_logo.svg";

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 12s3.6-7 9-7 9 7 9 7-3.6 7-9 7-9-7-9-7z"
        />
        <circle
          cx="12"
          cy="12"
          r="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 3l18 18M10.6 10.6a3 3 0 004.24 4.24M9.88 5.09A9.77 9.77 0 0112 5c5.4 0 9 7 9 7a13.5 13.5 0 01-3.15 3.9M6.61 6.61A13.4 13.4 0 003 12s3.6 7 9 7a9.7 9.7 0 004.39-1.03"
      />
    </svg>
  );
}

export function RegisterPage() {
  const navigate = useNavigate();
  const onBackToHome = () => navigate("/home");
  const { profile } = useLiff();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedRole, setSelectedRole] = useState<RegisterRole | null>(null);

  const [formData, setFormData] = useState<RegisterFormData>({
    role: "customer",
    fullName: profile?.displayName || "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    agentLicenseNo: "",
    companyName: "",
    borrowerIncome: "",
    interestedProject: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Update full name if profile loads late
  if (profile?.displayName && !formData.fullName) {
    setFormData((prev) => ({ ...prev, fullName: profile.displayName }));
  }

  const handleSelectRole = (roleId: RegisterRole) => {
    setSelectedRole(roleId);
    setFormData((prev) => ({ ...prev, role: roleId }));
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API registration delay
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);
    }, 1000);
  };

  const activeRoleConfig = ROLE_OPTIONS.find((r) => r.id === selectedRole);

  return (
    <div className="register-container">
      {/* Header Profile Bar */}
      <header className="register-header">
        <button
          className="icon-button back-nav"
          onClick={onBackToHome}
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

      {/* STEP 1: ROLE SELECTION */}
      {step === 1 && <RoleSelectionPage onSelectRole={handleSelectRole} />}

      {/* STEP 2: REGISTRATION FORM */}
      {step === 2 && activeRoleConfig && (
        <section className="step-content acpg-step2">
          <div className="acpg-brand-header">
            <img src={acpgLogo} alt="ACPG" className="acpg-logo" />
          </div>

          <div className="step-title-group">
            <h1 className="main-title">Sign up Form</h1>
            <p className="sub-title">
              Alpha Capital Partners Group Public Company Limited
            </p>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label htmlFor="fullName">Fullname</label>
              <input
                id="fullName"
                type="text"
                placeholder="Bob Smith"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-field-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-field-wrapper">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  <EyeIcon open={showConfirmPassword} />
                </button>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create Account"}
              </button>

              <button
                type="button"
                className="btn-secondary"
                onClick={() => setStep(1)}
                disabled={isSubmitting}
              >
                Back
              </button>
            </div>
          </form>
        </section>
      )}

      {/* STEP 3: SUCCESS CONFIRMATION */}
      {step === 3 && activeRoleConfig && (
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

          <h1 className="main-title">ลงทะเบียนสำเร็จ!</h1>
          <p className="sub-title">
            ขอบคุณสำหรับการลงทะเบียนบัญชีในบทบาท{" "}
            <strong>{activeRoleConfig.title}</strong>
          </p>

          <div className="summary-card">
            <div className="summary-row">
              <span className="summary-label">ชื่อผู้สมัคร:</span>
              <span className="summary-value">{formData.fullName}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">เบอร์โทรศัพท์:</span>
              <span className="summary-value">{formData.phone}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">ประเภทบัญชี:</span>
              <span className="summary-value role-tag-summary">
                {activeRoleConfig.badge}
              </span>
            </div>
          </div>

          <p className="success-note">
            ระบบได้ผูกข้อมูลกับบัญชี LINE ของคุณเรียบร้อยแล้ว
            ท่านสามารถใช้งานบริการผ่านเมนูหลัก LINE OA ได้ทันที
          </p>

          <button className="btn-primary full-width" onClick={onBackToHome}>
            กลับสู่หน้าหลัก
          </button>
        </section>
      )}
    </div>
  );
}
