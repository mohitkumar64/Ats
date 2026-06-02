"use client";
import Link from "next/link";
import { ScanSearch } from "lucide-react";
import gsap from "gsap";

const EndSection = () => {
    return (
        <section className="rv">
            <div className="container-wide py-24 lg:py-32">
                <div
                    className="rounded-2xl p-10 lg:p-16 relative overflow-hidden"
                    style={{
                        background: "linear-gradient(135deg, #110A05 0%, #0F0C07 40%, #0E1117 100%)",
                        border: "1px solid rgba(232,117,74,0.14)",
                    }}
                >
                    {/* Corner accent */}
                    <div
                        className="absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
                        style={{ background: "radial-gradient(circle, rgba(232,117,74,0.12) 0%, transparent 65%)" }}
                    />
                    <div
                        className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full pointer-events-none"
                        style={{ background: "radial-gradient(circle, rgba(78,204,163,0.05) 0%, transparent 65%)" }}
                    />

                    {/* Decorative rule */}
                    <div
                        className="absolute top-0 left-10 right-10 h-px"
                        style={{ background: "linear-gradient(90deg, transparent, rgba(232,117,74,0.30), transparent)" }}
                    />

                    <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div>
                            <p
                                className="mb-5"
                                style={{
                                    color: "#E8754A",
                                    fontFamily: "'JetBrains Mono', monospace",
                                    fontSize: "10px",
                                    fontWeight: 600,
                                    letterSpacing: "0.16em",
                                    textTransform: "uppercase",
                                }}
                            >
                                Get started · Free · No signup required
                            </p>
                            <h2
                                style={{
                                    fontFamily: "'Syne', system-ui, sans-serif",
                                    fontWeight: 800,
                                    fontSize: "clamp(2rem, 4vw, 3.25rem)",
                                    lineHeight: 1.0,
                                    letterSpacing: "-0.03em",
                                    color: "#F0F2F5",
                                    marginBottom: "1.25rem",
                                }}
                            >
                                Stop letting the
                                <br />
                                <span style={{ color: "#E8754A" }}>algorithm decide</span>
                                <br />
                                your future.
                            </h2>
                            <p style={{ color: "#7A8499", fontSize: "1rem", lineHeight: 1.75, maxWidth: "400px" }}>
                                90% of large companies use ATS to eliminate candidates before
                                a human ever sees the resume. Get your score in 2 seconds.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {/* Stat rows */}
                            {[
                                { label: "Resumes rejected before human review", val: "75%", neg: true },
                                { label: "Match rate needed to pass the filter", val: "70%+", neg: false, accent: "#7A8499" },
                                { label: "Average match rate after using our tool", val: "94%", neg: false, accent: "#E8754A" },
                            ].map((s) => (
                                <div
                                    key={s.label}
                                    className=" relative flex items-center justify-between p-4 rounded-xl bg-[rgba(255,255,255,0.025)] border-[rgba(255,255,255,0.04)]"
                                    
                                    onMouseEnter={(e) => {
                                        const target = e.currentTarget.querySelector(".gradient") as HTMLElement;
                                        gsap.to(target, {
                                            opacity: 1,
                                            width: "100%",
                                            duration: 0.6,
                                            ease: "power3.out",
                                            overwrite: "auto",
                                        });
                                    }}
                                    onMouseLeave={(e) => {
                                        const target = e.currentTarget.querySelector(".gradient");
                                        gsap.to(target, {
                                            width: "0%",
                                            opacity: 0,
                                            duration: 0.4,
                                            ease: "power2.inOut",
                                            overwrite: "auto",
                                        });
                                    }}
                                >
                                    <div
                                        className="gradient absolute left-0 top-0 w-0 h-full rounded-xl pointer-events-none z-0"
                                        style={{
                                            background: "linear-gradient(to right, rgba(232, 117, 74, 0.2) 0%, transparent 100%)",
                                        }}
                                    />
                                    <div className="relative z-10 flex items-center justify-between w-full">
                                        <span style={{ color: "#7A8499", fontSize: "0.875rem" }}>{s.label}</span>
                                        <span
                                            className="font-bold tabular-nums ml-4 flex-shrink-0"
                                            style={{
                                                fontFamily: "'Syne', system-ui, sans-serif",
                                                fontSize: "1.125rem",
                                                color: s.neg ? "#F87171" : (s.accent || "#E8754A"),
                                            }}
                                        >
                                            {s.val}
                                        </span>
                                    </div>
                                    
                                </div>
                            ))}

                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <Link href="/ats" className="flex-1   hover:-rotate-5 duration-300 transition-transform">
                                    <button
                                        className="btn btn-accent w-full"
                                        style={{ padding: "0.9375rem", fontSize: "0.9375rem" }}
                                    >
                                        <ScanSearch className="w-4 h-4" />
                                        Scan Resume Now
                                    </button>
                                </Link>
                                <Link href="/resumeBuilder  "   className=" hover:-rotate-5 duration-300 transition-transform">
                                    <button
                                        className="btn btn-ghost"
                                        style={{ padding: "0.9375rem 1.5rem", fontSize: "0.9375rem" }}
                                    >
                                        Build Resume
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EndSection;