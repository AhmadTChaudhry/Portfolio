"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap, registerScrollTrigger } from "@/lib/gsap";

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (!headingRef.current) return;

        const ctx = gsap.context(() => {
            const intro = gsap.timeline();
            intro.fromTo(
                headingRef.current,
                { opacity: 0, y: 24 },
                { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }
            );

            const glitch = gsap.timeline({ repeat: -1, repeatDelay: 3.2 });
            glitch
                .to(headingRef.current, {
                    duration: 0.08,
                    x: -2,
                    textShadow:
                        "0 0 12px rgba(255, 216, 155, 0.75), 0 0 20px rgba(25, 84, 123, 0.5)",
                })
                .to(headingRef.current, {
                    duration: 0.08,
                    x: 2,
                    textShadow:
                        "0 0 12px rgba(25, 84, 123, 0.7), 0 0 20px rgba(255, 216, 155, 0.45)",
                })
                .to(headingRef.current, {
                    duration: 0.08,
                    x: 0,
                    textShadow: "none",
                });

            intro.add(glitch, ">0.2");
        }, headingRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (!sectionRef.current || !glowRef.current) return;
        registerScrollTrigger();

        const ctx = gsap.context(() => {
            gsap.to(glowRef.current, {
                y: 120,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        >
            {/* Background Layers */}
            <div
                ref={glowRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-primary/25 rounded-full blur-[120px] z-0"
            />
            <div
                aria-hidden="true"
                className="absolute inset-0 z-0 opacity-85"
                style={{
                    background:
                        "radial-gradient(circle at top, rgba(64, 12, 30, 0.65) 0%, rgba(8, 2, 6, 0) 65%)",
                }}
            />
            <motion.div
                aria-hidden="true"
                className="absolute inset-0 z-0 opacity-70 mix-blend-screen"
                style={{
                    backgroundImage:
                        "radial-gradient(rgba(255,255,255,0.16) 1px, transparent 1px), radial-gradient(rgba(0,0,0,0.35) 1px, transparent 1px)",
                    backgroundSize: "6px 6px, 10px 10px",
                    backgroundPosition: "0 0, 4px 6px",
                    maskImage:
                        "radial-gradient(circle at center, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)",
                }}
                animate={{
                    backgroundPosition: ["0px 0px, 4px 6px", "30px 30px, 40px 50px"],
                }}
                transition={{
                    duration: 10,
                    ease: "linear",
                    repeat: Infinity,
                }}
            />

            <div className="container mx-auto px-6 text-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-sm tracking-[0.2em] text-primary mb-6">
                        Software Engineer - Embedded Systems - IoT - Artificial Intelligence
                    </span>
                    <h1
                        ref={headingRef}
                        className="text-5xl md:text-8xl font-bold tracking-tighter mb-6"
                    >
                        Engineering Smart Systems <br />
                        <span
                            className="text-transparent bg-clip-text"
                            style={{
                                backgroundImage:
                                    "linear-gradient(90deg, rgba(255, 216, 155, 1) 0%, rgba(25, 84, 123, 1) 100%)",
                            }}
                        >
                            For The Real World
                        </span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Developing scalable full-stack applications, smart embedded systems, and AI-powered technologies that solve real-world problems.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <a
                            href="#projects"
                            className="liquid-glass-btn-primary px-8 py-4 font-bold"
                        >
                            View My Work
                        </a>
                        <a
                            href="#contact"
                            className="liquid-glass-btn px-8 py-4"
                        >
                            Contact Me
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
            >
                <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
                    <div className="w-1 h-3 bg-primary rounded-full" />
                </div>
            </motion.div>
        </section>
    );
}
