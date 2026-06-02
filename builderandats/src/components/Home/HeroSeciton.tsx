"use client"
import Image from "next/image"
import Link from "next/link"
import { ShieldCheck, BarChart3, Clock, ChevronRight, FileText, ScanSearch } from "lucide-react"

import ATSCard from "./ATSCard"

const HeroSection = () => {
    return (
        <section className="relative min-h-[92vh] flex  overflow-hidden">

            {/* Right half person image — bleeds to edge */}
            <div
                className="h-person absolute right-0 top-0 bottom-0 w-[52%] lg:w-[48%] hidden lg:block"
                style={{ zIndex: 1 }}
            >
                <Image
                    src="/hero-person.png"
                    alt="Professional holding resume"
                    sizes="100vw"
                    fill
                    priority
                    style={{
                        objectFit: "cover",
                        objectPosition: "center top",
                        maskImage: "linear-gradient(to right, transparent 0%, black 20%, black 85%, transparent 100%), linear-gradient(to bottom, black 60%, transparent 100%)",
                        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 20%, black 85%, transparent 100%), linear-gradient(to bottom, black 60%, transparent 100%)",
                        maskComposite: "intersect",
                        WebkitMaskComposite: "source-in",
                        opacity: 0.88,
                    }}
                />
                {/* Gradient overlay on image for blending */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(to right, var(--bg) 0%, transparent 18%, transparent 80%, var(--bg) 100%)",
                    }}
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(to top, var(--bg) 0%, transparent 25%)",
                    }}
                />
            </div>

            {/* Left content */}

            <div className=" container-hero flex justify-center">
                <div className="max-w-[580px] mt-20">

                    {/* Headline */}
                    <h1
                        className="h-headline mb-6"
                        style={{
                            fontFamily: "'Syne', system-ui, sans-serif",
                            fontWeight: 800,
                            fontSize: "clamp(3rem, 5.5vw, 4.75rem)",
                            lineHeight: 1.0,
                            letterSpacing: "-0.03em",
                            color: "#F0F2F5",
                        }}
                    >
                        Your resume
                        <br />
                        deserves to be
                        <br />
                        <span style={{ color: "#E8754A" }}>seen.</span>
                    </h1>

                    {/* Sub */}
                    <p
                        className="h-sub mb-10"
                        style={{
                            color: "#7A8499",
                            fontSize: "1.0625rem",
                            lineHeight: 1.75,
                            maxWidth: "440px",
                        }}
                    >
                        75% of resumes never reach a human. Our AI reverse-engineers
                        ATS logic so yours gets through — every single time.
                    </p>

                    {/* CTAs */}
                    <div className="h-ctas flex flex-wrap gap-3 mb-12">
                        <Link href="/ats" >
                            <button
                                className="btn btn-accent group hover:-rotate-5 duration-300 transition-transform"
                                style={{ padding: "0.875rem 1.875rem", fontSize: "0.9375rem" }}
                            >
                                <ScanSearch className="w-4 h-4" />
                                Check ATS Score — Free
                                <ChevronRight
                                    className="w-4 h-4 opacity-60 group-hover:opacity-100"
                                    style={{ transition: "transform 200ms cubic-bezier(0.23,1,0.32,1)", marginLeft: "-2px" }}
                                />
                            </button>
                        </Link>
                        <Link href="/resumeBuilder" >
                            <button
                                className="btn btn-ghost group hover:-rotate-5 duration-300 transition-transform"
                                style={{ padding: "0.875rem 1.875rem", fontSize: "0.9375rem" }}
                            >
                                <FileText className="w-4 h-4" />
                                Build Free Resume
                            </button>
                        </Link>
                    </div>

                    {/* Trust meta row */}
                    <div
                        className="h-meta flex items-center gap-6"
                        style={{ paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}
                    >
                        {[
                            { icon: BarChart3, val: "94%", label: "avg ATS match" },
                            { icon: Clock, val: "< 2s", label: "scan time" },
                            { icon: ShieldCheck, val: "Free", label: "no card needed" },
                        ].map(({ icon: Icon, val, label }) => (
                            <div key={label} className="flex items-center gap-2.5">
                                <div
                                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                                >
                                    <Icon className="w-3.5 h-3.5" style={{ color: "#7A8499" }} />
                                </div>
                                <div>
                                    <p
                                        className="font-bold leading-none mb-0.5"
                                        style={{ fontFamily: "'Syne', system-ui, sans-serif", color: "#F0F2F5", fontSize: "0.9375rem" }}
                                    >
                                        {val}
                                    </p>
                                    <p style={{ color: "#48556A", fontSize: "11px", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.04em" }}>
                                        {label}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Floating ATS card — positioned over person image */}
            <div
                className="h-card hidden xl:block absolute z-20"
                style={{ right: "5%", bottom: "12%", width: "320px" }}
            >
                <ATSCard />
            </div>
        </section>
    )
}

export default HeroSection