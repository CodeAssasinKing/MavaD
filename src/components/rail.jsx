// components/RailFreightSection.jsx
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

function Stepper({ steps, start, stepMs = 520 }) {
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
        <Reveal key={i} show={start && i <= idx}>
            {node}
        </Reveal>
    ));
}

export default function RailFreightSection({
                                               id = "rail",
                                               bgImage = "/2015.jpg",
                                               sideImage = "/railway-side.jpg", // FULL picture on the LEFT
                                           }) {
    const [wrapRef, inView] = useInView({ threshold: 0.3 });

    const steps = useMemo(
        () => [
            <div className="text-center lg:text-left">
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]">
                    Rail Freight with <span className="text-[#AD1C42]">MAVA</span>
                </h2>
            </div>,

            <div className="text-center lg:text-left mt-5">
                <p className="text-lg sm:text-2xl font-semibold text-white/95 drop-shadow-[0_8px_16px_rgba(0,0,0,0.55)]">
                    Power of the route. <span className="text-[#AD1C42]">Precision</span> of the schedule.{" "}
                    <span className="text-[#AD1C42]">Confidence</span> at every station.
                </p>
            </div>,

            <div className="group rounded-2xl border border-white/10 bg-black/40 p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/5 hover:shadow-[0_0_50px_rgba(255,255,255,0.08)]">
                <p className="whitespace-pre-line text-base sm:text-xl text-white/85 leading-relaxed text-center lg:text-left">
                    A train doesn’t get stuck in traffic. Doesn’t wait for the weather. Doesn’t miss deadlines.{"\n"}
                    It moves. On schedule, on rails, on plan.
                </p>
            </div>,

            <div className="group rounded-2xl border border-white/10 bg-black/40 p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/5 hover:shadow-[0_0_50px_rgba(255,255,255,0.08)]">
                <p className="whitespace-pre-line text-base sm:text-xl text-white/85 leading-relaxed text-center lg:text-left">
                    We harness this power to make your cargo move like{" "}
                    <span className="text-[#AD1C42] font-semibold">clockwork.</span>{"\n"}
                    From <span className="text-[#AD1C42] font-semibold">China</span> to{" "}
                    <span className="text-[#AD1C42] font-semibold">Europe</span>. From the{" "}
                    <span className="text-[#AD1C42] font-semibold">CIS</span> to{" "}
                    <span className="text-[#AD1C42] font-semibold">Turkiye</span>.{"\n"}
                    Through the <span className="text-[#AD1C42] font-semibold">Caspian</span>,{" "}
                    <span className="text-[#AD1C42] font-semibold">Caucasus</span>,{" "}
                    <span className="text-[#AD1C42] font-semibold">Central Asia</span>.{"\n"}
                    One route — dozens of options. We pick the best.
                </p>
            </div>,

            <div className="group rounded-2xl border border-white/10 bg-black/40 p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/5 hover:shadow-[0_0_50px_rgba(255,255,255,0.08)]">
                <p className="whitespace-pre-line text-base sm:text-xl text-white/85 leading-relaxed text-center lg:text-left">
                    Every route is fine-tuned, every detail calculated.{"\n"}
                    <span className="text-[#AD1C42] font-semibold">
            For us, rail isn’t an alternative, it’s a strategy.
          </span>{"\n"}
                    <span className="text-[#AD1C42] font-semibold">
            We choose it deliberately, not hastily.
          </span>
                </p>
            </div>,

            <div className="group rounded-2xl border border-white/10 bg-black/40 p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/5 hover:shadow-[0_0_50px_rgba(255,255,255,0.08)]">
                <p className="whitespace-pre-line text-base sm:text-xl text-white/85 leading-relaxed text-center lg:text-left">
                    Container, flatcar, covered railcar, open-top railcar —{"\n"}
                    we tailor the format to the cargo’s essence, not a standard.
                </p>

                <div className="mt-6 text-center lg:text-left text-base sm:text-xl text-white/90">
                    <div className="font-extrabold">
                        We don’t rush —{" "}
                        <span className="text-[#AD1C42]">we move with precision.</span>
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
                <img src={bgImage} alt="" className="h-full w-full object-cover grayscale opacity-15" draggable={false} />
                <div className="absolute inset-0 bg-black/45" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/70 to-black" />
            </div>

            <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
                    {/* LEFT: picture */}
                    <div className="lg:col-span-5 order-1">
                        <Reveal show={inView} delay={180} className="h-full">
                            <div className="group relative h-full min-h-[360px] lg:min-h-[760px] overflow-hidden rounded-3xl border border-white/10 bg-black/40
                              transition-all duration-300 hover:-translate-y-1 hover:border-white/25
                              hover:shadow-[0_0_60px_rgba(255,255,255,0.08)]">
                                <img
                                    src={sideImage}
                                    alt="Rail Freight"
                                    className="h-full w-full object-cover opacity-95 transition-transform duration-700 group-hover:scale-[1.06]"
                                    draggable={false}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/0" />
                                <div className="absolute bottom-5 left-5 right-5">
                                    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-4 py-2 text-sm text-white/90">
                                        <span className="text-[#AD1C42]">●</span> Rail operations / schedule-first routing
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    {/* RIGHT: content */}
                    <div className="lg:col-span-7 order-2">
                        <div className="space-y-5">
                            <Stepper steps={steps} start={inView} stepMs={520} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Put images in /public:
          - /rail-bg.jpg
          - /rail-side.jpg
      */}
        </section>
    );
}
