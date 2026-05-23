"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
  Rocket,
  Search,
  CheckCircle2,
  FileText,
  Upload,
  Brain,
  Download,
  ArrowRight,
  Target,
  FileSearch,
  LayoutTemplate
} from "lucide-react";

import animationData from "../../public/lottie/profile-search.json";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fast, snappy hero timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-badge", { y: 20, opacity: 0, duration: 0.5 })
        .from(".hero-title", { y: 30, opacity: 0, duration: 0.6 }, "-=0.3")
        .from(".hero-desc", { y: 20, opacity: 0, duration: 0.5 }, "-=0.4")
        .from(".hero-buttons > *", { y: 20, opacity: 0, duration: 0.4, stagger: 0.1 }, "-=0.3")
        .from(".hero-visual", { scale: 0.95, opacity: 0, duration: 0.7 }, "-=0.6");

      // Scroll reveals for sections
      gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });

      // Scanner animation setup
      gsap.to(".scanner-line", {
        top: "100%",
        duration: 2.5,
        ease: "linear",
        repeat: -1,
        yoyo: true,
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white selection:bg-indigo-500/30">


      {/* ── AMBIENT GLOWS ── */}
      <div className="fixed top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none z-0" />

      <main ref={heroRef} className="relative z-10">

        {/* ══════════════════════════════════════════════
            HERO SECTION
        ══════════════════════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24 md:pt-40 md:pb-32">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-40 items-center">
            {/* Left Content */}
            <div className="max-w-2xl">
              {/* <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-300 mb-8">
                <Target className="w-4 h-4" />
                No nonsense. Just results.
              </div> */}

              <h1 className="hero-title text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6">
                Stop Guessing.<br />
                Start Landing <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Interviews.</span>
              </h1>

              <p className="hero-desc text-lg md:text-xl text-gray-400 leading-relaxed mb-10">
                Two powerful tools to beat Applicant Tracking Systems: an AI-driven resume checker and an ATS-optimized live builder. Designed strictly to get you hired.
              </p>

              <div className="hero-buttons flex flex-wrap gap-4">
                <Link href="/ats">
                  <button className="px-8 py-4 bg-white text-[#020617] font-semibold rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-[1.02] active:scale-[0.98]">
                    <Search className="w-5 h-5" />
                    Check Resume Score
                  </button>
                </Link>
                <Link href="/resumeBuilder">
                  <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]">
                    <Rocket className="w-5 h-5" />
                    Build New Resume
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Visual (Lottie Animation) */}
            <div className="hero-visual relative flex flex-col items-center justify-center mt-12 lg:mt-0">
              <div className="relative flex justify-center w-full max-w-[400px] md:max-w-[480px]">
                <div className="absolute w-[320px] md:w-[380px] h-[320px] md:h-[380px] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/10 backdrop-blur-xl rounded-3xl rotate-3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute w-[320px] md:w-[380px] h-[320px] md:h-[380px] bg-gradient-to-tr from-purple-500/5 to-indigo-500/5 border border-white/5 backdrop-blur-xl rounded-3xl -rotate-3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                <div className="relative z-10 w-full animate-[float_6s_ease-in-out_infinite]">
                  <Lottie animationData={animationData} loop={true} />
                </div>
              </div>

              {/* Build & Scan Tag */}
              <div className="relative z-20 mt-4 inline-flex items-center gap-2.5 px-6 py-2.5 rounded-2xl bg-[#0f172a]/80 backdrop-blur-md border border-white/10 shadow-[0_0_30px_rgba(99,102,241,0.15)] animate-[float_6s_ease-in-out_infinite] delay-100">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)] animate-pulse" />
                  <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)] animate-pulse delay-75" />
                </div>
                <span className="text-sm font-bold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-purple-200">
                  Build & Scan
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            CORE FEATURES (SPLIT VIEW)
        ══════════════════════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 border-t border-white/5">
          <div className="text-center mb-20 reveal-up">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">One Platform. Two Core Features.</h2>
            <p className="text-gray-400 text-lg">Everything you need to bypass the bots and impress the recruiter.</p>
          </div>

          <div className="space-y-32">
            {/* Feature 1: ATS Checker */}
            <div className="grid md:grid-cols-2 gap-12 items-center reveal-up">
              <div className="order-2 md:order-1 bg-gradient-to-br from-[#0f172a] to-[#020617] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full group-hover:bg-indigo-500/20 transition-all duration-700" />
                <FileSearch className="w-12 h-12 text-indigo-400 mb-6" />
                <h3 className="text-2xl font-bold mb-4">ATS Resume Checker</h3>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  Don't send your resume into a black hole. Paste the job description, upload your PDF, and our AI instantly reverse-engineers the employer's ATS logic.
                </p>
                <ul className="space-y-4">
                  {[
                    "Instant Keyword Gap Analysis",
                    "ATS Formatting Compatibility Check",
                    "Actionable Improvement Suggestions"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-4xl font-bold mb-4">Analyze against any Job Description.</h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  The ATS acts as a gatekeeper. By understanding the exact keywords and skills the software is scanning for, you can tailor your resume to score 90%+ every single time.
                </p>
                <Link href="/ats" className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-2 group w-fit">
                  Try the ATS Checker
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Feature 2: Resume Builder */}
            <div className="grid md:grid-cols-2 gap-12 items-center reveal-up">
              <div>
                <h2 className="text-4xl font-bold mb-4">Build an ATS-optimized PDF instantly.</h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  If your current resume fails the ATS check due to bad formatting, columns, or graphics, our builder generates clean, perfectly structured PDFs that ATS systems love.
                </p>
                <Link href="/resumeBuilder" className="text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-2 group w-fit">
                  Start Building Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="bg-gradient-to-br from-[#0f172a] to-[#020617] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full group-hover:bg-purple-500/20 transition-all duration-700" />
                <LayoutTemplate className="w-12 h-12 text-purple-400 mb-6" />
                <h3 className="text-2xl font-bold mb-4">Live Resume Builder</h3>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  Use our dynamic dashboard to save your professional profile once, and instantly generate flawlessly formatted resumes on the fly.
                </p>
                <ul className="space-y-4">
                  {[
                    "Real-time Live Preview",
                    "Dynamic Profile Cloud Dashboard",
                    "One-click ATS-friendly PDF Export"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            HOW IT WORKS
        ══════════════════════════════════════════════ */}
        <section className="bg-white/5 border-y border-white/5 py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-16 reveal-up">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-gray-400">Three straightforward steps to the top of the recruiter's pile.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Upload,
                  title: "1. Prepare",
                  desc: "Upload your existing resume PDF or build a fresh one using our dynamic layout generator.",
                },
                {
                  icon: Brain,
                  title: "2. Analyze",
                  desc: "Paste the targeted job description. Our AI cross-references your skills and identifies missing keywords.",
                },
                {
                  icon: Download,
                  title: "3. Export",
                  desc: "Implement the suggested changes and download your newly optimized, highly-ranked PDF.",
                },
              ].map((step, i) => (
                <div key={i} className="bg-[#0f172a]/50 border border-white/10 rounded-2xl p-8 text-center reveal-up hover:border-white/20 transition-colors">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
                    <step.icon className="w-8 h-8 text-white/80" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            CTA & CONVERSION SECTION (Generated by Stitch)
        ══════════════════════════════════════════════ */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 py-32 reveal-up border-t border-white/5">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Left: Comparison Engine */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Comparison Engine</h3>
                <span className="text-[10px] font-mono text-gray-600">v2.4.0_STABLE</span>
              </div>

              {/* Bad Version */}
              <div className="bg-[#0f172a]/40 border border-white/5 rounded-xl overflow-hidden">
                <div className="px-4 py-2.5 bg-red-500/10 flex items-center gap-2 border-b border-red-500/10">
                  <span className="w-2 h-2 rounded-full bg-red-500/50"></span>
                  <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider">Traditional Resume</span>
                </div>
                <div className="p-5 font-mono text-xs space-y-2 text-gray-500">
                  <div className="flex gap-4"><span>1</span><span className="text-red-400/50">/* Graphic-heavy layout */</span></div>
                  <div className="flex gap-4"><span>2</span><span>&lt;section id="Experience"&gt;</span></div>
                  <div className="flex gap-4"><span>3</span><span>&lt;img src="profile_photo.jpg" /&gt;</span></div>
                  <div className="flex gap-4"><span>4</span><span>&lt;p&gt;Worked at various places...&lt;/p&gt;</span></div>
                </div>
              </div>

              {/* Good Version */}
              <div className="bg-[#0f172a]/60 border border-white/10 rounded-xl overflow-hidden shadow-2xl border-l-2 border-l-indigo-500 relative">
                <div className="absolute inset-0 bg-indigo-500/5 pointer-events-none"></div>
                <div className="px-4 py-2.5 bg-indigo-500/10 flex items-center gap-2 border-b border-indigo-500/20">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)] animate-pulse"></span>
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">ATS-Approved Schema</span>
                </div>
                <div className="p-5 font-mono text-xs space-y-2 text-indigo-300">
                  <div className="flex gap-4 text-gray-600"><span>1</span><span></span></div>
                  <div className="flex gap-4"><span>2</span><span>&nbsp;&nbsp;"schema": "ATS_PARSABLE_V1",</span></div>
                  <div className="flex gap-4"><span>3</span><span>&nbsp;&nbsp;"header": "Plain_Text_Standard",</span></div>
                  <div className="flex gap-4"><span>4</span><span>&nbsp;&nbsp;"keywords": ["React", "Python", "Kubernetes"],</span></div>
                  <div className="flex gap-4 text-gray-600"><span>5</span><span></span></div>
                </div>
              </div>
            </div>

            {/* Right: Capture & Action */}
            <div className="space-y-8">
              <div className="space-y-3">
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Get the Checklist.</h2>
                <p className="text-gray-400 text-lg leading-relaxed">The 12-point blueprint for achieving 90%+ ATS match rates.</p>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="ENTER YOUR EMAIL"
                  className="w-full bg-[#020617] border border-white/10 text-white px-5 py-4 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-mono text-sm placeholder:text-gray-600"
                />
                <button className="w-full bg-indigo-500/10 text-indigo-300 font-bold py-4 rounded-xl uppercase tracking-widest hover:bg-indigo-500/20 cursor-pointer transition-colors border border-indigo-500/20">
                  Request Blueprint
                </button>
              </form>

              <div className="pt-6 border-t border-white/5 space-y-6">
                <Link href="/resumeBuilder">
                  <button className="w-full bg-white text-[#020617] font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-100 cursor-pointer transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                    <Rocket className="w-5 h-5" />
                    <span className="uppercase tracking-tight">Build Free Resume Now</span>
                  </button>
                </Link>


              </div>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}