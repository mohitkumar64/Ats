"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/components/Footer";
import Ticker from "@/components/Home/Ticker";
import HeroSection from "@/components/Home/HeroSeciton";

import FeatureGrid from "@/components/Home/FeatureGrid";
import HowItWorks from "@/components/Home/HowItWorks";
import EndSection from "@/components/Home/EndSection";
import Intro from "@/components/Intro";


if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}





export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setIntroComplete(true);
  };
  useEffect(() => {
    if (!introComplete) return; // wait for intro to finish
    const ctx = gsap.context(() => {
      // Hero — marketing page exception: 600–900ms expressive timing
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".h-eyebrow", { y: 14, opacity: 0, duration: 0.5 })
        .from(".h-headline", { y: 32, opacity: 0, duration: 0.75 }, "-=0.30")
        .from(".h-sub", { y: 20, opacity: 0, duration: 0.55 }, "-=0.45")
        .from(".h-ctas > *", { y: 16, opacity: 0, duration: 0.45, stagger: 0.09 }, "-=0.40")
        .from(".h-meta", { y: 12, opacity: 0, duration: 0.40 }, "-=0.30")
        .from(".h-person", { x: 40, opacity: 0, duration: 0.80, ease: "power2.out" }, "-=0.9")
        .from(".h-card", { y: 24, opacity: 0, scale: 0.97, duration: 0.65 }, "-=0.55");

      // Scroll reveals — 50ms stagger per row (Emil stagger rule)
      gsap.utils.toArray<HTMLElement>(".rv").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 28, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.55,
            ease: "power2.out",
            delay: (i % 4) * 0.06,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });

    }, pageRef);

    return () => ctx.revert();
  }, [introComplete]);

  return (
    <>
      {showIntro && <Intro onComplete={handleIntroComplete} />}
      <div ref={pageRef} className="relative min-h-screen overflow-x-hidden" style={{ background: "var(--bg)" }}>

        {/* ── Ambient background ── */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            backgroundImage: "url('/hero-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.06,
            zIndex: 0,
          }} />
        {/* Warm right-side glow */}

        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 55% 60% at 100% 40%, rgba(232,117,74,0.055) 0%, transparent 60%)",
            zIndex: 0,
          }}
        />
        {/* Cool left-side glow */}

        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 45% 50% at 0% 70%, rgba(78,204,163,0.025) 0%, transparent 55%)",
            zIndex: 0,
          }}
        />
        {/* Fine grid */}

        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
            zIndex: 0,
          }}
        />

        <main className="relative z-10 flex flex-col gap-10 mb-10">

          {/* HERO — Full bleed, serious, editorial*/}
          <HeroSection />


          <Ticker />
          <FeatureGrid />
          <HowItWorks />
          <EndSection />
        </main>


      </div>
    </>
  );
}