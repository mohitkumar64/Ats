"use client"
import { useState } from "react";
import {
    Upload,
    Zap,
    Download,
    ArrowRight,
} from "lucide-react";

const steps = [
    {
        num: "01",
        Icon: Upload,
        title: "Prepare",
        desc: "Upload your existing resume PDF or build a fresh one using our live generator. Takes 60 seconds.",
        detail: "Drag & drop your PDF — we extract every section automatically.",
        accent: "#E8754A",
        rgb: "232,117,74",
    },
    {
        num: "02",
        Icon: Zap,
        title: "Analyze",
        desc: "Paste the job description. Our AI maps skills, keywords, and formatting against ATS requirements.",
        detail: "Real-time scoring with actionable keyword gap analysis.",
        accent: "#4ECCA3",
        rgb: "78,204,163",
    },
    {
        num: "03",
        Icon: Download,
        title: "Export",
        desc: "Apply suggestions. Download your optimized PDF — scoring 90 %+ on any ATS system.",
        detail: "One-click PDF export with guaranteed ATS compatibility.",
        accent: "#E8754A",
        rgb: "232,117,74",
    },
];

const HowItWorks = () => {
    const [activeStep, setActiveStep] = useState<number | null>(null);

    return (
        <section
            style={{
                borderTop: "1px solid rgba(255,255,255,0.04)",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
            }}
        >
            <div className="container-wide section-pad">
                {/* Section header */}
                <div className="rv mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <div>
                        <p
                            className="mb-4"
                            style={{
                                color: "#3D4A5C",
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: "10px",
                                fontWeight: 600,
                                letterSpacing: "0.16em",
                                textTransform: "uppercase",
                            }}
                        >
                            Process
                        </p>
                        <h2
                            style={{
                                fontFamily: "'Syne', system-ui, sans-serif",
                                fontWeight: 800,
                                fontSize: "clamp(1.875rem, 3.5vw, 3rem)",
                                lineHeight: 1.05,
                                letterSpacing: "-0.025em",
                                color: "#F0F2F5",
                                maxWidth: "480px",
                            }}
                        >
                            Three steps to the
                            <br />
                            top of the pile.
                        </h2>
                    </div>

                    {/* Progress dots — desktop */}
                    <div className="hidden md:flex items-center gap-3 pb-2">
                        {steps.map((step, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div
                                    className="relative w-3 h-3 rounded-full transition-all duration-300"
                                    style={{
                                        background:
                                            activeStep === i
                                                ? step.accent
                                                : "rgba(255,255,255,0.08)",
                                        boxShadow:
                                            activeStep === i
                                                ? `0 0 12px ${step.accent}60`
                                                : "none",
                                    }}
                                />
                                {i < steps.length - 1 && (
                                    <div
                                        className="w-12 h-px transition-all duration-500"
                                        style={{
                                            background:
                                                activeStep !== null && activeStep > i
                                                    ? `linear-gradient(90deg, ${steps[i].accent}, ${steps[i + 1].accent})`
                                                    : "rgba(255,255,255,0.06)",
                                        }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Steps grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {steps.map((step, i) => {
                        const isActive = activeStep === i;

                        return (
                            <div
                                key={i}
                                className="rv group relative"
                                onMouseEnter={() => setActiveStep(i)}
                                onMouseLeave={() => setActiveStep(null)}
                            >
                                {/* Connector line between cards — desktop only */}
                                {i < steps.length - 1 && (
                                    <div
                                        className="hidden md:block absolute top-1/2 -right-3 w-6 h-px z-10"
                                        style={{
                                            background:
                                                activeStep !== null && activeStep >= i
                                                    ? `linear-gradient(90deg, rgba(${step.rgb},0.4), rgba(${steps[i + 1].rgb},0.4))`
                                                    : "rgba(255,255,255,0.06)",
                                            transition: "background 400ms cubic-bezier(0.23,1,0.32,1)",
                                        }}
                                    />
                                )}

                                <div
                                    className="relative overflow-hidden rounded-2xl p-8 lg:p-10 h-full cursor-pointer"
                                    style={{
                                        background: "var(--surface)",
                                        border: `1px solid ${isActive ? `rgba(${step.rgb},0.22)` : "rgba(255,255,255,0.07)"}`,
                                        boxShadow: isActive
                                            ? `0 0 80px rgba(${step.rgb},0.06) inset, 0 20px 50px rgba(0,0,0,0.25)`
                                            : "none",
                                        transform: isActive ? "translateY(-6px)" : "translateY(0)",
                                        transition:
                                            "transform 300ms cubic-bezier(0.23,1,0.32,1), border-color 300ms cubic-bezier(0.23,1,0.32,1), box-shadow 400ms cubic-bezier(0.23,1,0.32,1)",
                                    }}
                                >
                                    {/* Ambient glow */}
                                    <div
                                        className="absolute -top-20 -right-20 w-56 h-56 rounded-full pointer-events-none"
                                        style={{
                                            background: `radial-gradient(circle, rgba(${step.rgb},${isActive ? "0.10" : "0.02"}) 0%, transparent 70%)`,
                                            transition: "all 500ms cubic-bezier(0.23,1,0.32,1)",
                                        }}
                                    />

                                    {/* Top row: icon + number */}
                                    <div className="relative z-10 flex items-center justify-between mb-8">
                                        <div
                                            className="w-14 h-14 rounded-2xl flex items-center justify-center"
                                            style={{
                                                background: `rgba(${step.rgb},${isActive ? "0.14" : "0.06"})`,
                                                border: `1px solid rgba(${step.rgb},${isActive ? "0.30" : "0.12"})`,
                                                transition: "all 300ms cubic-bezier(0.23,1,0.32,1)",
                                            }}
                                        >
                                            <step.Icon
                                                className="w-6 h-6"
                                                style={{
                                                    color: step.accent,
                                                    transition: "transform 300ms cubic-bezier(0.23,1,0.32,1)",
                                                    transform: isActive ? "scale(1.1)" : "scale(1)",
                                                }}
                                            />
                                        </div>

                                        {/* Large ghost number */}
                                        <span
                                            style={{
                                                fontFamily: "'Syne', system-ui, sans-serif",
                                                fontSize: "4rem",
                                                fontWeight: 800,
                                                lineHeight: 1,
                                                letterSpacing: "-0.04em",
                                                color: isActive
                                                    ? `rgba(${step.rgb},0.10)`
                                                    : "rgba(255,255,255,0.03)",
                                                transition: "color 400ms cubic-bezier(0.23,1,0.32,1)",
                                            }}
                                        >
                                            {step.num}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10">
                                        <h3
                                            className="mb-3"
                                            style={{
                                                fontFamily: "'Syne', system-ui, sans-serif",
                                                fontWeight: 700,
                                                fontSize: "1.375rem",
                                                color: "#F0F2F5",
                                            }}
                                        >
                                            {step.title}
                                        </h3>

                                        <p
                                            style={{
                                                color: "#7A8499",
                                                fontSize: "0.9375rem",
                                                lineHeight: 1.7,
                                            }}
                                        >
                                            {step.desc}
                                        </p>

                                        {/* Expandable detail — slides in on hover */}
                                        <div
                                            className="overflow-hidden"
                                            style={{
                                                maxHeight: isActive ? "80px" : "0px",
                                                opacity: isActive ? 1 : 0,
                                                marginTop: isActive ? "16px" : "0px",
                                                transition:
                                                    "max-height 350ms cubic-bezier(0.23,1,0.32,1), opacity 250ms ease-out, margin-top 350ms cubic-bezier(0.23,1,0.32,1)",
                                            }}
                                        >
                                            <div
                                                className="flex items-center gap-2 text-sm font-medium"
                                                style={{ color: step.accent }}
                                            >
                                                <ArrowRight className="w-3.5 h-3.5" />
                                                {step.detail}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom accent bar */}
                                    <div
                                        className="absolute bottom-0 left-0 right-0 h-[2px]"
                                        style={{
                                            background: `linear-gradient(90deg, transparent, rgba(${step.rgb},${isActive ? "0.5" : "0"}), transparent)`,
                                            transition: "all 400ms cubic-bezier(0.23,1,0.32,1)",
                                        }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;