// components/Footer.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Uses ONLY tailwind classes (+ your global #cursor).
 * Important: for your custom cursor to scale on hover:
 * - your footer elements MUST have `data-cursor="true"`
 * - in your page-level cursor handler, listen to mouseover/mouseout and check closest([data-cursor])
 */

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

function Stepper({ steps, start, stepMs = 380 }) {
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

export default function Footer({
                                   address = "174, Atamyrat Niyazov avenue, Ashgabat, Turkmenistan. 774000",
                                   phone = "+99371846366",
                                   email = "ops.mava@gmail.com",
                                   responseTime = "Faster than you're used to.",
                               }) {
    const [ref, inView] = useInView({ threshold: 0.25 });

    const steps = useMemo(
        () => [
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="space-y-2">
                    <div
                        data-cursor="true"
                        className="text-2xl sm:text-3xl font-extrabold tracking-tight"
                    >
                        MAVA<span className="text-[#AD1C42]">.</span>
                    </div>
                    <p className="text-white/70 max-w-xl">
                        Logistics that stays clear, controlled, and predictable.
                    </p>
                </div>

                <a
                    data-cursor="true"
                    href={`mailto:${email}`}
                    className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3
                     font-semibold text-white transition-all duration-300
                     hover:-translate-y-1 hover:border-white/25 hover:bg-white/10
                     hover:shadow-[0_0_45px_rgba(255,255,255,0.10)]"
                >
                    Contact us
                </a>
            </div>,

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Address */}
                <div
                    data-cursor="true"
                    className="group rounded-2xl border border-white/10 bg-white/5 p-6
                     transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/10
                     hover:shadow-[0_0_45px_rgba(255,255,255,0.10)]"
                >
                    <div className="text-sm uppercase tracking-[0.25em] text-white/60">
                        Address
                    </div>
                    <div className="mt-3 text-white/85 leading-relaxed">
                        <span className="font-semibold text-[#AD1C42]">Address:</span>{" "}
                        {address}
                    </div>
                </div>

                {/* Phones */}
                <div
                    data-cursor="true"
                    className="group rounded-2xl border border-white/10 bg-white/5 p-6
                     transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/10
                     hover:shadow-[0_0_45px_rgba(255,255,255,0.10)]"
                >
                    <div className="text-sm uppercase tracking-[0.25em] text-white/60">
                        Phone
                    </div>
                    <div className="mt-3 text-white/85 leading-relaxed">
                        <span className="font-semibold text-[#AD1C42]">Phone:</span>{" "}
                        <a
                            data-cursor="true"
                            href={`tel:${phone.replace(/\s/g, "")}`}
                            className="underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white/70"
                        >
                            {phone}
                        </a>
                    </div>
                </div>

                {/* Email */}
                <div
                    data-cursor="true"
                    className="group rounded-2xl border border-white/10 bg-white/5 p-6
                     transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/10
                     hover:shadow-[0_0_45px_rgba(255,255,255,0.10)]"
                >
                    <div className="text-sm uppercase tracking-[0.25em] text-white/60">
                        Email
                    </div>
                    <div className="mt-3 text-white/85 leading-relaxed">
                        <span className="font-semibold text-[#AD1C42]">Email:</span>{" "}
                        <a
                            data-cursor="true"
                            href={`mailto:${email}`}
                            className="underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white/70"
                        >
                            {email}
                        </a>
                    </div>
                </div>

                {/* Response time */}
                <div
                    data-cursor="true"
                    className="group rounded-2xl border border-white/10 bg-white/5 p-6
                     transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/10
                     hover:shadow-[0_0_45px_rgba(255,255,255,0.10)]"
                >
                    <div className="text-sm uppercase tracking-[0.25em] text-white/60">
                        Response time
                    </div>
                    <div className="mt-3 text-white/85 leading-relaxed">
                        <span className="font-semibold text-[#AD1C42]">Response time:</span>{" "}
                        {responseTime}
                    </div>
                </div>
            </div>,

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 pt-6">
                <div className="text-white/60 text-sm">
                    © {new Date().getFullYear()} MAVA. All rights reserved.
                </div>
                <div className="text-white/60 text-sm">
                    Built for speed. Designed for control<span className="text-[#AD1C42]">.</span>
                </div>
            </div>,
        ],
        [address, phone, email, responseTime]
    );

    return (
        <footer ref={ref} className="relative bg-black">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-16">
                <div className="space-y-6">
                    <Stepper steps={steps} start={inView} stepMs={420} />
                </div>
            </div>
        </footer>
    );
}
