"use client"
import ScoreCounter from "./ScoreCounter"
import { useEffect, useRef } from "react";
import { ShieldCheck } from "lucide-react";

function ATSCard() {
    const keywords = [
        { label: "React.js", match: true },
        { label: "TypeScript", match: true },
        { label: "System Design", match: true },
        { label: "Kubernetes", match: false },
        { label: "CI/CD", match: true },
    ];

    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const t = setTimeout(() => {
            if (!barRef.current) return;
            barRef.current.style.transition = "width 1.8s cubic-bezier(0.23,1,0.32,1)";
            barRef.current.style.width = "94%";
        }, 900);
        return () => clearTimeout(t);
    }, []);

    return (
        <div
            className="rounded-2xl overflow-hidden w-full"
            style={{
                background: "rgba(14,17,23,0.97)",
                border: "1px solid rgba(255,255,255,0.09)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 0.5px rgba(255,255,255,0.04)",
                backdropFilter: "blur(20px)",
            }}
        >
            {/* Terminal topbar */}
            <div
                className="flex items-center gap-2 px-4 py-3"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: "#0A0D13" }}
            >
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#3B3B3B" }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#3B3B3B" }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#3B3B3B" }} />
                <span
                    className="ml-2 text-[11px] tracking-wide"
                    style={{ color: "#3D4A5C", fontFamily: "'JetBrains Mono', monospace" }}
                >
                    ats_scan.sh
                </span>
                <span
                    className="ml-auto flex items-center gap-1.5 text-[10px]"
                    style={{ color: "#4ECCA3", fontFamily: "'JetBrains Mono', monospace" }}
                >
                    <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: "#4ECCA3", boxShadow: "0 0 4px #4ECCA3", animation: "pulse 2s ease-in-out infinite" }}
                    />
                    LIVE
                </span>
            </div>

            <div className="p-5 space-y-4">
                {/* Score */}
                <div className="flex items-end justify-between">
                    <div>
                        <p
                            className="text-[9px] tracking-[0.14em] uppercase mb-1.5"
                            style={{ color: "#3D4A5C", fontFamily: "'JetBrains Mono', monospace" }}
                        >
                            ATS_MATCH_SCORE
                        </p>
                        <div className="flex items-end gap-1">
                            <span
                                className="text-[42px] font-bold leading-none tabular-nums"
                                style={{ fontFamily: "'Syne', system-ui, sans-serif", color: "#E8754A" }}
                            >
                                <ScoreCounter />
                            </span>
                            <span className="text-base mb-1" style={{ color: "#3D4A5C" }}>/100</span>
                        </div>
                    </div>
                    <div
                        className="flex flex-col items-end gap-1"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                        <span className="text-[9px]" style={{ color: "#3D4A5C" }}>RANK</span>
                        <span className="text-lg font-bold" style={{ color: "#4ECCA3" }}>Top 5%</span>
                    </div>
                </div>

                {/* Score bar */}
                <div
                    className="h-1 rounded-full overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                >
                    <div
                        ref={barRef}
                        className="h-full rounded-full"
                        style={{
                            width: "0%",
                            background: "linear-gradient(90deg, #E8754A 0%, #F0A070 100%)",
                            boxShadow: "0 0 8px rgba(232,117,74,0.4)",
                        }}
                    />
                </div>

                {/* Separator */}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }} />

                {/* Keywords */}
                <div>
                    <p
                        className="text-[9px] tracking-[0.12em] uppercase mb-2.5"
                        style={{ color: "#3D4A5C", fontFamily: "'JetBrains Mono', monospace" }}
                    >
                        KEYWORD_MATCH
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                        {keywords.map((kw) => (
                            <span
                                key={kw.label}
                                className="px-2 py-0.5 rounded text-[10px] font-medium"
                                style={{
                                    background: kw.match ? "rgba(78,204,163,0.08)" : "rgba(239,68,68,0.07)",
                                    border: `1px solid ${kw.match ? "rgba(78,204,163,0.20)" : "rgba(239,68,68,0.18)"}`,
                                    color: kw.match ? "#4ECCA3" : "#F87171",
                                    fontFamily: "'JetBrains Mono', monospace",
                                }}
                            >
                                {kw.match ? "✓" : "✗"} {kw.label}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Bottom status */}
                <div
                    className="flex items-center gap-2 pt-1"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
                >
                    <ShieldCheck className="w-3.5 h-3.5" style={{ color: "#4ECCA3" }} />
                    <span
                        className="text-[9px] tracking-wide"
                        style={{ color: "#3D4A5C", fontFamily: "'JetBrains Mono', monospace" }}
                    >
                        ANALYSIS COMPLETE · 1.4s
                    </span>
                    <span
                        className="ml-auto text-[10px]"
                        style={{
                            color: "#E8754A",
                            fontFamily: "'JetBrains Mono', monospace",
                            animation: "blink 1s step-end infinite",
                        }}
                    >
                        █
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ATSCard;