"use client"
import Link from "next/link";
import Image from "next/image";
import {
    ArrowRight,
    ScanSearch,
    FileText,
    CheckCircle2,

} from "lucide-react";

const FeatureGrid = () => {
    return (
        <>
            <section className="container-wide section-pad">

                {/* Section header */}
                <div className="rv mb-20 mt-10 flex flex-col md:flex  gap-1">
                    <div>

                        <h2
                            style={{
                                fontFamily: "'Syne', system-ui, sans-serif",
                                fontWeight: 800,
                                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                                lineHeight: 1.05,
                                letterSpacing: "-0.025em",
                                color: "#F0F2F5",
                                maxWidth: "520px",
                            }}
                        >
                            Two precise tools.
                            <br />
                            One decisive outcome.
                        </h2>
                    </div>
                    <p
                        className="text-[#7A8499] md:mr-[300px]  text-[1rem] max-w-[300px] line-height-[1.7rem]  "
                    >
                        Stop guessing what recruiters want. Get the data, fix the gaps, export the result.
                    </p>
                </div>

                {/* 5-col asymmetric grid */}
                <div className="grid lg:grid-cols-5 gap-5">

                    {/* Large card — ATS Checker */}
                    <div
                        className="rv lg:col-span-3   transition-transform duration-300 rounded-2xl p-8 lg:p-10 relative overflow-hidden group cursor-pointer"
                        style={{
                            background: "var(--surface)",
                            border: "1px solid rgba(255,255,255,0.07)",
                            transition: "border-color 300ms cubic-bezier(0.23,1,0.32,1), box-shadow 300ms cubic-bezier(0.23,1,0.32,1)",
                        }}
                        onMouseEnter={(e) => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.borderColor = "rgba(232,117,74,0.22)";
                            el.style.boxShadow = "0 0 80px rgba(232,117,74,0.05) inset, 0 24px 60px rgba(0,0,0,0.30)";
                        }}
                        onMouseLeave={(e) => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.borderColor = "rgba(255,255,255,0.07)";
                            el.style.boxShadow = "none";
                        }}
                    >
                        {/* Corner glow */}
                        <div
                            className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none opacity-0 group-hover:opacity-100"
                            style={{
                                background: "radial-gradient(circle, rgba(232,117,74,0.08) 0%, transparent 70%)",
                                transition: "opacity 500ms cubic-bezier(0.23,1,0.32,1)",
                            }}
                        />

                        <div className="relative z-10 ">
                            {/* Icon + label row */}
                            <div className="flex items-start justify-between mb-8">
                                <div
                                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                                    style={{ background: "rgba(232,117,74,0.09)", border: "1px solid rgba(232,117,74,0.18)" }}
                                >
                                    <ScanSearch className="w-5 h-5" style={{ color: "#E8754A" }} />
                                </div>
                                <span
                                    style={{
                                        color: "#2A3444",
                                        fontFamily: "'JetBrains Mono', monospace",
                                        fontSize: "11px",
                                        letterSpacing: "0.06em",
                                    }}
                                >
                                    01
                                </span>
                            </div>

                            <h3
                                className="mb-4 leading-tight"
                                style={{
                                    fontFamily: "'Syne', system-ui, sans-serif",
                                    fontWeight: 700,
                                    fontSize: "1.625rem",
                                    color: "#F0F2F5",
                                }}
                            >
                                ATS Resume Checker
                            </h3>

                            <p className="mb-8 leading-relaxed" style={{ color: "#7A8499", fontSize: "0.9375rem", maxWidth: "440px" }}>
                                Paste any job description. Upload your resume. Our AI maps the exact ATS
                                logic — surfacing every keyword gap, formatting conflict, and score opportunity.
                            </p>

                            <ul className="space-y-3 mb-10">
                                {[
                                    "Instant keyword gap analysis against any JD",
                                    "ATS formatting compatibility audit",
                                    "Prioritized improvement roadmap",
                                    "Score prediction before you apply",
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "#8A97AA" }}>
                                        <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#4ECCA3" }} />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="/ats"
                                className="inline-flex items-center gap-2 text-sm font-semibold group/l"
                                style={{ color: "#E8754A", transition: "gap 200ms cubic-bezier(0.23,1,0.32,1)" }}
                                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.gap = "10px"; }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.gap = "8px"; }}
                            >
                                Scan your resume
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Right column */}
                    <div className="lg:col-span-2 flex flex-col gap-5">

                        {/* Resume Builder */}
                        <div
                            className="rv rounded-2xl p-7 relative overflow-hidden flex-1 group cursor-pointer"
                            style={{
                                background: "var(--surface)",
                                border: "1px solid rgba(255,255,255,0.07)",
                                transition: "border-color 300ms cubic-bezier(0.23,1,0.32,1), box-shadow 300ms cubic-bezier(0.23,1,0.32,1)",
                            }}
                            onMouseEnter={(e) => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.borderColor = "rgba(78,204,163,0.18)";
                                el.style.boxShadow = "0 0 60px rgba(78,204,163,0.04) inset, 0 16px 40px rgba(0,0,0,0.25)";
                            }}
                            onMouseLeave={(e) => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.borderColor = "rgba(255,255,255,0.07)";
                                el.style.boxShadow = "none";
                            }}
                        >
                            <div
                                className="absolute -top-12 -right-12 w-40 h-40 rounded-full pointer-events-none opacity-0 group-hover:opacity-100"
                                style={{
                                    background: "radial-gradient(circle, rgba(78,204,163,0.06) 0%, transparent 70%)",
                                    transition: "opacity 500ms cubic-bezier(0.23,1,0.32,1)",
                                }}
                            />
                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-6">
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                                        style={{ background: "rgba(78,204,163,0.08)", border: "1px solid rgba(78,204,163,0.16)" }}
                                    >
                                        <FileText className="w-4 h-4" style={{ color: "#4ECCA3" }} />
                                    </div>
                                    <span style={{ color: "#2A3444", fontFamily: "'JetBrains Mono', monospace", fontSize: "11px" }}>02</span>
                                </div>

                                <h3
                                    className="mb-3 leading-tight"
                                    style={{ fontFamily: "'Syne', system-ui, sans-serif", fontWeight: 700, fontSize: "1.25rem", color: "#F0F2F5" }}
                                >
                                    Live Resume Builder
                                </h3>
                                <p className="text-sm leading-relaxed mb-5" style={{ color: "#7A8499" }}>
                                    Build your profile once. Generate clean, ATS-parseable PDFs
                                    on demand with real-time live preview.
                                </p>

                                <ul className="space-y-2 mb-6">
                                    {["Real-time live preview", "One-click PDF export", "Profile cloud dashboard"].map((item) => (
                                        <li key={item} className="flex items-center gap-2.5 text-xs" style={{ color: "#8A97AA" }}>
                                            <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#4ECCA3" }} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href="/resumeBuilder"
                                    className="inline-flex items-center gap-2 text-sm font-semibold group/l"
                                    style={{ color: "#4ECCA3", transition: "gap 200ms cubic-bezier(0.23,1,0.32,1)" }}
                                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.gap = "10px"; }}
                                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.gap = "8px"; }}
                                >
                                    Start building
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                        {/* Resume document image card */}
                        <div
                            className="rv rounded-2xl overflow-hidden relative"
                            style={{
                                border: "1px solid rgba(255,255,255,0.07)",
                                height: "200px",
                                background: "#0A0D13",
                            }}
                        >
                            <Image
                                src="/resume-doc.png"
                                alt="ATS-optimized resume document"
                                fill
                                style={{ objectFit: "cover", opacity: 0.85 }}
                            />
                            {/* Overlay badge */}
                            <div className="absolute inset-0 flex items-end p-5">
                                <div
                                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg"
                                    style={{
                                        background: "rgba(8,10,15,0.85)",
                                        border: "1px solid rgba(78,204,163,0.25)",
                                        backdropFilter: "blur(8px)",
                                    }}
                                >
                                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#4ECCA3", boxShadow: "0 0 4px #4ECCA3" }} />
                                    <span
                                        style={{
                                            color: "#4ECCA3",
                                            fontFamily: "'JetBrains Mono', monospace",
                                            fontSize: "10px",
                                            fontWeight: 600,
                                            letterSpacing: "0.08em",
                                        }}
                                    >
                                        ATS-OPTIMIZED OUTPUT
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default FeatureGrid