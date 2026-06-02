"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/* ─────────────────────────────────────────────────────────
   Preloader Intro
   – Full-screen cover on first visit (sessionStorage guard)
   – Logo SVG paths draw in via stroke-dashoffset
   – Scale pulse (mirrors the manim animation)
   – Counter runs from 0 → 100
   – Whole overlay fades + slides up then unmounts
───────────────────────────────────────────────────────── */

export default function Intro({ onComplete }: { onComplete: () => void }) {
  const overlayRef  = useRef<HTMLDivElement>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);
  const counterRef  = useRef<HTMLSpanElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);
  const tagRef      = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const overlay  = overlayRef.current;
    const logoWrap = logoWrapRef.current;
    const counter  = counterRef.current;
    if (!overlay || !logoWrap || !counter) return;

    // Grab all SVG stroke paths/lines/rects for the draw animation
    const strokes = overlay.querySelectorAll<SVGElement>("[data-draw]");

    // ── Set initial state for stroke-dashoffset draw ──
    strokes.forEach((el) => {
      const len = (el as SVGGeometryElement).getTotalLength?.() ?? 80;
      el.style.strokeDasharray  = String(len);
      el.style.strokeDashoffset = String(len);
    });

    // ── Count up: 0 → 100 ──
    let rafId: number;
    const startTime = performance.now();
    const countDur  = 1800; // ms — matches draw animation

    const tick = (now: number) => {
      const p = Math.min((now - startTime) / countDur, 1);
      const eased = 1 - Math.pow(1 - p, 2);
      counter.textContent = String(Math.round(eased * 100));
      if (p < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // ── Master GSAP timeline ──
    const tl = gsap.timeline({
      onComplete: () => {
        // Exit: slide up + fade overlay
        gsap.to(overlay, {
          y: "-100%",
          opacity: 0,
          duration: 0.75,
          ease: "power3.inOut",
          onComplete: () => {
            onComplete();
          },
        });
      },
    });

    // 1. Fade in the overlay itself
    tl.from(overlay, { opacity: 0, duration: 0.25, ease: "none" });

    // 2. Draw in SVG strokes
    tl.to(strokes, {
      strokeDashoffset: 0,
      duration: 1.4,
      ease: "power2.inOut",
      stagger: 0.12,
    }, "+=0.15");

    // 3. Teal accent dot pops in
    tl.from("[data-dot]", { scale: 0, opacity: 0, duration: 0.4, ease: "back.out(2)" }, "-=0.5");

    // 4. Scale pulse (mirrors manim: scale 1→1.05→1)
    tl.to(logoWrap, { scale: 1.06, duration: 0.5, ease: "power2.out" }, "+=0.1")
      .to(logoWrap, { scale: 1,    duration: 0.5, ease: "power2.inOut" });

    // 5. Tag line fades in
    tl.from(lineRef.current,  { scaleX: 0, transformOrigin: "left center", duration: 0.5, ease: "power2.out" }, "-=0.3")
      .from(tagRef.current,   { y: 10, opacity: 0, duration: 0.4, ease: "power2.out" }, "-=0.2");

    // 6. Hold, then fire onComplete (exit happens in onComplete cb above)
    tl.to({}, { duration: 0.6 }); // hold before exit

    return () => {
      cancelAnimationFrame(rafId);
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: "#080A0F" }}
      aria-hidden="true"
    >
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Ambient glow — coral, very diffuse */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(232,117,74,0.07) 0%, transparent 70%)",
        }}
      />

      {/* ── Logo mark — scaled up for intro ── */}
      <div
        ref={logoWrapRef}
        className="relative flex flex-col items-center gap-8"
        style={{ transformOrigin: "center center" }}
      >
        {/* SVG — drawn via stroke-dashoffset */}
        <svg
          width="120"
          height="120"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow: "visible" }}
        >
          {/* Outer rounded rect */}
          <rect
            data-draw
            x="1" y="1" width="30" height="30" rx="6"
            stroke="#E8754A"
            strokeWidth="1.5"
            fill="none"
          />
          {/* B top bump */}
          <path
            data-draw
            d="M9 8h7.5a4 4 0 0 1 0 8H9V8z"
            fill="none"
            stroke="#E8754A"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* B bottom bump */}
          <path
            data-draw
            d="M9 16h8a4 4 0 0 1 0 8H9V16z"
            fill="none"
            stroke="#E8754A"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* B spine */}
          <line
            data-draw
            x1="9" y1="8" x2="9" y2="24"
            stroke="#E8754A"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Teal accent dot — separate, pops in */}
          <circle
            data-dot
            cx="24" cy="8" r="2"
            fill="#4ECCA3"
            style={{ transformOrigin: "24px 8px" }}
          />
        </svg>

        {/* Wordmark */}
        <div className="flex flex-col items-center gap-3">
          <p
            style={{
              fontFamily: "'Syne', system-ui, sans-serif",
              fontWeight: 800,
              fontSize: "1.5rem",
              letterSpacing: "-0.02em",
              color: "#F0F2F5",
              lineHeight: 1,
            }}
          >
            Builder
            <span style={{ color: "#E8754A", margin: "0 0.15em" }}>&</span>
            ATS
          </p>

          {/* Divider line */}
          <div
            ref={lineRef}
            style={{
              width: "160px",
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(232,117,74,0.40), transparent)",
              transformOrigin: "left center",
            }}
          />

          {/* Tagline */}
          <p
            ref={tagRef}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#3D4A5C",
            }}
          >
            ATS Intelligence Platform
          </p>
        </div>
      </div>

      {/* ── Counter + progress bar — bottom of screen ── */}
      <div
        className="absolute bottom-12 left-1/2 flex flex-col items-center gap-3"
        style={{ transform: "translateX(-50%)", width: "200px" }}
      >
        {/* Progress bar */}
        <div
          className="relative w-full h-px overflow-hidden"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, transparent, #E8754A)",
              transformOrigin: "left center",
              animation: "intro-bar 2.1s cubic-bezier(0.23,1,0.32,1) forwards",
            }}
          />
        </div>

        {/* Percentage counter */}
        <div
          className="flex items-end gap-1"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          <span
            ref={counterRef}
            style={{ fontSize: "11px", color: "#3D4A5C", fontWeight: 600, letterSpacing: "0.08em" }}
          >
            0
          </span>
          <span style={{ fontSize: "9px", color: "#2A3444", marginBottom: "1px" }}>%</span>
        </div>
      </div>
    </div>
  );
}
