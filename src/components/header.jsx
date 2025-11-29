import React, { useEffect } from "react";
import gsap from "gsap";
import Navbar from "../components/navbar.jsx";
import Particles from "../components/particles.jsx";
import Footer from "../components/footer.jsx";
function Header() {

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
            <div
                id="cursor"
                className="fixed top-0 left-0 w-[20px] h-[20px] bg-[#AD1C42] rounded-full z-[999] pointer-events-none mix-blend-difference "
            />
            <Navbar/>
            <Particles />

            <Footer></Footer>

        </>

    );
}

export default Header;
