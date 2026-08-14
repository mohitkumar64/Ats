"use client";

import React from "react";

interface FormFieldProps {
  label: string;
  hint?: string;
  children: React.ReactNode;
  error?: string;
}

export default function FormField({ label, hint, children, error }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-white/80 tracking-wide">{label}</label>
      {hint && <p className="text-[11px] text-white/45 -mt-1">{hint}</p>}
      {children}
      {error && (
        <p className="text-[11px] text-red-400 flex items-center gap-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}