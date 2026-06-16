import React from "react";

interface ScoreRingProps {
  score: number;
}

const ScoreRing = ({ score }: ScoreRingProps) => {
  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <div
        className="absolute w-100 h-100 rounded-full blur-[120px]"
        style={{ background: "rgba(232,117,74,0.12)" }}
      />

      <svg className="w-72 h-72 transform -rotate-90 relative z-10">
        <circle
          cx="144"
          cy="144"
          r={radius}
          stroke="currentColor"
          strokeWidth="12"
          fill="transparent"
          className="text-white/5"
        />
        <circle
          cx="144"
          cy="144"
          r={radius}
          stroke="url(#gradient)"
          strokeWidth="12"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-[1800ms]"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E8754A" />
            <stop offset="100%" stopColor="#F0A070" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute z-20 flex flex-col items-center">
        <span
          className="text-6xl font-black"
          style={{
            fontFamily: "'Syne', system-ui, sans-serif",
            color: "#E8754A",
          }}
        >
          {score}
        </span>
        <span className="text-xs uppercase tracking-[0.3em] text-gray-400 font-semibold mt-2">
          ATS SCORE
        </span>
        {/* <div className="mt-4 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-300 text-xs font-bold">
          Resume Ready ✔
        </div> */}
      </div>
    </div>
  );
};

export default ScoreRing;
