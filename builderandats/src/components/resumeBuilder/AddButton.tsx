"use client";

interface AddButtonProps {
  onClick: () => void;
  label: string;
  disabled?: boolean;
}

export default function AddButton({ onClick, label, disabled }: AddButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-3 border-2 border-dashed rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
        disabled
          ? "border-[var(--border)] text-[var(--text-tertiary)] cursor-not-allowed"
          : "border-[var(--accent-mid)] text-[var(--accent)] hover:bg-[var(--accent-dim)] hover:border-[var(--accent)]"
      }`}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
      </svg>
      {label}
    </button>
  );
}