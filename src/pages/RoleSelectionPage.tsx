import type { RegisterRole } from "../types/register";
import acpgLogo from "../assets/acpg_logo.svg";

interface RoleSelectOption {
  id: RegisterRole;
  title: string;
  description: string;
}

const ROLE_SELECT_OPTIONS: RoleSelectOption[] = [
  {
    id: "agent",
    title: "Real Estate Agent",
    description: "For Real Estate Agents & Partners.",
  },
  {
    id: "customer",
    title: "Real Estate Owned",
    description: "For Real Estate Owned.",
  },
];

interface RoleSelectionPageProps {
  onSelectRole: (roleId: RegisterRole) => void;
  title?: string;
  subtitle?: string;
}

export function RoleSelectionPage({
  onSelectRole,
  title = "Register",
  subtitle = "Alpha Capital Partners Group Public Company Limited",
}: RoleSelectionPageProps) {
  return (
    <section className="step-content acpg-role-select">
      <div className="acpg-brand-header">
        <img src={acpgLogo} alt="ACPG" className="acpg-logo" />
      </div>

      <div className="step-title-group">
        <h1 className="main-title">{title}</h1>
        <p className="sub-title">{subtitle}</p>
      </div>

      <div className="acpg-role-list">
        {ROLE_SELECT_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            className="acpg-role-card"
            onClick={() => onSelectRole(option.id)}
          >
            <span className="acpg-role-card-title">{option.title}</span>
            <span className="acpg-role-card-desc">{option.description}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
