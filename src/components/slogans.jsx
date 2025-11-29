import React, { useEffect, useMemo, useState } from "react";
import gsap from "gsap";

function useTypewriter(lines, {
    typeMs = 45,
    deleteMs = 22,
    holdMs = 1100,
} = {}) {
    const safeLines = useMemo(() => lines.filter(Boolean), [lines]);
    const [i, setI] = useState(0);
    const [txt, setTxt] = useState("");
    const [mode, setMode] = useState("type"); // type | hold | del

    useEffect(() => {
        if (!safeLines.length) return;

        const full = safeLines[i % safeLines.length];

        let t;
        if (mode === "type") {
            if (txt.length < full.length) {
                t = setTimeout(() => setTxt(full.slice(0, txt.length + 1)), typeMs);
            } else {
                t = setTimeout(() => setMode("hold"), holdMs);
            }
        } else if (mode === "hold") {
            t = setTimeout(() => setMode("del"), holdMs);
        } else {
            if (txt.length > 0) {
                t = setTimeout(() => setTxt(full.slice(0, txt.length - 1)), deleteMs);
            } else {
                setMode("type");
                setI((v) => (v + 1) % safeLines.length);
            }
        }

        return () => clearTimeout(t);
    }, [safeLines, i, txt, mode, typeMs, deleteMs, holdMs]);

    return txt;
}

export default function CenterTypingSlogan() {
    const slogans = [
        "Moving freight. Building trust.",
        "Fast routes. Clear tracking.",
        "On time, every time.",
        "From warehouse to doorstep.",
        "Delivering confidence worldwide.",
        "Smarter logistics. Stronger business.",
        "Your cargo, our responsibility.",
        "Reliable shipping. Real-time visibility.",
        "We connect supply chains.",
        "Speed, safety, and precision.",
    ];

    const text = useTypewriter(slogans, { typeMs: 40, deleteMs: 18, holdMs: 900 });

    return (
        <div className="absolute inset-0 z-1 flex items-start justify-center mt-30 pointer-events-none">
            <h1
                className="pointer-events-auto text-white text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-center"
                onMouseEnter={() => gsap.to("#cursor", { scale: 3, duration: 0.2 })}
                onMouseLeave={() => gsap.to("#cursor", { scale: 1, duration: 0.2 })}
            >
                {text}
                <span className="inline-block w-[10px] ml-1 animate-pulse">|</span>
            </h1>
        </div>

    );
}
