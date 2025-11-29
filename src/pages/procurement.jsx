// pages/Procurement.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "../components/navbar.jsx";
import gsap from "gsap";

function useInView(options = { threshold: 0.25 }) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const io = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setInView(true);
        }, options);

        io.observe(el);
        return () => io.disconnect();
    }, [options]);

    return [ref, inView];
}

function getCharAt(tokens, globalIndex) {
    let i = globalIndex;
    for (const t of tokens) {
        const s = t.text ?? "";
        if (i < s.length) return s[i];
        i -= s.length;
    }
    return "";
}

/**
 * tokens: [{ text: "...", accent?: true, bold?: true }]
 * Types CHAR-by-CHAR with punctuation pauses.
 */
function TypedTokens({
                         tokens,
                         start,
                         msPerChar = 24,
                         holdMs = 500,
                         className = "",
                         cursor = true,
                     }) {
    const [count, setCount] = useState(0);

    const totalChars = useMemo(
        () => tokens.reduce((s, t) => s + (t.text?.length ?? 0), 0),
        [tokens]
    );

    useEffect(() => {
        if (!start) return;

        setCount(0);
        let alive = true;

        const run = async () => {
            let i = 0;
            while (alive && i < totalChars) {
                i += 1;
                setCount(i);

                const lastChar = getCharAt(tokens, i - 1);
                let delay = msPerChar;

                if (lastChar === "." || lastChar === "!" || lastChar === "?") delay = msPerChar * 12;
                else if (lastChar === "," || lastChar === "—") delay = msPerChar * 6;
                else if (lastChar === "\n") delay = msPerChar * 10;

                await new Promise((r) => setTimeout(r, delay));
            }
            if (alive) await new Promise((r) => setTimeout(r, holdMs));
        };

        run();
        return () => {
            alive = false;
        };
    }, [start, totalChars, msPerChar, holdMs, tokens]);

    let remaining = count;

    return (
        <div className={className}>
            {tokens.map((t, idx) => {
                const text = t.text ?? "";
                const take = Math.min(remaining, text.length);
                remaining -= take;

                const shown = text.slice(0, take);
                if (!shown) return null;

                return (
                    <span
                        key={idx}
                        className={[
                            t.bold ? "font-semibold" : "",
                            t.accent ? "text-[#AD1C42]" : "text-white",
                        ].join(" ")}
                    >
            {shown}
          </span>
                );
            })}

            {cursor && start && count < totalChars && (
                <span className="inline-block w-[10px] ml-1 animate-pulse text-white">|</span>
            )}
        </div>
    );
}

function Reveal({ children, delay = 0, className = "" }) {
    const [ref, inView] = useInView({ threshold: 0.2 });
    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            className={[
                "transition-all duration-700 ease-out",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                className,
            ].join(" ")}
        >
            {children}
        </div>
    );
}

export default function Procurement() {
    // One-time cursor follow
    useEffect(() => {
        const el = document.getElementById("cursor");
        if (!el) return;

        const xTo = gsap.quickTo(el, "x", { duration: 0.2, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.2, ease: "power3.out" });

        const move = (e) => {
            xTo(e.clientX - 10);
            yTo(e.clientY - 10);
        };

        window.addEventListener("mousemove", move, { passive: true });
        return () => window.removeEventListener("mousemove", move);
    }, []);

    // One handler for ALL text hover (event delegation)
    const hoverSelector = "h1,h2,h3,h4,p,span,a,li,label,button";
    const handleOver = (e) => {
        if (e.target.closest?.(hoverSelector)) {
            gsap.to("#cursor", { scale: 3, duration: 0.2 });
        }
    };
    const handleOut = (e) => {
        const fromText = e.target.closest?.(hoverSelector);
        const toText = e.relatedTarget?.closest?.(hoverSelector);
        if (fromText && !toText) {
            gsap.to("#cursor", { scale: 1, duration: 0.2 });
        }
    };

    const [heroRef, heroInView] = useInView({ threshold: 0.35 });
    const [midRef, midInView] = useInView({ threshold: 0.35 });

    const heroTitle = useMemo(
        () => [
            { text: "Procurement ", bold: true },
            { text: "with ", bold: true },
            { text: "MAVA", bold: true, accent: true },
        ],
        []
    );

    const heroSubtitle = useMemo(
        () => [
            { text: "You’re not just looking for a supplier — ", bold: true },
            { text: "you’re looking for ", bold: true },
            { text: "certainty.", bold: true, accent: true },
        ],
        []
    );

    const textBlock1 = useMemo(
        () => [
            { text: "In procurement, it’s not just about products.\n" },
            { text: "It’s about ", bold: true },
            { text: "guarantees", bold: true, accent: true },
            { text: ". ", bold: true },
            { text: "Reliability", bold: true, accent: true },
            { text: ". ", bold: true },
            { text: "Control", bold: true, accent: true },
            { text: ".\n\n" },
            { text: "We understand: a missed deadline means losses. " },
            { text: "The wrong vendor — a risk to your entire chain.\n\n" },
            { text: "That’s why we build procurement as a system: ", bold: true },
            { text: "smart", bold: true, accent: true },
            { text: ", ", bold: true },
            { text: "precise", bold: true, accent: true },
            { text: ", and ", bold: true },
            { text: "secure", bold: true, accent: true },
            { text: ".", bold: true },
        ],
        []
    );

    const textBlock2 = useMemo(
        () => [
            { text: "MAVA steps in where most logistics companies step back.\n", bold: true },
            { text: "We ", bold: true },
            { text: "search", bold: true, accent: true },
            { text: ", ", bold: true },
            { text: "verify", bold: true, accent: true },
            { text: ", ", bold: true },
            { text: "negotiate", bold: true, accent: true },
            { text: ", and ", bold: true },
            { text: "manage", bold: true, accent: true },
            { text: ".\n\n" },
            { text: "From the first request to the final unloading at your warehouse.\n" },
            { text: "No noise, no losses — ", bold: true },
            { text: "full responsibility", bold: true, accent: true },
            { text: ", ", bold: true },
            { text: "front to back", bold: true, accent: true },
            { text: ".", bold: true },
        ],
        []
    );

    return (
        <div
            className="min-h-screen bg-black text-white"
            onPointerOverCapture={handleOver}
            onPointerOutCapture={handleOut}
        >
            <Navbar />

            {/* Custom Cursor */}
            <div
                id="cursor"
                className="fixed top-0 left-0 w-[20px] h-[20px] bg-[#AD1C42] rounded-full z-[999] pointer-events-none mix-blend-difference"
            />

            {/* HERO */}
            <section ref={heroRef} className="relative overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/procurement2.jpg"
                        alt=""
                        className="h-full w-full object-cover grayscale opacity-25"
                        draggable={false}
                    />
                    <div className="absolute inset-0 bg-black/75" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />
                </div>

                <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-16 sm:pt-24 pb-14">
                    <Reveal className="text-center">
                        <TypedTokens
                            tokens={heroTitle}
                            start={heroInView}
                            msPerChar={70}
                            className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight"
                        />
                    </Reveal>

                    <div className="mt-8 sm:mt-10 text-center">
                        <Reveal delay={120}>
                            <TypedTokens
                                tokens={heroSubtitle}
                                start={heroInView}
                                msPerChar={42}
                                className="text-lg sm:text-2xl md:text-3xl font-semibold text-white/95"
                            />
                        </Reveal>
                    </div>

                    <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-start">
                        {/* Left column */}
                        <div className="lg:col-span-7 space-y-5">
                            <Reveal delay={200}>
                                <div className="group rounded-2xl border border-white/10 bg-black/40 p-6 sm:p-8
                                transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/5
                                hover:shadow-[0_0_50px_rgba(255,255,255,0.08)]">
                                    <TypedTokens
                                        tokens={textBlock1}
                                        start={heroInView}
                                        msPerChar={28}
                                        cursor={false}
                                        className="whitespace-pre-line text-base sm:text-lg leading-relaxed text-white/85"
                                    />
                                </div>
                            </Reveal>

                            <Reveal delay={280}>
                                <div className="group rounded-2xl border border-white/10 bg-black/40 p-6 sm:p-8
                                transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/5
                                hover:shadow-[0_0_50px_rgba(255,255,255,0.08)]">
                                    <TypedTokens
                                        tokens={textBlock2}
                                        start={heroInView}
                                        msPerChar={28}
                                        cursor={false}
                                        className="whitespace-pre-line text-base sm:text-lg leading-relaxed text-white/85"
                                    />
                                </div>
                            </Reveal>
                        </div>

                        {/* Right column */}
                        <div className="lg:col-span-5 space-y-5">
                            <Reveal delay={240}>
                                <div className="group rounded-2xl border border-white/10 bg-black/40 p-6 sm:p-8
                                transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/5
                                hover:shadow-[0_0_50px_rgba(255,255,255,0.08)]">
                                    <div className="text-xs uppercase tracking-[0.25em] text-white/60">
                                        PROCUREMENT FOCUS
                                    </div>
                                    <div className="mt-3 text-2xl font-semibold leading-snug">
                                        Control without the headache<span className="text-[#AD1C42]">.</span>
                                    </div>
                                    <p className="mt-4 text-white/75 leading-relaxed">
                                        Tight decisions, clear timelines, low risk — while your team stays focused on growth.
                                    </p>

                                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {[
                                            { t: "Verified suppliers", a: "Only trusted sources" },
                                            { t: "Negotiation", a: "Value over “cheap”" },
                                            { t: "QA & docs", a: "Clean compliance flow" },
                                            { t: "Delivery control", a: "Order → unloading" },
                                        ].map((c, i) => (
                                            <div
                                                key={i}
                                                className="rounded-xl border border-white/10 bg-black/30 p-4
                                   transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/5"
                                            >
                                                <div className="font-semibold">
                                                    <span className="text-[#AD1C42]">◆</span> {c.t}
                                                </div>
                                                <div className="mt-1 text-sm text-white/65">{c.a}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Reveal>

                            <Reveal delay={320}>
                                <div className="group overflow-hidden rounded-2xl border border-white/10 bg-black/40
                                transition-all duration-300 hover:-translate-y-1 hover:border-white/25
                                hover:shadow-[0_0_50px_rgba(255,255,255,0.08)]">
                                    <img
                                        src="/alarm-clock-laptop-with-copy-space.jpg"
                                        alt="Procurement"
                                        className="h-56 w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.05]"
                                        draggable={false}
                                    />
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHY IT WORKS */}
            <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
                <Reveal className="text-center">
                    <h2 className="text-2xl sm:text-3xl font-semibold">
                        Why it <span className="text-[#AD1C42]">works</span>
                    </h2>
                    <p className="mt-3 text-white/70">Practical reasons — not marketing noise.</p>
                </Reveal>

                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        "Access to vetted manufacturers in key global markets",
                        "Ground support — not just screen-based sourcing",
                        "We don’t chase “cheaper,” we choose smarter value",
                        "Our goal isn’t margin — it’s your steady, scalable flow",
                    ].map((item, idx) => (
                        <Reveal key={idx} delay={120 + idx * 90}>
                            <div className="group rounded-2xl border border-white/10 bg-black/40 p-6
                              transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/5
                              hover:shadow-[0_0_50px_rgba(255,255,255,0.08)]">
                                <div className="flex gap-3 items-start">
                                    <div className="mt-1 text-[#AD1C42]">◆</div>
                                    <div className="text-white/85 leading-relaxed">{item}</div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={520} className="mt-12 text-center">
                    <div className="group mx-auto max-w-4xl rounded-2xl border border-white/10 bg-black/40 p-8
                          transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/5
                          hover:shadow-[0_0_50px_rgba(255,255,255,0.08)]">
                        <div className="text-xl sm:text-2xl font-semibold leading-snug">
                            We don’t just procure. We build a system where you stay in control —
                            <span className="text-[#AD1C42]"> without the headache.</span>
                        </div>
                    </div>
                </Reveal>
            </section>

            {/* SCROLL-TYPED FINISH */}
            <section ref={midRef} className="mx-auto max-w-6xl px-4 sm:px-6 pb-20">
                <Reveal className="group rounded-2xl border border-white/10 bg-black/40 p-7 sm:p-10 text-center
                          transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/5
                          hover:shadow-[0_0_50px_rgba(255,255,255,0.08)]">
                    <TypedTokens
                        start={midInView}
                        msPerChar={30}
                        holdMs={800}
                        className="whitespace-pre-line text-lg sm:text-2xl leading-relaxed text-white/90"
                        tokens={[
                            { text: "Procurement should feel ", bold: true },
                            { text: "simple", bold: true, accent: true },
                            { text: ".\n" },
                            { text: "With MAVA, it becomes ", bold: true },
                            { text: "predictable", bold: true, accent: true },
                            { text: ", ", bold: true },
                            { text: "traceable", bold: true, accent: true },
                            { text: ", and ", bold: true },
                            { text: "safe", bold: true, accent: true },
                            { text: ".", bold: true },
                        ]}
                    />
                </Reveal>
            </section>
        </div>
    );
}
