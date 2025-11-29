// pages/Logistics.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "../components/navbar.jsx";
import gsap from "gsap";

/* ---------- helpers ---------- */
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

/* ---------- page ---------- */
export default function Logistics() {
    // cursor follow (once)
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

    // hover scale for all text (event delegation)
    const hoverSelector = "h1,h2,h3,h4,p,span,a,li,label,button";
    const handleOver = (e) => {
        if (e.target.closest?.(hoverSelector)) gsap.to("#cursor", { scale: 3, duration: 0.2 });
    };
    const handleOut = (e) => {
        const fromText = e.target.closest?.(hoverSelector);
        const toText = e.relatedTarget?.closest?.(hoverSelector);
        if (fromText && !toText) gsap.to("#cursor", { scale: 1, duration: 0.2 });
    };

    const stats = useMemo(
        () => [
            { k: "End-to-end", v: "planning to delivery" },
            { k: "Tracking", v: "visibility & updates" },
            { k: "Safety", v: "cargo-first mindset" },
            { k: "Speed", v: "optimized routes" },
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

            {/* HERO / GENERAL ABOUT LOGISTICS */}
            <section className="relative overflow-hidden">
                {/* Background image */}
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
                        <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
                            Logistics with <span className="text-[#AD1C42]">MAVA</span>
                        </h1>
                        <p className="mt-5 text-base sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                            Logistics isn’t “delivery”. It’s coordination: routes, documents, timing, safety, storage, and control.
                            MAVA handles the full chain so your business stays predictable.
                        </p>
                    </Reveal>

                    <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                        {/* Main text card */}
                        <div className="lg:col-span-7 space-y-5">
                            <Reveal delay={120}>
                                <div
                                    className="group rounded-2xl border border-white/10 bg-black/40 p-6 sm:p-8
                             transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/5
                             hover:shadow-[0_0_50px_rgba(255,255,255,0.08)]"
                                >
                                    <h2 className="text-xl sm:text-2xl font-semibold">
                                        Clear flow. <span className="text-[#AD1C42]">Real control.</span>
                                    </h2>

                                    <p className="mt-4 text-white/80 leading-relaxed text-base sm:text-lg">
                                        We plan routes, align timelines, prepare documents, monitor cargo, and respond fast when something
                                        changes. You get a system that protects your cost, time, and reputation — not just a “carrier”.
                                    </p>

                                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {stats.map((s, i) => (
                                            <div
                                                key={i}
                                                className="rounded-xl border border-white/10 bg-black/30 p-4
                                   transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/5"
                                            >
                                                <div className="font-semibold">
                                                    <span className="text-[#AD1C42]">◆</span> {s.k}
                                                </div>
                                                <div className="mt-1 text-sm text-white/65">{s.v}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6 rounded-xl border border-white/10 bg-black/30 p-4">
                                        <p className="text-white/80 leading-relaxed">
                                            We don’t promise magic. We build reliability:{" "}
                                            <span className="text-[#AD1C42] font-semibold">planning</span>,{" "}
                                            <span className="text-[#AD1C42] font-semibold">visibility</span>,{" "}
                                            <span className="text-[#AD1C42] font-semibold">discipline</span>.
                                        </p>
                                    </div>
                                </div>
                            </Reveal>

                            <Reveal delay={220}>
                                <div className="rounded-2xl border border-white/10 bg-black/40 p-6 sm:p-8
                                transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/5">
                                    <h3 className="text-lg sm:text-xl font-semibold">
                                        What you get with <span className="text-[#AD1C42]">MAVA</span>
                                    </h3>

                                    <ul className="mt-4 space-y-3 text-white/80">
                                        {[
                                            "Route + timeline planning with realistic buffers",
                                            "Documentation and compliance support",
                                            "Operational communication and updates",
                                            "Cargo safety mindset — handling, packaging, risk prevention",
                                            "One accountable team, not a mess of contacts",
                                        ].map((t, i) => (
                                            <li key={i} className="flex gap-3">
                                                <span className="text-[#AD1C42]">•</span>
                                                <span className="leading-relaxed">{t}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Reveal>
                        </div>

                        {/* Photos column */}
                        <div className="lg:col-span-5 space-y-5">
                            <Reveal delay={160}>
                                <div className="group overflow-hidden rounded-2xl border border-white/10 bg-black/40
                                transition-all duration-300 hover:-translate-y-1 hover:border-white/25
                                hover:shadow-[0_0_50px_rgba(255,255,255,0.08)]">
                                    <img
                                        src="/photorealistic-scene-with-warehouse-logistics-operations.jpg"
                                        alt="Warehouse"
                                        className="h-56 w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.06]"
                                        draggable={false}
                                    />
                                    <div className="p-5">
                                        <div className="text-sm uppercase tracking-[0.2em] text-white/60">Warehousing</div>
                                        <div className="mt-2 font-semibold">Storage, consolidation, dispatch</div>
                                        <p className="mt-2 text-sm text-white/70 leading-relaxed">
                                            Clean handoffs between inbound, storage, and outbound — no chaos.
                                        </p>
                                    </div>
                                </div>
                            </Reveal>

                            <Reveal delay={260}>
                                <div className="group overflow-hidden rounded-2xl border border-white/10 bg-black/40
                                transition-all duration-300 hover:-translate-y-1 hover:border-white/25
                                hover:shadow-[0_0_50px_rgba(255,255,255,0.08)]">
                                    <img
                                        src="/trucking-logistics-fleet-management-technology.jpg"
                                        alt="Tracking"
                                        className="h-56 w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.06]"
                                        draggable={false}
                                    />
                                    <div className="p-5">
                                        <div className="text-sm uppercase tracking-[0.2em] text-white/60">Visibility</div>
                                        <div className="mt-2 font-semibold">
                                            Updates that matter <span className="text-[#AD1C42]">—</span> not spam
                                        </div>
                                        <p className="mt-2 text-sm text-white/70 leading-relaxed">
                                            Clear status, exceptions, and next steps — so you can plan.
                                        </p>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>

                    {/* CTA strip */}
                    <Reveal delay={340} className="mt-10">
                        <div className="rounded-2xl border border-white/10 bg-black/40 px-6 py-6 sm:px-8
                            transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/5">
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                <div>
                                    <div className="text-xl sm:text-2xl font-semibold">
                                        Ready to move cargo with <span className="text-[#AD1C42]">confidence</span>?
                                    </div>
                                    <div className="mt-2 text-white/70">
                                        Next section we’ll split logistics into: Air, Road, Sea, Railway — and more.
                                    </div>
                                </div>

                                <button
                                    className="pointer-events-auto inline-flex items-center justify-center rounded-xl
                             border border-white/15 bg-white/5 px-5 py-3 font-semibold
                             transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:border-white/25"
                                    onMouseEnter={() => gsap.to("#cursor", { scale: 3, duration: 0.2 })}
                                    onMouseLeave={() => gsap.to("#cursor", { scale: 1, duration: 0.2 })}
                                >
                                    Explore services
                                    <span className="ml-2 text-[#AD1C42]">→</span>
                                </button>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* placeholder for next components */}
            <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-20">
                <Reveal className="text-center">
                    <h2 className="text-2xl sm:text-3xl font-semibold">
                        Next: <span className="text-[#AD1C42]">Transport modes</span>
                    </h2>
                    <p className="mt-3 text-white/70">
                        We’ll make separate components: Air, Road, Sea, Railway, Customs, Warehousing, Insurance, Tracking.
                    </p>
                </Reveal>
            </section>

            {/* Notes:
          Put images in /public:
          - /logistics-hero.jpg
          - /logistics-warehouse.jpg
          - /logistics-tracking.jpg
      */}
        </div>
    );
}
