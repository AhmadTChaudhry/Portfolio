"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Github, Youtube, BookOpen } from "lucide-react";
import { projects, getProjectThumbnailSrc } from "@/data/projects";
import type { Project, ProjectLink } from "@/data/projects";
import SplitWords from "@/components/split-words";
import { useSplitHeadingReveal } from "@/hooks/useSplitHeadingReveal";
import { useTilt } from "@/hooks/useTilt";

type ProjectCardProps = {
    project: Project;
    index: number;
};

const getLinkIcon = (type?: string) => {
    switch (type) {
        case "video":
            return <Youtube size={18} />;
        case "blog":
            return <BookOpen size={18} />;
        default:
            return <ExternalLink size={18} />;
    }
};

const getLinkText = (link: ProjectLink) => {
    if (link.label) return link.label;
    switch (link.type) {
        case "video":
            return "Watch Demo";
        case "blog":
            return "Read Articles";
        default:
            return "Live Demo";
    }
};

const ProjectCard = ({ project, index }: ProjectCardProps) => {
    const cardRef = useTilt<HTMLDivElement>({ maxTilt: 6, perspective: 900 });
    const thumbnailSrc = getProjectThumbnailSrc(project);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group glass-panel rounded-2xl overflow-hidden hover:bg-white/5 transition-all duration-300 flex flex-col transform-gpu"
        >
            <Link href={`/projects/${project.slug}`} className="block shrink-0">
                <div className="h-48 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500 bg-gradient-to-br from-gray-900 to-black">
                    {thumbnailSrc ? (
                        <>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={thumbnailSrc}
                                alt=""
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        </>
                    ) : (
                        <>
                            <div className="absolute inset-0 flex items-center justify-center text-gray-700 font-mono text-lg p-4 text-center">
                                {project.title}
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        </>
                    )}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_65%)]" />
                </div>
            </Link>

            <div className="p-8 flex flex-col flex-grow">
                <Link
                    href={`/projects/${project.slug}`}
                    className="text-2xl font-bold mb-3 block group-hover:text-secondary transition-colors"
                >
                    {project.title}
                </Link>
                <p className="text-gray-400 mb-6 line-clamp-3 flex-grow">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-xs font-mono bg-white/5 px-3 py-1 rounded-full text-[#ffd89b] border border-secondary/10"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-4 mt-auto flex-wrap">
                    <Link
                        href={`/projects/${project.slug}`}
                        className="text-sm font-bold text-gray-400 hover:text-secondary transition-colors"
                    >
                        Read more
                    </Link>
                    {project.links.code !== "#" && (
                        <a
                            href={project.links.code}
                            className="flex items-center gap-2 text-sm font-bold text-white hover:text-secondary transition-colors"
                        >
                            <Github size={18} /> Code
                        </a>
                    )}
                    {project.links.demo !== "#" && (
                        <a
                            href={project.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm font-bold text-white hover:text-secondary transition-colors"
                        >
                            {getLinkIcon(project.links.type)} {getLinkText(project.links)}
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default function Projects() {
    const sectionRef = useRef<HTMLElement>(null);
    useSplitHeadingReveal(sectionRef);

    return (
        <section ref={sectionRef} id="projects" className="py-20 bg-white/05 relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
                >
                    <div>
                        <h2 className="text-4xl font-bold mb-4 md:mb-2">
                            <span className="text-secondary">/</span>{" "}
                            <SplitWords text="Featured Projects" />
                        </h2>
                        <div className="h-1 w-20 bg-secondary/20 rounded"></div>
                    </div>
                    <Link
                        href="/projects"
                        className="liquid-glass-btn inline-flex items-center justify-center px-4 py-2 text-sm font-bold uppercase tracking-widest"
                    >
                        View All Projects
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.title} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
