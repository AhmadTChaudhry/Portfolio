"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import SplitWords from "@/components/split-words";
import { useSplitHeadingReveal } from "@/hooks/useSplitHeadingReveal";

const skills = [
    "JavaScript", "TypeScript", "Node.js", "React", "Next.js",
    "Python", "Java", "SQL", "MongoDB", "AWS",
    "Docker", "Git", "Figma", "Tailwind CSS", "GraphQL"
];

export default function Skills() {
    const sectionRef = useRef<HTMLElement>(null);
    useSplitHeadingReveal(sectionRef);

    return (
        <section ref={sectionRef} className="py-20 overflow-hidden">
            <div className="container mx-auto px-6 mb-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-center text-2xl font-bold text-gray-500 mb-8">
                        <SplitWords text="Technologies & Tools" />
                    </h2>
                </motion.div>
            </div>

            <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

                <div className="flex gap-8 whitespace-nowrap overflow-hidden py-4">
                    <motion.div
                        animate={{ x: [0, -1000] }}
                        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                        className="flex gap-8 items-center"
                    >
                        {[...skills, ...skills, ...skills].map((skill, i) => (
                            <div
                                key={i}
                                className="text-4xl font-bold text-white/10 hover:text-primary/80 transition-colors cursor-default select-none"
                            >
                                {skill}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

const skills2 = [
    "AWS",
    "Azure",
    "Firebase",
    "Docker",
    "Kubernetes",
    "Terraform",
    "CI/CD",
    "Jenkins",
];

export function Skills2() {
    const sectionRef = useRef<HTMLElement>(null);
    useSplitHeadingReveal(sectionRef);

    return (
        <section ref={sectionRef} className="py-20 overflow-hidden">
            <div className="container mx-auto px-6 mb-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-center text-2xl font-bold text-gray-500 mb-8">
                        <SplitWords text="Cloud & DevOps" />
                    </h2>
                </motion.div>
            </div>

            <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

                <div className="flex gap-8 whitespace-nowrap overflow-hidden py-4">
                    <motion.div
                        animate={{ x: [0, -1000] }}
                        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                        className="flex gap-8 items-center"
                    >
                        {[...skills2, ...skills2, ...skills2].map((skill, i) => (
                            <div
                                key={i}
                                className="text-4xl font-bold text-white/10 hover:text-primary/80 transition-colors cursor-default select-none"
                            >
                                {skill}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
