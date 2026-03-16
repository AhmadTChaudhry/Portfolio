import Link from "next/link";
import { ExternalLink, Github, Youtube, BookOpen } from "lucide-react";

import Navbar from "@/components/navbar";
import { projects, projectCategories, getProjectThumbnailSrc } from "@/data/projects";
import type { ProjectLink } from "@/data/projects";

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

export default function ProjectsPage() {
    const groupedProjects = projectCategories.map((category) => ({
        category,
        items: projects.filter((project) => project.category === category),
    }));

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
            <Navbar />
            <section className="pt-28 pb-20">
                <div className="container mx-auto px-6">
                    <div className="mb-12">
                        <p className="text-sm uppercase tracking-widest text-gray-400 mb-4">
                            Projects
                        </p>
                        <h1 className="text-4xl md:text-5xl font-bold">All Projects</h1>
                        <p className="text-gray-400 mt-4 max-w-2xl">
                            A categorized view of my recent work across embedded systems,
                            web, and software engineering.
                        </p>
                        <Link
                            href="/"
                            className="liquid-glass-btn inline-flex items-center gap-2 mt-6 px-4 py-2 text-sm uppercase tracking-widest"
                        >
                            Back to Home
                        </Link>
                    </div>

                    <div className="space-y-14">
                        {groupedProjects.map(({ category, items }) => (
                            <div key={category}>
                                <div className="mb-6">
                                    <h2 className="text-2xl font-bold">
                                        <span className="text-secondary">/</span> {category}
                                    </h2>
                                    <div className="h-1 w-20 bg-secondary/20 rounded"></div>
                                </div>

                                {items.length === 0 ? (
                                    <p className="text-gray-500">
                                        New projects coming soon.
                                    </p>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {items.map((project) => {
                                            const thumbnailSrc = getProjectThumbnailSrc(project);
                                            return (
                                                <div
                                                    key={project.slug}
                                                    className="group glass-panel rounded-2xl overflow-hidden hover:bg-white/5 transition-all duration-300 flex flex-col"
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
                                                                    {getLinkIcon(project.links.type)}{" "}
                                                                    {getLinkText(project.links)}
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
