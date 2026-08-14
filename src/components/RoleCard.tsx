import type { RoleOption } from "../types/register";

interface RoleCardProps {
  option: RoleOption;
  isSelected: boolean;
  onSelect: (roleId: RoleOption["id"]) => void;
}

export function RoleCard({ option, isSelected, onSelect }: RoleCardProps) {
  const getIcon = (roleId: RoleOption["id"]) => {
    switch (roleId) {
      case "agent":
        return (
          <svg className="role-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case "borrower":
        return (
          <svg className="role-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V6m0 12v-2m-9 1h18s-1-7-9-7-9 7-9 7z" />
          </svg>
        );
      case "customer":
        return (
          <svg className="role-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
    }
  };

  return (
    <div
      className={`role-card ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect(option.id)}
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(option.id);
        }
      }}
    >
      {option.recommendedTag && (
        <span className="role-tag">{option.recommendedTag}</span>
      )}

      <div className="role-card-header">
        <div className="role-icon-wrapper">
          {getIcon(option.id)}
        </div>
        <div className="role-card-titles">
          <div className="role-title-row">
            <h3 className="role-title">{option.title}</h3>
            <span className="role-badge">{option.badge}</span>
          </div>
          <span className="role-title-en">{option.titleEn}</span>
        </div>
        <div className={`role-radio ${isSelected ? "active" : ""}`}>
          {isSelected && (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>

      <p className="role-description">{option.description}</p>

      <ul className="role-features">
        {option.features.map((feat, idx) => (
          <li key={idx}>
            <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>{feat}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
