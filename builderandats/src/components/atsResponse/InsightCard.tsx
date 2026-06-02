import React from "react";
import { CheckCircle2 } from "lucide-react";

interface InsightCardProps {
  title: string;
  value: string;
  color: string;
}

const InsightCard = ({ title, value, color }: InsightCardProps) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:-translate-y-1 transition-all duration-300">
    <div
      className={`w-12 h-12 rounded-2xl bg-${color}-500/10 border border-${color}-400/20 flex items-center justify-center mb-5`}
    >
      <CheckCircle2 className={`w-6 h-6 text-${color}-300`} />
    </div>
    <h3 className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-3">
      {title}
    </h3>
    <p className="text-3xl font-black text-white">{value}</p>
  </div>
);

export default InsightCard;
