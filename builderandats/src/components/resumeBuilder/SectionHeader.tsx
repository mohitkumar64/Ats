"use client";

interface SectionHeaderProps {
  count: number;
  max: number;
  label: string;
}

export default function SectionHeader({ count, max, label }: SectionHeaderProps) {
  const isFull = count >= max;
  return (
    <div className="flex items-center justify-between mb-4">
      <p className="text-sm text-white/60">{label}</p>
      <span className={`text-xs font-bold px-2 py-1 rounded-full border ${
        isFull
          ? "bg-orange-500/10 text-orange-400 border-orange-500/20"
          : "bg-[var(--accent-dim)] text-[var(--accent)] border-[var(--accent-mid)]"
      }`}>
        {count}/{max}
      </span>
    </div>
  );
}