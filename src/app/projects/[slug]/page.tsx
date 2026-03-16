import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, Github, Youtube, BookOpen, ArrowLeft } from "lucide-react";
import Navbar from "@/components/navbar";
import { getProjectBySlug, projects } from "@/data/projects";
import type { ProjectMedia, ProjectLink } from "@/data/projects";
import { getYoutubeVideoId } from "@/lib/youtube";

export function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }));
}

function getLinkIcon(type?: string) {
    switch (type) {
        case "video":
            return <Youtube size={20} />;
        case "blog":
            return <BookOpen size={20} />;
        default:
            return <ExternalLink size={20} />;
    }
}

function getLinkText(link: ProjectLink) {
    if (link.label) return link.label;
    switch (link.type) {
        case "video":
            return "Watch Demo";
        case "blog":
            return "Read Articles";
        default:
            return "View Live Demo";
    }
}

function ProjectHeroMedia({ media }: { media?: ProjectMedia[] }) {
    const first = media?.[0];
    if (!first) {
        return (
            <div className="aspect-video w-full bg-gradient-to-br from-gray-900 to-black rounded-2xl flex items-center justify-center text-gray-600 font-mono">
                No media
            </div>
        );
    }
    if (first.type === "youtube") {
        const id = getYoutubeVideoId(first.url);
        if (!id) return null;
        return (
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black">
                <iframe
                    src={`https://www.youtube.com/embed/${id}`}
                    title="Project demo"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                />
            </div>
        );
    }
    return (
        <div className="aspect-video w-full rounded-2xl overflow-hidden bg-gray-900 relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={first.url}
                alt="Project"
                className="w-full h-full object-cover"
            />
        </div>
    );
}

function getYoutubeFromMedia(media?: ProjectMedia[]): string | null {
    if (!media) return null;
    const youtube = media.find((m) => m.type === "youtube");
    return youtube?.url ?? null;
}

type PageProps = { params: Promise<{ slug: string }> };

export default async function ProjectDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);
    if (!project) notFound();

    const hasDemo = project.links.demo && project.links.demo !== "#";
    const youtubeFromMedia = getYoutubeFromMedia(project.media);

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
            <Navbar />
            <article className="pt-24 pb-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-secondary transition-colors mb-8"
                    >
                        <ArrowLeft size={18} /> Back to Projects
                    </Link>

                    <div className="glass-panel rounded-2xl overflow-hidden p-8 md:p-10">
                        <ProjectHeroMedia media={project.media} />

                        <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-4">
                            {project.title}
                        </h1>
                        <p className="text-gray-400 text-lg mb-8">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-4 mb-10">
                            {hasDemo && (
                                <a
                                    href={project.links.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="liquid-glass-btn-primary inline-flex items-center gap-2 px-6 py-3 font-bold"
                                >
                                    {getLinkIcon(project.links.type)} {getLinkText(project.links)}
                                </a>
                            )}
                            {!hasDemo && (
                                <span className="text-gray-500 text-sm">
                                    Demo coming soon.
                                </span>
                            )}
                            {project.links.code !== "#" && (
                                <a
                                    href={project.links.code}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="liquid-glass-btn inline-flex items-center gap-2 px-6 py-3 font-bold"
                                >
                                    <Github size={18} /> Code
                                </a>
                            )}
                        </div>

                        <section className="mb-10">
                            <h2 className="text-xl font-bold mb-3 text-secondary">
                                Why I built this
                            </h2>
                            <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                                {project.story}
                            </div>
                        </section>

                        <section className="mb-10">
                            <h2 className="text-xl font-bold mb-3 text-secondary">
                                Tech stack
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-sm font-mono bg-white/5 px-3 py-1.5 rounded-full text-[#ffd89b] border border-secondary/10"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </section>

                        {project.slug === "rentto-classifieds" && (
                            <>
                                <section className="mb-10">
                                    <h2 className="text-xl font-bold mb-3 text-secondary">
                                        UX case study
                                    </h2>
                                    <p className="text-gray-400 mb-4">
                                        Deep-dive Behance case study covering the Rentto design system, navigation flows, and mobile experience.
                                    </p>
                                    <div className="w-full flex justify-center">
                                        <div className="w-full max-w-xl">
                                            <div className="aspect-[404/316] w-full rounded-2xl overflow-hidden bg-black">
                                                <iframe
                                                    src="https://www.behance.net/embed/project/161154787?ilo0=1"
                                                    height="316"
                                                    width="404"
                                                    allowFullScreen
                                                    loading="lazy"
                                                    frameBorder="0"
                                                    allow="clipboard-write"
                                                    referrerPolicy="strict-origin-when-cross-origin"
                                                    className="w-full h-full"
                                                    title="Rentto Behance case study"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section className="mb-10">
                                    <h2 className="text-xl font-bold mb-3 text-secondary">
                                        Interactive prototype
                                    </h2>
                                    <p className="text-gray-400 mb-4">
                                        Explore the live Figma prototype for Rentto, including navigation flows and key screens.
                                    </p>
                                    <div className="w-full flex justify-center">
                                        <div className="w-full max-w-3xl">
                                            <div className="w-full rounded-2xl overflow-hidden bg-black">
                                                <iframe
                                                    style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
                                                    width="800"
                                                    height="450"
                                                    src="https://embed.figma.com/design/3rkfelwmJMZ4ZZMqSw0Lur/Rentto-Final?node-id=23-5291&embed-host=share"
                                                    allowFullScreen
                                                    loading="lazy"
                                                    className="w-full h-[450px]"
                                                    title="Rentto Figma prototype"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </>
                        )}

                        {project.slug === "wazan-watch" && (
                            <>
                                <section className="mb-10">
                                    <h2 className="text-xl font-bold mb-3 text-secondary">
                                        UX case study
                                    </h2>
                                    <p className="text-gray-400 mb-4">
                                        Behance case study showcasing the Wazan Watch design system, flows, and prototype for desi households.
                                    </p>
                                    <div className="w-full flex justify-center">
                                        <div className="w-full max-w-xl">
                                            <div className="aspect-[404/316] w-full rounded-2xl overflow-hidden bg-black">
                                                <iframe
                                                    src="https://www.behance.net/embed/project/161156759?ilo0=1"
                                                    height="316"
                                                    width="404"
                                                    allowFullScreen
                                                    loading="lazy"
                                                    frameBorder="0"
                                                    allow="clipboard-write"
                                                    referrerPolicy="strict-origin-when-cross-origin"
                                                    className="w-full h-full"
                                                    title="Wazan Watch Behance case study"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section className="mb-10">
                                    <h2 className="text-xl font-bold mb-3 text-secondary">
                                        Interactive prototype
                                    </h2>
                                    <p className="text-gray-400 mb-4">
                                        Explore the live Figma prototype for Wazan Watch, including flows for desi household calorie tracking.
                                    </p>
                                    <div className="w-full flex justify-center">
                                        <div className="w-full max-w-3xl">
                                            <div className="w-full rounded-2xl overflow-hidden bg-black">
                                                <iframe
                                                    style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
                                                    width="800"
                                                    height="450"
                                                    src="https://embed.figma.com/design/axZTeFLTlu9SPTNb5dCQnW/Hi-Fi-Prototypes?node-id=0-1&embed-host=share"
                                                    allowFullScreen
                                                    loading="lazy"
                                                    className="w-full h-[450px]"
                                                    title="Wazan Watch Figma prototype"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </>
                        )}

                        {project.slug === "ai-resume-tailor" && youtubeFromMedia && (
                            <section className="mb-10">
                                <h2 className="text-xl font-bold mb-3 text-secondary">
                                    Product demo
                                </h2>
                                <p className="text-gray-400 mb-4">
                                    Full walkthrough of how the AI Resume Tailor analyzes a job description and rewrites your CV and cover letter.
                                </p>
                                <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${getYoutubeVideoId(youtubeFromMedia) ?? ""}`}
                                        title="AI Resume Tailor demo"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full"
                                    />
                                </div>
                            </section>
                        )}

                        {project.slug === "threataware" && (
                            <section className="mb-10">
                                <h2 className="text-xl font-bold mb-3 text-secondary">
                                    UX case study
                                </h2>
                                <p className="text-gray-400 mb-4">
                                    Detailed UX and visual design exploration for the ThreatAware experience, hosted on Behance.
                                </p>
                                <div className="w-full flex justify-center">
                                    <div className="w-full max-w-xl">
                                        <div className="aspect-[404/316] w-full rounded-2xl overflow-hidden bg-black">
                                            <iframe
                                                src="https://www.behance.net/embed/project/166824941?ilo0=1"
                                                height="316"
                                                width="404"
                                                allowFullScreen
                                                loading="lazy"
                                                frameBorder="0"
                                                allow="clipboard-write"
                                                referrerPolicy="strict-origin-when-cross-origin"
                                                className="w-full h-full"
                                                title="ThreatAware Behance case study"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}

                        {project.slug === "brickpress" && (
                            <section className="mb-10">
                                <h2 className="text-xl font-bold mb-3 text-secondary">
                                    Before &amp; after
                                </h2>
                                <p className="text-gray-400 mb-4">
                                    Here&apos;s an example of how BrickPress transforms a simple snapshot into a polished Lego-style poster.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-sm font-mono text-gray-500 mb-2">
                                            Input photo
                                        </p>
                                        <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden bg-gray-900 relative">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src="/projects/brickpress/before.png"
                                                alt="Original Lego build photo used as input to BrickPress"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-mono text-gray-500 mb-2">
                                            Generated poster
                                        </p>
                                        <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden bg-gray-900 relative">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src="/projects/brickpress/after.png"
                                                alt="AI-generated Lego-style poster created by BrickPress"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}

                        <section>
                            <h2 className="text-xl font-bold mb-3 text-secondary">
                                How I built it
                            </h2>
                            <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                                {project.execution}
                            </div>
                        </section>
                    </div>
                </div>
            </article>
        </main>
    );
}
