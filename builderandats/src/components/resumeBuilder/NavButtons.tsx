"use client";

import React from "react";

interface NavButtonsProps {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  showError?: boolean;
  errorMsg?: string;
}

export default function NavButtons({ onBack, onNext, nextLabel, showError, errorMsg }: NavButtonsProps) {
  return (
    <div className="pt-4 space-y-3">
      <div
        className={`flex items-center gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg transition-all duration-300 overflow-hidden ${showError ? "max-h-12 opacity-100" : "max-h-0 opacity-0 py-0 border-0"
          }`}
      >
        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        {errorMsg}
      </div>

      <div className="flex justify-between items-center">
        {onBack ? (
          <button onClick={onBack} className="btn-ghost text-sm px-4 py-2  cursor-pointer">
            ← Back
          </button>
        ) : (
          <div />
        )}
        {onNext && (
          <button
            onClick={onNext}
            className={`btn-ghost-red cursor-pointer px-5 py-2.5 text-sm font-semibold transition-all ${showError ? "bg-red-500 animate-[shake_0.3s_ease-in-out]" : ""
              }`}
          >
            {nextLabel} →
          </button>
        )}
      </div>
    </div>
  );
}