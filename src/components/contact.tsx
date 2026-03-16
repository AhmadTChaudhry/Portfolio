"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Linkedin, Github } from "lucide-react";
import SplitWords from "@/components/split-words";
import { useSplitHeadingReveal } from "@/hooks/useSplitHeadingReveal";

export default function Contact() {
    const sectionRef = useRef<HTMLElement>(null);
    useSplitHeadingReveal(sectionRef);

    return (
        <section ref={sectionRef} id="contact" className="py-20 relative">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="glass-panel p-10 md:p-16 rounded-3xl text-center relative overflow-hidden"
                >
                    {/* Decorative gradients */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-primary" />
                    <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />

                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <SplitWords text="Let's Work Together" />
                    </h2>
                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                        I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>

                    <a
                        href="mailto:ahmadtc17@gmail.com"
                        className="liquid-glass-btn-primary inline-flex items-center gap-3 px-8 py-4 font-bold mb-8"
                    >
                        <Mail size={20} />
                        ahmadtc17@gmail.com
                    </a>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10">
                        <a
                            href="https://www.linkedin.com/in/ahmadtc/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="liquid-glass-btn inline-flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-widest"
                        >
                            <Linkedin size={18} />
                            LinkedIn
                        </a>
                        <a
                            href="https://github.com/AhmadTChaudhry"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="liquid-glass-btn inline-flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-widest"
                        >
                            <Github size={18} />
                            GitHub
                        </a>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-gray-400">
                        <div className="flex items-center gap-2">
                            <MapPin size={18} />
                            <span>Surrey Hills, Melbourne, Australia</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            <footer className="text-center text-gray-600 py-10 text-sm mt-10">
                <p>© {new Date().getFullYear()} Ahmad T Chaudhry's Portfolio. Built with Next.js & Tailwind.</p>
            </footer>
        </section>
    );
}
