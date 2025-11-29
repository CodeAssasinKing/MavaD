import React, {useEffect, useRef} from "react";
import gsap from "gsap";
import {Link} from "react-router-dom";

function Navbar() {
    const [open , setOpen] = React.useState(false);
    const sidebarRef = useRef(null);
    const firstLine = useRef(null);
    const secondLine = useRef(null);
    const lastLine = useRef(null);


    const HandleSideBar = () => {
        if (open){
            gsap.to(sidebarRef.current, {
                translate: 600,
                duration: 0.7,
                ease: "power1.inOut",
                onComplete: () => setOpen(false)
            })
            gsap.to(firstLine.current, {
                rotate: 0,
                duration: 0.5,
                ease: "power1.inOut",
            })
            gsap.to(lastLine.current, {
                rotate: 0,
                duration: 0.5,
                ease: "power1.inOut",
            })
            gsap.to(secondLine.current, {
                opacity: 1,
                duration: 0.5,
                ease: "power1.inOut",
            })
        }
        else{
            gsap.to(sidebarRef.current, {
                translate: 0,
                duration: 0.7,
                ease: "power1.inOut",
                onComplete: () => setOpen(true)
            })
            gsap.to(firstLine.current, {
                rotate: 60,
                duration: 0.5,
                ease: "power1.inOut",
            })
            gsap.to(lastLine.current, {
                rotate: -60,
                duration: 0.5,
                ease: "power1.inOut",
            })
            gsap.to(secondLine.current, {
                opacity: 0,
                duration: 0.5,
                ease: "power1.inOut",
            })
        }
    }
    return (
        <>
            <div className="w-lvw bg-black h-[10vh] flex justify-between items-center p-10 ">
                <div className="logo flex justify-center items-center">
                    <img src="/logo%20(2).png" alt="logo" className="w-[50px]"/>
                    <label htmlFor="logo"
                           className="z-10 font-bold text-4xl"
                           onMouseEnter={() => gsap.to("#cursor", {scale: 3, duration:0.2})}
                           onMouseLeave={() => gsap.to("#cursor", {scale: 1, duration:0.2})}
                    >The-Perfect Time</label>
                </div>
                <div className="flex justify-center align-center gap-1 flex-col z-10"
                     onMouseEnter={() => gsap.to("#cursor", {scale: 3, duration:0.2})}
                     onMouseLeave={() => gsap.to("#cursor", {scale: 1, duration:0.2})}
                     onClick={HandleSideBar}
                >
                    <div className='bg-white w-[50px] h-[5px]' ref={firstLine}></div>
                    <div className='bg-white w-[50px] h-[5px]' ref={secondLine}></div>
                    <div className='bg-white w-[50px] h-[5px]' ref={lastLine}></div>
                </div>
            </div>

            <div className="w-[600px] flex justify-center items-center z-10 flex-col fixed top-0 right-0 p-10 bg-black border-l h-[100vh] translate-x-200" ref={sidebarRef}>

                <div className="flex justify-between items-center z-10 mb-10 w-100 absolute top-0 mt-10" >
                    <div className="flex items-center">
                        <img src="/logo%20(2).png" alt="logo" className="w-[70px]"/>
                        <h1
                            className=" font-bold text-5xl "
                            onMouseEnter={() => gsap.to("#cursor", {scale: 3, duration:0.2})}
                            onMouseLeave={() => gsap.to("#cursor", {scale: 1, duration:0.2})}

                        >Mava</h1>
                    </div>
                    <div>
                        <i className="bi bi-x-lg text-4xl "
                           onMouseEnter={() => gsap.to("#cursor", {scale: 3, duration:0.2})}
                           onMouseLeave={() => gsap.to("#cursor", {scale: 1, duration:0.2})}
                           onClick={HandleSideBar}
                        ></i>
                    </div>
                </div>


                <div className="flex justify-items-start items-center z-10 w-100 p-10 gap-5">
                    <div>
                        <i className="bi bi-house text-4xl "
                           onMouseEnter={() => gsap.to("#cursor", {scale: 3, duration:0.2})}
                           onMouseLeave={() => gsap.to("#cursor", {scale: 1, duration:0.2})}
                        ></i>
                    </div>
                    <div>
                        <Link to={"/"}
                            className=" font-bold text-4xl "
                            onMouseEnter={() => gsap.to("#cursor", {scale: 3, duration:0.2})}
                            onMouseLeave={() => gsap.to("#cursor", {scale: 1, duration:0.2})}
                        >Home page </Link>
                    </div>

                </div>


                <div className="flex justify-items-start items-center z-10 w-100 p-10 gap-5">
                    <div>
                        <i className="bi bi-receipt text-4xl "
                           onMouseEnter={() => gsap.to("#cursor", {scale: 3, duration:0.2})}
                           onMouseLeave={() => gsap.to("#cursor", {scale: 1, duration:0.2})}
                        ></i>
                    </div>
                    <div>
                        <Link to={"/procurement/"}
                            className=" font-bold text-4xl "
                            onMouseEnter={() => gsap.to("#cursor", {scale: 3, duration:0.2})}
                            onMouseLeave={() => gsap.to("#cursor", {scale: 1, duration:0.2})}
                        >Procurement</Link>
                    </div>

                </div>
                <div className="flex justify-items-start items-center z-10 w-100 p-10 gap-5">
                    <div>
                        <i className="bi bi-box-seam text-4xl "
                           onMouseEnter={() => gsap.to("#cursor", {scale: 3, duration:0.2})}
                           onMouseLeave={() => gsap.to("#cursor", {scale: 1, duration:0.2})}
                        ></i>
                    </div>
                    <div>
                        <Link to={"/logistics/"}
                            className=" font-bold text-4xl "
                            onMouseEnter={() => gsap.to("#cursor", {scale: 3, duration:0.2})}
                            onMouseLeave={() => gsap.to("#cursor", {scale: 1, duration:0.2})}
                        >Logistics</Link>
                    </div>

                </div>

                <div className="flex justify-items-start items-center z-10 w-100 p-10 gap-5">
                    <div>
                        <i className="bi bi-person-lines-fill text-4xl "
                           onMouseEnter={() => gsap.to("#cursor", {scale: 3, duration:0.2})}
                           onMouseLeave={() => gsap.to("#cursor", {scale: 1, duration:0.2})}
                        ></i>
                    </div>
                    <div>
                        <Link to={"/"}
                            className=" font-bold text-4xl "
                            onMouseEnter={() => gsap.to("#cursor", {scale: 3, duration:0.2})}
                            onMouseLeave={() => gsap.to("#cursor", {scale: 1, duration:0.2})}
                        >Contacts</Link>
                    </div>

                </div>
            </div>
        </>
    )
}


export default Navbar;