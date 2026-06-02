import React from "react";

interface ProgressBarProps {
  value: number;
}

const ProgressBar = ({ value }: ProgressBarProps) => (
  <div className="mt-4">
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs text-gray-400 uppercase tracking-wider">
        Optimization
      </span>
      <span className="text-sm font-bold text-white">{value}%</span>
    </div>
    <div className="h-2 rounded-full bg-white/5 overflow-hidden border border-white/5">
      <div
        className="h-full rounded-full transition-all duration-1000"
        style={{
          background: "linear-gradient(90deg, #E8754A, #F0A070)",
          width: `${value}%`,
        }}
      />
    </div>
  </div>
);

export default ProgressBar;
