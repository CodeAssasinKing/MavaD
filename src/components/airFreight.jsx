// components/AirFreightSection.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";

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

function Reveal({ children, show, delay = 0, className = "" }) {
    return (
        <div
            style={{ transitionDelay: `${delay}ms` }}
            className={[
                "transition-all duration-700 ease-out",
                show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                className,
            ].join(" ")}
        >
            {children}
        </div>
    );
}

// reveal text block-by-block (not char-by-char)
function Stepper({ steps, start, stepMs = 450 }) {
    const [idx, setIdx] = useState(-1);

    useEffect(() => {
        if (!start) return;
        setIdx(-1);

        let alive = true;
        let i = -1;

        const tick = () => {
            if (!alive) return;
            i += 1;
            setIdx(i);
            if (i < steps.length - 1) setTimeout(tick, stepMs);
        };

        const t = setTimeout(tick, 120);
        return () => {
            alive = false;
            clearTimeout(t);
        };
    }, [start, steps.length, stepMs]);

    return steps.map((node, i) => (
        <Reveal key={i} show={start && i <= idx} delay={0}>
            {node}
        </Reveal>
    ));
}

export default function AirFreightSection({
                                              id = "air",
                                              bgImage = "/transport-logistics-concept.jpg",
                                              sideImage = "/transport-logistics-products.jpg",
                                          }) {
    const [wrapRef, inView] = useInView({ threshold: 0.3 });

    const steps = useMemo(
        () => [
            // title
            <div className="text-center lg:text-left">
                <h2
                    className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight
                     drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
                >
                    Air Freight by <span className="text-[#AD1C42]">MAVA</span>
                </h2>
            </div>,

            // subtitle
            <div className="text-center lg:text-left mt-5">
                <p
                    className="text-lg sm:text-2xl font-semibold text-white/95
                     drop-shadow-[0_8px_16px_rgba(0,0,0,0.55)]"
                >
                    Speed that’s measured not just in hours — but in{" "}
                    <span className="text-[#AD1C42]">trust.</span>
                </p>
            </div>,

            // block 1
            <div
                className="group rounded-2xl border border-white/10 bg-black/40 p-6 sm:p-8
                   transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/5
                   hover:shadow-[0_0_50px_rgba(255,255,255,0.08)]"
            >
                <p className="text-base sm:text-xl font-semibold text-white/90 leading-relaxed text-center lg:text-left">
                    When time becomes currency, and decisions need to be made{" "}
                    <span className="text-[#AD1C42]">not tomorrow, but yesterday</span> — air freight steps in.
                </p>
            </div>,

            // block 2
            <div
                className="group rounded-2xl border border-white/10 bg-black/40 p-6 sm:p-8
                   transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/5
                   hover:shadow-[0_0_50px_rgba(255,255,255,0.08)]"
            >
                <p className="whitespace-pre-line text-base sm:text-xl font-semibold text-white/85 leading-relaxed text-center lg:text-left">
                    We don’t just move cargo through the sky.{"\n"}
                    We make the sky the most reliable part of your supply chain.
                </p>
            </div>,

            // block 3
            <div
                className="group rounded-2xl border border-white/10 bg-black/40 p-6 sm:p-8
                   transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/5
                   hover:shadow-[0_0_50px_rgba(255,255,255,0.08)]"
            >
                <p className="whitespace-pre-line text-base sm:text-xl text-white/85 leading-relaxed text-center lg:text-left">
                    Whether it’s a sample that defines the future of a contract,{"\n"}
                    or a critical spare part needed to restart production —{"\n"}
                    <span className="text-[#AD1C42] font-semibold">we understand the value of every hour</span>, and deliver as
                    if it were our own.
                </p>
            </div>,

            // why
            <div
                className="group rounded-2xl border border-white/10 bg-black/40 p-6 sm:p-8
                   transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/5
                   hover:shadow-[0_0_50px_rgba(255,255,255,0.08)]"
            >
                <h3 className="text-center lg:text-left text-xl sm:text-2xl font-extrabold">
                    Why <span className="text-[#AD1C42]">MAVA</span> is different?
                </h3>

                <ul className="mt-6 space-y-3 text-white/85 text-base sm:text-lg">
                    {[
                        "Routes tailored individually — we find solutions, not standard flights",
                        "Access to commercial air freight — from urgent parcels to tons of cargo",
                        "24/7 tracking and communication — always know where your cargo is and when it lands",
                        "We don’t chase volume — we fly with purpose",
                    ].map((t, i) => (
                        <li
                            key={i}
                            className="rounded-xl border border-white/10 bg-black/30 px-4 py-3
                         transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/5"
                        >
                            <span className="text-[#AD1C42] font-semibold">• </span>
                            {t}
                        </li>
                    ))}
                </ul>

                <div className="mt-8 text-center lg:text-left text-base sm:text-xl text-white/90">
          <span className="font-semibold">
            At <span className="text-[#AD1C42]">MAVA</span>, air freight is more than just transport.
          </span>
                    <div className="mt-2 font-extrabold text-white">
                        It’s <span className="text-[#AD1C42]">meaningful speed</span>. It’s{" "}
                        <span className="text-[#AD1C42]">logistics with wings</span>.
                    </div>
                </div>
            </div>,
        ],
        []
    );

    return (
        <section id={id} ref={wrapRef} className="relative overflow-hidden bg-black">
            {/* background */}
            <div className="absolute inset-0">
                <img
                    src={bgImage}
                    alt=""
                    className="h-full w-full object-cover grayscale opacity-20"
                    draggable={false}
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/70 to-black" />
            </div>

            <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
                    {/* LEFT */}
                    <div className="lg:col-span-7">
                        <div className="space-y-5">
                            <Stepper steps={steps} start={inView} stepMs={520} />
                        </div>
                    </div>

                    {/* RIGHT: FULL picture */}
                    <div className="lg:col-span-5">
                        <Reveal show={inView} delay={240} className="h-full">
                            <div className="group relative h-full min-h-[360px] lg:min-h-[760px] overflow-hidden rounded-3xl border border-white/10 bg-black/40
                              transition-all duration-300 hover:-translate-y-1 hover:border-white/25
                              hover:shadow-[0_0_60px_rgba(255,255,255,0.08)]">
                                <img
                                    src={sideImage}
                                    alt="Air Freight"
                                    className="h-full w-full object-cover opacity-95 transition-transform duration-700 group-hover:scale-[1.06]"
                                    draggable={false}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/0" />
                                <div className="absolute bottom-5 left-5 right-5">
                                    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-4 py-2 text-sm text-white/90">
                                        <span className="text-[#AD1C42]">●</span> Air operations / priority cargo
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
