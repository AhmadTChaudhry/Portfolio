"use client";

import { motion } from "framer-motion";

type EducationEntry = {
    degree: string;
    institution: string;
    location?: string;
    years: string;
    highlights: string[];
    transcriptUrl?: string;
};

const education: EducationEntry[] = [
    {
        degree: "Master of Information Technology (IoT)",
        institution: "Deakin University",
        location: "Burwood, Australia",
        years: "03/2024 – 02/2026",
        transcriptUrl: "/transcripts/masters-academic-transcript.pdf",
        highlights: [
            "Major: Internet of Things (IoT).",
            "Achieved High Distinctions in all 16 units.",
            "Student Mentor supporting peers in technical units.",
            "Student Ambassador for the Deakin Makerspace.",
        ],
    },
    {
        degree: "Bachelor of Computer Science",
        institution: "FAST NUCES",
        location: "Islamabad, Pakistan",
        years: "09/2017 – 12/2022",
        highlights: [
            "Final Year Project awarded Best Ranking Final Year Project.",
            "Built industry-focused projects across software engineering and systems courses.",
        ],
    },
    {
        degree: "BTEC Level 3 Information Communication Technology",
        institution: "Kingston College",
        location: "London, United Kingdom",
        years: "09/2013 – 07/2014",
        highlights: [
            "Achieved 3 Distinctions with an overall Merit.",
            "Developed a strong foundation in applied IT and computing fundamentals.",
        ],
    },
];

export default function Education() {
    return (
        <section
            id="education"
            className="py-20 relative selection:bg-primary selection:text-black"
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
                        <span className="text-secondary">/</span> Education
                    </h2>
                    <div className="h-1 w-20 bg-secondary/20 rounded"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {education.map((e) => (
                        <div
                            key={`${e.degree}-${e.institution}-${e.years}`}
                            className="glass-panel rounded-2xl p-8 border border-white/10"
                        >
                            <div className="flex items-start justify-between gap-6">
                                <div>
                                    <h3 className="text-2xl font-bold">
                                        {e.degree}
                                    </h3>
                                    <p className="text-gray-400 mt-2">
                                        {e.institution}
                                        {e.location ? ` • ${e.location}` : ""}
                                    </p>
                                </div>
                                <span className="text-sm font-mono text-gray-500 whitespace-nowrap">
                                    {e.years}
                                </span>
                            </div>

                            <div className="h-px bg-white/10 my-6" />

                            <ul className="space-y-2 text-gray-300">
                                {e.highlights.map((h) => (
                                    <li key={h} className="flex gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-secondary/70 shrink-0" />
                                        <span className="leading-relaxed">{h}</span>
                                    </li>
                                ))}
                            </ul>

                            {e.transcriptUrl && (
                                <div className="mt-8">
                                    <a
                                        href={e.transcriptUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="liquid-glass-btn inline-flex items-center justify-center px-4 py-2 text-sm font-bold uppercase tracking-widest"
                                    >
                                        View transcript
                                    </a>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

