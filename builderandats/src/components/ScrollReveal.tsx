"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type AnimationVariant = "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scale";

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

const variantConfig: Record<AnimationVariant, gsap.TweenVars> = {
  fadeUp: { y: 50, opacity: 0 },
  fadeIn: { opacity: 0 },
  slideLeft: { x: -60, opacity: 0 },
  slideRight: { x: 60, opacity: 0 },
  scale: { scale: 0.9, opacity: 0 },
};

export default function ScrollReveal({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 0.8,
  stagger = 0,
  className = "",
  as: Component = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fromVars = variantConfig[variant];

    gsap.set(el, fromVars);

    const anim = gsap.to(el, {
      ...Object.fromEntries(Object.keys(fromVars).map((k) => [k, k === "opacity" ? 1 : 0])),
      scale: 1,
      duration,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [variant, delay, duration, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
