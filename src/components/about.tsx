"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

type AboutProps = {
    name?: string;
    imageSrc?: string;
};

export default function About({
    name = "Ahmad T Chaudhry",
    imageSrc = "/profile/me.jpeg",
}: AboutProps) {
    const [imgOk, setImgOk] = useState(true);

    const initials = useMemo(() => {
        const parts = name.trim().split(/\s+/).slice(0, 3);
        return parts.map((p) => p[0]?.toUpperCase()).join("");
    }, [name]);

    return (
        <section
            id="about"
            className="py-20 bg-white/05 relative selection:bg-primary selection:text-black"
        >
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <h2 className="text-4xl font-bold mb-4">
                        <span className="text-secondary">/</span> About Me
                    </h2>
                    <div className="h-1 w-20 bg-secondary/20 rounded"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55 }}
                        className="glass-panel rounded-2xl overflow-hidden border border-white/10"
                    >
                        <div className="relative aspect-square bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                            {imgOk ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={imageSrc}
                                    alt={`${name} portrait`}
                                    className="w-full h-full object-cover"
                                    onError={() => setImgOk(false)}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-5xl font-black tracking-tight text-white/80">
                                            {initials}
                                        </div>
                                        <div className="text-sm text-gray-500 mt-2">
                                            Upload your headshot to{" "}
                                            <span className="font-mono text-gray-400">
                                                public/profile/me.jpg
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_60%)] opacity-70" />
                        </div>
                    </motion.div>

                    <div className="glass-panel rounded-2xl p-8 md:p-10">
                        <p className="text-gray-300 leading-relaxed text-lg">
                            I specialise in embedded systems and building AI-powered products
                            and full-stack experiences. I hold a strong foundation in software
                            engineering and a love for clean, user-centred design.
                        </p>

                        <div className="h-px bg-white/10 my-8" />

                        <h3 className="text-xl font-bold text-secondary mb-3">
                            Background
                        </h3>
                        <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                            {`I started out freelancing as a UI/UX designer, applying industry-standard, accessible design principles and usability heuristics. After repeatedly seeing my designs implemented without the intended craft or fidelity, I moved into frontend development so I could bring those interfaces to life exactly as envisioned. The natural next step was to go deeper into the backend and evolve into a design-focused full stack engineer.

Outside of pure software, I’m a cars and coffee enthusiast and deeply into hardware and embedded systems. I’ve been experimenting with Arduinos and ESP32s for as long as I can remember, which is why I chose IoT and embedded systems as my postgraduate focus - scoring 100/100 in my embedded systems unit for demonstrating end‑to‑end hardware, firmware, and software design.

Right now I’m excited about contributing to AI‑driven development, open-source projects, and embedded systems - shipping products where thoughtful UX, robust engineering, and smart automation all meet.`}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

