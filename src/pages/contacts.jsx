// pages/Contact.jsx
import React, {useState, Suspense, useEffect} from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Stars, OrbitControls } from "@react-three/drei";
import Model from "../components/3dmodel.jsx";
import StatusModal from "../pages/statusModal.jsx";
import gsap from "gsap";

function Contact() {
    const [modalType, setModalType] = useState(null); // "success" | "error" | null
    const [username, setUsername] = useState("");
    const [subject, setSubject] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    access_key: import.meta.env.VITE_W3F_KEY,
                    name: username,
                    email,
                    subject,
                    message,
                }),
            });

            const data = await res.json();
            setModalType(data.success ? "success" : "error");

            if (data.success) {
                setUsername(""); setEmail(""); setSubject(""); setMessage("");
            }
        } catch (err) {
            console.error(err);
            setModalType("error");
        }
    };


    const closeModal = () => setModalType(null);


    useEffect(() => {
        const el = document.getElementById("cursor");
        if (!el) return;

        const xTo = gsap.quickTo(el, "x", { duration: 0.2, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.2, ease: "power3.out" });

        const handleMouseMove = (e) => {
            xTo(e.clientX - 10);
            yTo(e.clientY - 10);
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);


    return (
        <>
            <Canvas
                style={{
                    width: "100vw",
                    height: "100vh",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    zIndex: 0,
                    backgroundColor: "black",
                }}
                shadows
            >
                <Suspense fallback={null}>
                    <Environment preset="night" />
                    <Stars radius={200} depth={100} count={10000} factor={4} saturation={1} fade speed={2} />
                    <OrbitControls enablePan enableZoom={true} enableRotate />
                    <Model
                        url={"/models/earth/scene.gltf"}
                        position={[-1.5, 0, 0]}
                        rotation={[0, 0, 0]}
                        scale={[10, 10, 10]}
                    />
                    <ambientLight intensity={3} />
                </Suspense>
            </Canvas>

            <div
                id="cursor"
                className="fixed top-0 left-0 w-[20px] h-[20px] bg-[#AD1C42] rounded-full z-[999] pointer-events-none mix-blend-difference "
            />

            {/* FORM PANEL */}
            <div className="fixed inset-0 z-[10] pointer-events-none">
                <div className="h-full w-full flex items-center justify-center md:justify-end px-4 md:px-12">
                    <div className="pointer-events-auto w-full max-w-[420px]">
                        <div
                            className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl
                         shadow-[0_0_80px_rgba(255,255,255,0.06)]
                         transition-all duration-300
                         hover:-translate-y-1 hover:border-white/25 hover:bg-white/10"
                        >
                            <div className="p-6 sm:p-8">
                                {/* Top */}
                                <div className="mb-6">
                                    <div className="text-xs uppercase tracking-[0.25em] text-white/60"
                                         onMouseEnter={() => gsap.to("#cursor", {scale: 3, duration:0.2})}
                                         onMouseLeave={() => gsap.to("#cursor", {scale: 1, duration:0.2})}>
                                        Contact
                                    </div>
                                    <h2
                                        data-cursor="true"
                                        className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-white"
                                        onMouseEnter={() => gsap.to("#cursor", {scale: 3, duration:0.2})}
                                        onMouseLeave={() => gsap.to("#cursor", {scale: 1, duration:0.2})}
                                    >
                                        Let’s talk<span className="text-[#AD1C42]">.</span>
                                    </h2>
                                    <p className="mt-2 text-white/70 leading-relaxed"
                                       onMouseEnter={() => gsap.to("#cursor", {scale: 3, duration:0.2})}
                                       onMouseLeave={() => gsap.to("#cursor", {scale: 1, duration:0.2})}>
                                        Send a message and we’ll reply as fast as possible.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* Name */}
                                    <div>
                                        <label className="block text-sm text-white/70 mb-2"
                                               onMouseEnter={() => gsap.to("#cursor", {scale: 3, duration:0.2})}
                                               onMouseLeave={() => gsap.to("#cursor", {scale: 1, duration:0.2})}>Name</label>
                                        <input
                                            data-cursor="true"
                                            type="text"
                                            name="name"
                                            required
                                            placeholder="Your name"
                                            className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3
                                 text-white placeholder:text-white/35 outline-none
                                 transition-all duration-200
                                 focus:border-white/25 focus:bg-black/55
                                 hover:border-white/20"
                                            value={username}
                                            onChange={e => setUsername(e.target.value)}
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm text-white/70 mb-2"
                                               onMouseEnter={() => gsap.to("#cursor", {scale: 3, duration:0.2})}
                                               onMouseLeave={() => gsap.to("#cursor", {scale: 1, duration:0.2})}>Email</label>
                                        <input
                                            data-cursor="true"
                                            type="email"
                                            name="email"
                                            required
                                            placeholder="you@example.com"
                                            className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3
                                 text-white placeholder:text-white/35 outline-none
                                 transition-all duration-200
                                 focus:border-white/25 focus:bg-black/55
                                 hover:border-white/20"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                    </div>

                                    {/* Subject */}
                                    <div>
                                        <label className="block text-sm text-white/70 mb-2"
                                               onMouseEnter={() => gsap.to("#cursor", {scale: 3, duration:0.2})}
                                               onMouseLeave={() => gsap.to("#cursor", {scale: 1, duration:0.2})}>Subject</label>
                                        <input
                                            data-cursor="true"
                                            type="text"
                                            name="subject"
                                            required
                                            placeholder="Project, question, idea..."
                                            className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3
                                 text-white placeholder:text-white/35 outline-none
                                 transition-all duration-200
                                 focus:border-white/25 focus:bg-black/55
                                 hover:border-white/20"
                                            value={subject}
                                            onChange={e => setSubject(e.target.value)}
                                        />
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="block text-sm text-white/70 mb-2"
                                               onMouseEnter={() => gsap.to("#cursor", {scale: 3, duration:0.2})}
                                               onMouseLeave={() => gsap.to("#cursor", {scale: 1, duration:0.2})}>Message</label>
                                        <textarea
                                            data-cursor="true"
                                            name="message"
                                            required
                                            rows={4}
                                            placeholder="Tell me a bit more..."
                                            className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3
                                 text-white placeholder:text-white/35 outline-none
                                 transition-all duration-200
                                 focus:border-white/25 focus:bg-black/55
                                 hover:border-white/20 resize-none"
                                            value={message}
                                            onChange={e => setMessage(e.target.value)}
                                        />
                                    </div>

                                    {/* Button */}
                                    <button
                                        data-cursor="true"
                                        type="submit"
                                        className="w-full rounded-2xl bg-[#AD1C42] px-5 py-3 font-semibold text-white

                               transition-all duration-300
                               hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(173,28,66,0.35)]
                               active:translate-y-0"
                                        onMouseEnter={() => gsap.to("#cursor", {scale: 3, duration:0.2})}
                                        onMouseLeave={() => gsap.to("#cursor", {scale: 1, duration:0.2})}
                                    >
                                        Send message
                                    </button>

                                    {/* small note */}
                                    <div className="pt-1 text-center text-xs text-white/50"
                                         onMouseEnter={() => gsap.to("#cursor", {scale: 3, duration:0.2})}
                                         onMouseLeave={() => gsap.to("#cursor", {scale: 1, duration:0.2})}>
                                        By sending, you agree to be contacted by email.
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* small bottom hint */}
                        <div className="mt-4 text-center md:text-left text-xs text-white/40"
                             onMouseEnter={() => gsap.to("#cursor", {scale: 3, duration:0.2})}
                             onMouseLeave={() => gsap.to("#cursor", {scale: 1, duration:0.2})}>
                            Tip: hover form elements for cursor effect.
                        </div>
                    </div>
                </div>
            </div>

            <StatusModal show={modalType === "success"} type="success" onClose={closeModal} />
            <StatusModal show={modalType === "error"} type="error" onClose={closeModal} />
        </>
    );
}

export default Contact;
