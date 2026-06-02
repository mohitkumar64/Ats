import React from "react";
import { AlertCircle, Lightbulb } from "lucide-react";
import ProgressBar from "./ProgressBar";
import { SectionData, sectionConfig, formatText } from "./types";

interface SectionCardProps {
  keyName: string;
  data: SectionData;
}

const SectionCard = ({ keyName, data }: SectionCardProps) => {
  const config = sectionConfig[keyName];
  if (!config) return null;

  const Icon = config.icon;
  const score = data.match_percentage ?? data.score;

  return (
    <div
      className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-2xl p-7 hover:-translate-y-1 transition-all duration-500 h-full"
      style={{ boxShadow: "0 0 40px rgba(232,117,74,0.05)" }}
    >
      <div
        className={`absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-40 bg-gradient-to-r ${config.glow}`}
      />

      <div className="relative z-10 flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{
              background: "var(--accent-dim)",
              border: "1px solid rgba(232,117,74,0.15)",
              color: "var(--accent)",
            }}
          >
            <Icon className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">{config.title}</h3>
            <p className="text-sm text-gray-400 mt-1">AI analyzed section</p>
          </div>
        </div>

        <div
          className="px-4 py-2 rounded-xl text-sm font-bold"
          style={{
            background: "var(--accent-dim)",
            border: "1px solid rgba(232,117,74,0.18)",
            color: "var(--accent)",
          }}
        >
          {data.score} pts
        </div>
      </div>

      <ProgressBar value={score} />

      {/* Issues */}
      {data.issues && data.issues.length > 0 && (
        <div className="mt-8">
          <h4 className="flex items-center gap-2 text-sm font-bold text-rose-300 mb-4">
            <AlertCircle className="w-4 h-4" />
            Areas to Improve
          </h4>
          <div className="space-y-4">
            {data.issues.map((issue, idx) => (
              <div
                key={idx}
                className="flex gap-3 text-sm text-gray-300 leading-relaxed"
              >
                <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 shrink-0" />
                <span
                  dangerouslySetInnerHTML={{ __html: formatText(issue) }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Advice */}
      {data.advice && data.advice.length > 0 && (
        <div className="mt-8">
          <h4 className="flex items-center gap-2 text-sm font-bold text-emerald-300 mb-4">
            <Lightbulb className="w-4 h-4" />
            AI Recommendations
          </h4>
          <div className="space-y-4">
            {data.advice.map((item, idx) => (
              <div
                key={idx}
                className="flex gap-3 text-sm text-gray-300 leading-relaxed"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span
                  dangerouslySetInnerHTML={{ __html: formatText(item) }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionCard;
