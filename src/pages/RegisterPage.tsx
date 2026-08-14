import { useState } from "react";
import { useLiff } from "../hooks/useLiff";
import { RoleCard } from "../components/RoleCard";
import { ROLE_OPTIONS, type RegisterFormData, type RegisterRole } from "../types/register";

interface RegisterPageProps {
  onBackToHome: () => void;
}

export function RegisterPage({ onBackToHome }: RegisterPageProps) {
  const { profile, isInClient } = useLiff();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedRole, setSelectedRole] = useState<RegisterRole | null>(null);

  const [formData, setFormData] = useState<RegisterFormData>({
    role: "customer",
    fullName: profile?.displayName || "",
    phone: "",
    email: "",
    agentLicenseNo: "",
    companyName: "",
    borrowerIncome: "",
    interestedProject: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update full name if profile loads late
  if (profile?.displayName && !formData.fullName) {
    setFormData((prev) => ({ ...prev, fullName: profile.displayName }));
  }

  const handleSelectRole = (roleId: RegisterRole) => {
    setSelectedRole(roleId);
    setFormData((prev) => ({ ...prev, role: roleId }));
  };

  const handleNextStep = () => {
    if (selectedRole) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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
        <button className="icon-button back-nav" onClick={onBackToHome} aria-label="Back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="profile-chip">
          {profile?.pictureUrl ? (
            <img src={profile.pictureUrl} alt={profile.displayName} className="avatar-img" />
          ) : (
            <div className="avatar-placeholder">
              {profile?.displayName ? profile.displayName.charAt(0).toUpperCase() : "U"}
            </div>
          )}
          <div className="profile-meta">
            <span className="profile-name">{profile?.displayName || "LINE User"}</span>
            <span className="profile-status">
              {isInClient ? "🟢 LINE Official" : "🌐 Web Preview"}
            </span>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="step-progress">
        <div className={`step-item ${step >= 1 ? "active" : ""}`}>
          <div className="step-circle">1</div>
          <span className="step-label">เลือกประเภท</span>
        </div>
        <div className="step-line-connector">
          <div className={`step-line-fill ${step >= 2 ? "active" : ""}`}></div>
        </div>
        <div className={`step-item ${step >= 2 ? "active" : ""}`}>
          <div className="step-circle">2</div>
          <span className="step-label">กรอกข้อมูล</span>
        </div>
      </div>

      {/* STEP 1: ROLE SELECTION */}
      {step === 1 && (
        <section className="step-content">
          <div className="step-title-group">
            <h1 className="main-title">เลือกประเภทการลงทะเบียน</h1>
            <p className="sub-title">กรุณาเลือกประเภทผู้ใช้งานที่ตรงกับความต้องการของคุณเพื่อดำเนินการต่อ</p>
          </div>

          <div className="roles-grid">
            {ROLE_OPTIONS.map((option) => (
              <RoleCard
                key={option.id}
                option={option}
                isSelected={selectedRole === option.id}
                onSelect={handleSelectRole}
              />
            ))}
          </div>

          <div className="sticky-action-bar">
            <button
              className="btn-primary"
              disabled={!selectedRole}
              onClick={handleNextStep}
            >
              <span>ถัดไป</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </section>
      )}

      {/* STEP 2: REGISTRATION FORM */}
      {step === 2 && activeRoleConfig && (
        <section className="step-content">
          <div className="step-title-group">
            <span className="role-chip-selected">
              {activeRoleConfig.badge} - {activeRoleConfig.title}
            </span>
            <h1 className="main-title">กรอกข้อมูลสมัครสมาชิก</h1>
            <p className="sub-title">ข้อมูลนี้จะถูกเชื่อมโยงกับบัญชี LINE ของคุณโดยอัตโนมัติ</p>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label htmlFor="fullName">ชื่อ-นามสกุล <span className="req">*</span></label>
              <input
                id="fullName"
                type="text"
                required
                placeholder="สมชาย ใจดี"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">เบอร์โทรศัพท์ <span className="req">*</span></label>
              <input
                id="phone"
                type="tel"
                required
                placeholder="0812345678"
                pattern="[0-9]{9,10}"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">อีเมล (ถ้ามี)</label>
              <input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            {/* Dynamic Role Fields */}
            {selectedRole === "agent" && (
              <>
                <div className="form-group">
                  <label htmlFor="companyName">ชื่อสังกัด / บริษัทนายหน้า</label>
                  <input
                    id="companyName"
                    type="text"
                    placeholder="ระบุชื่อบริษัท หรือ อิสระ (Freelance)"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="agentLicense">เลขที่ใบอนุญาตนายหน้า (ถ้ามี)</label>
                  <input
                    id="agentLicense"
                    type="text"
                    placeholder="AGT-123456"
                    value={formData.agentLicenseNo}
                    onChange={(e) => setFormData({ ...formData, agentLicenseNo: e.target.value })}
                  />
                </div>
              </>
            )}

            {selectedRole === "borrower" && (
              <>
                <div className="form-group">
                  <label htmlFor="borrowerIncome">รายได้เฉลี่ยต่อเดือน (บาท)</label>
                  <select
                    id="borrowerIncome"
                    value={formData.borrowerIncome}
                    onChange={(e) => setFormData({ ...formData, borrowerIncome: e.target.value })}
                  >
                    <option value="">-- กรุณาเลือกช่วงรายได้ --</option>
                    <option value="below_30k">ต่ำกว่า 30,000 บาท</option>
                    <option value="30k_50k">30,000 - 50,000 บาท</option>
                    <option value="50k_100k">50,000 - 100,000 บาท</option>
                    <option value="above_100k">มากกว่า 100,000 บาทขึ้นไป</option>
                  </select>
                </div>
              </>
            )}

            {selectedRole === "customer" && (
              <>
                <div className="form-group">
                  <label htmlFor="interestedProject">โครงการที่สนใจเป็นพิเศษ</label>
                  <input
                    id="interestedProject"
                    type="text"
                    placeholder="เช่น คอนโดสุขุมวิท / บ้านเดี่ยวราชพฤกษ์"
                    value={formData.interestedProject}
                    onChange={(e) => setFormData({ ...formData, interestedProject: e.target.value })}
                  />
                </div>
              </>
            )}

            <div className="form-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setStep(1)}
                disabled={isSubmitting}
              >
                ย้อนกลับ
              </button>

              <button type="submit" className="btn-primary" disabled={isSubmitting}>
                {isSubmitting ? "กำลังลงทะเบียน..." : "ยืนยันลงทะเบียน"}
              </button>
            </div>
          </form>
        </section>
      )}

      {/* STEP 3: SUCCESS CONFIRMATION */}
      {step === 3 && activeRoleConfig && (
        <section className="step-content success-view">
          <div className="success-icon-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="main-title">ลงทะเบียนสำเร็จ!</h1>
          <p className="sub-title">
            ขอบคุณสำหรับการลงทะเบียนบัญชีในบทบาท <strong>{activeRoleConfig.title}</strong>
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
              <span className="summary-value role-tag-summary">{activeRoleConfig.badge}</span>
            </div>
          </div>

          <p className="success-note">
            ระบบได้ผูกข้อมูลกับบัญชี LINE ของคุณเรียบร้อยแล้ว ท่านสามารถใช้งานบริการผ่านเมนูหลัก LINE OA ได้ทันที
          </p>

          <button className="btn-primary full-width" onClick={onBackToHome}>
            กลับสู่หน้าหลัก
          </button>
        </section>
      )}
    </div>
  );
}
