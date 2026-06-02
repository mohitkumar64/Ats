"use client";

import { useRef, useEffect } from "react";
function ScoreCounter({ target = 94, delay = 900 }: { target?: number; delay?: number }) {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        let raf: number;
        const t = setTimeout(() => {
            const start = Date.now();
            const dur = 1800;
            const tick = () => {
                const p = Math.min((Date.now() - start) / dur, 1);
                const eased = 1 - Math.pow(1 - p, 3);
                if (ref.current) ref.current.textContent = String(Math.round(target * eased));
                if (p < 1) raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
        }, delay);
        return () => { clearTimeout(t); cancelAnimationFrame(raf); };
    }, [target, delay]);

    return <span ref={ref}>0</span>;
}

export default ScoreCounter;