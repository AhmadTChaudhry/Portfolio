"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SplitWords from "@/components/split-words";
import { useSplitHeadingReveal } from "@/hooks/useSplitHeadingReveal";
import { gsap, registerScrollTrigger } from "@/lib/gsap";

const experiences = [
    {
        role: "AI Product Engineer",
        company: "FromHereOn",
        period: "03/2026 – Present",
        description:
            "Building AI product capabilities from concept to shipped features, including product workflows, integration architecture, and implementation across the frontend and backend stack.",
    },
    {
        role: "Barista (Part-Time)",
        company: "Ferguson Plarre",
        period: "07/2024 – 08/2025",
        description: "Delivering high-quality customer service in a fast-paced environment. consistently meeting daily sales and service targets. Managing multiple priorities under time pressure while maintaining attention to detail and compliance with safety and hygiene standards. Collaborating with diverse team members to ensure smooth operations.",
    },
    {
        role: "Web Developer",
        company: "Fongrow (pvt) Ltd.",
        period: "06/2022 – 12/2023",
        description: "Delivered secure, standards-compliant web environments and provided ongoing technical support to internal teams. Applied Agile principles to manage priorities and deliver customer-focused solutions on time. Developed websites using Wordpress, HTML, CSS and Node.JS implementing secure web standards.",
    },
];

export default function Experience() {
    const sectionRef = useRef<HTMLElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    useSplitHeadingReveal(sectionRef);

    useEffect(() => {
        if (!timelineRef.current || !progressRef.current) return;
        registerScrollTrigger();

        const ctx = gsap.context(() => {
            gsap.fromTo(
                progressRef.current,
                { scaleY: 0 },
                {
                    scaleY: 1,
                    transformOrigin: "top",
                    ease: "none",
                    scrollTrigger: {
                        trigger: timelineRef.current,
                        start: "top 80%",
                        end: "bottom 20%",
                        scrub: true,
                    },
                }
            );
        }, timelineRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="experience" className="py-20 relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <h2 className="text-4xl font-bold mb-4">
                        <span className="text-primary">/</span>{" "}
                        <SplitWords text="Experience" />
                    </h2>
                    <div className="h-1 w-20 bg-primary/20 rounded"></div>
                </motion.div>

                <div ref={timelineRef} className="grid gap-8 relative pl-6">
                    <div className="absolute left-2 top-0 bottom-0 w-px bg-white/10" />
                    <div
                        ref={progressRef}
                        className="absolute left-2 top-0 bottom-0 w-px bg-primary/60 origin-top"
                    />

                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="glass-panel p-8 rounded-2xl relative overflow-hidden group hover:border-primary/30 transition-colors"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 group-hover:bg-primary/10 transition-colors" />

                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                                        {exp.role}
                                    </h3>
                                    <p className="text-primary/80 font-medium">{exp.company}</p>
                                </div>
                                <span className="text-sm text-gray-400 mt-2 md:mt-0 font-mono border border-white/10 px-3 py-1 rounded-full">
                                    {exp.period}
                                </span>
                            </div>
                            <p className="text-gray-400 leading-relaxed">
                                {exp.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
