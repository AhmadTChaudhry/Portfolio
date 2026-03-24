import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, Github, Youtube, BookOpen, ArrowLeft } from "lucide-react";
import Navbar from "@/components/navbar";
import { getProjectBySlug, projects } from "@/data/projects";
import type { ProjectMedia, ProjectLink } from "@/data/projects";
import { getYoutubeVideoId } from "@/lib/youtube";
import MinutelyGallery from "@/components/minutely-gallery";
import VantageGallery from "@/components/vantage-gallery";

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
    /* object-contain + no fixed 16:9: wide heroes (e.g. Minutely) stay fully visible like listing cards */
    return (
        <div className="flex w-full items-center justify-center rounded-2xl bg-gray-900 px-2 py-4 sm:px-4 sm:py-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={first.url}
                alt="Project hero screenshot"
                className="mx-auto block h-auto w-full max-h-[min(72vh,720px)] object-contain"
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

                        <section className="mb-10">
                            <h2 className="text-xl font-bold mb-3 text-secondary">
                                How I built it
                            </h2>
                            <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                                {project.execution}
                            </div>
                        </section>

                        {project.slug === "lora-encrypted-comms" && (
                            <>
                                <section className="mb-10">
                                    <h2 className="text-xl font-bold mb-3 text-secondary">
                                        Hardware architecture
                                    </h2>
                                    <figure className="mb-8 rounded-2xl overflow-hidden bg-white p-4 sm:p-6 border border-white/10">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src="/projects/lora-encrypted-comms/node-configuration.png"
                                            alt="Node configuration diagram: ESP32 connected to OLED, SX1262 LoRa transceiver, and LiPo battery"
                                            className="mx-auto w-full max-w-2xl h-auto object-contain"
                                        />
                                        <figcaption className="mt-3 text-center text-sm text-gray-500">
                                            Node configuration
                                        </figcaption>
                                    </figure>
                                    <p className="text-gray-300 leading-relaxed mb-6">
                                        The system is designed primarily for ESP32-based boards with integrated LoRa
                                        transceivers and OLED displays but will work with any ESP32 board connected
                                        with an SX1262 LoRa module over SPI and an OLED display over I2C.
                                    </p>
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-3">
                                        Tested boards
                                    </h3>
                                    <ul className="list-disc pl-5 space-y-2 text-gray-300 mb-6">
                                        <li>
                                            Heltec WiFi LoRa 32 V3 (ESP32-S3, SX1262 LoRa, 0.96&quot; OLED)
                                        </li>
                                        <li>
                                            Seeed Studio XIAO ESP32S3 with WIO SX1262 LoRa module attachment (will
                                            require an external OLED over I2C for full functionality)
                                        </li>
                                    </ul>
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-3">
                                        Components per node
                                    </h3>
                                    <ul className="list-disc pl-5 space-y-2 text-gray-300">
                                        <li>ESP32 microcontroller</li>
                                        <li>SX1262 LoRa transceiver</li>
                                        <li>OLED display (SSD1306/SH1106)</li>
                                        <li>WiFi antenna</li>
                                        <li>LoRa antenna</li>
                                        <li>Input button (typically GPIO 0 on ESP32 dev boards)</li>
                                    </ul>
                                </section>

                                <section className="mb-10">
                                    <h2 className="text-xl font-bold mb-3 text-secondary">
                                        Communication protocols
                                    </h2>
                                    <figure className="mb-8 rounded-2xl overflow-hidden bg-gray-950 p-4 sm:p-6 border border-white/10">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src="/projects/lora-encrypted-comms/communication-cycle.png"
                                            alt="Communication cycle diagram: LoRa data packet from node 1 to node 2 and ACK packet back, showing packet structure"
                                            className="mx-auto w-full h-auto object-contain"
                                        />
                                        <figcaption className="mt-3 text-center text-sm text-gray-500">
                                            LoRa communication cycle (data and ACK)
                                        </figcaption>
                                    </figure>
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-3">LoRa protocol</h3>
                                    <ul className="space-y-4 text-gray-300 mb-6">
                                        <li>
                                            <span className="font-semibold text-gray-200">Data packet: </span>
                                            <code className="text-[#ffd89b] text-sm break-all">
                                                MY_DEVICE_ID:LORA_PACKET_PREFIX:currentLoRaMessageId:ENCRYPTED_MESSAGE
                                            </code>
                                            <p className="mt-2 text-gray-400 text-sm">
                                                Example:{" "}
                                                <code className="text-gray-300">
                                                    BigNode:P:123:AABBCCDD
                                                </code>{" "}
                                                (where{" "}
                                                <code className="text-gray-300">AABBCCDD</code> is the HEX of XOR-encrypted
                                                &quot;hello&quot;)
                                            </p>
                                        </li>
                                        <li>
                                            <span className="font-semibold text-gray-200">ACK packet: </span>
                                            <code className="text-[#ffd89b] text-sm break-all">
                                                MY_DEVICE_ID:LORA_ACK_PREFIX:receivedMessageId
                                            </code>
                                            <p className="mt-2 text-gray-400 text-sm">
                                                Example:{" "}
                                                <code className="text-gray-300">PhoneNode:A:123</code>
                                            </p>
                                        </li>
                                        <li>
                                            Configured for{" "}
                                            <strong className="text-gray-200">915 MHz</strong>,{" "}
                                            <strong className="text-gray-200">SF7</strong>,{" "}
                                            <strong className="text-gray-200">125 kHz</strong> bandwidth (legal configuration
                                            for Australia).
                                        </li>
                                    </ul>

                                    <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-3">WiFi / web protocol</h3>
                                    <ul className="list-disc pl-5 space-y-2 text-gray-300 mb-4">
                                        <li>
                                            <strong className="text-gray-200">HTTP:</strong> serves the main HTML page.
                                        </li>
                                        <li>
                                            <strong className="text-gray-200">WebSocket (JSON):</strong>
                                        </li>
                                    </ul>
                                    <div className="space-y-4 mb-6">
                                        <div>
                                            <p className="text-sm font-mono text-gray-500 mb-1">
                                                Client to server (sending message)
                                            </p>
                                            <pre className="text-sm font-mono bg-black/40 text-gray-300 p-4 rounded-xl overflow-x-auto border border-white/10 whitespace-pre-wrap break-all">
                                                {`{"text": "message_content", "local_id": "local_msg_123"}`}
                                            </pre>
                                        </div>
                                        <div>
                                            <p className="text-sm font-mono text-gray-500 mb-1">
                                                Server to client (identity)
                                            </p>
                                            <pre className="text-sm font-mono bg-black/40 text-gray-300 p-4 rounded-xl overflow-x-auto border border-white/10 whitespace-pre-wrap break-all">
                                                {`{"type": "system", "event": "identity", "deviceId": "BigNode", "boardName": "BigNode"}`}
                                            </pre>
                                        </div>
                                        <div>
                                            <p className="text-sm font-mono text-gray-500 mb-1">
                                                Server to client (received message)
                                            </p>
                                            <pre className="text-sm font-mono bg-black/40 text-gray-300 p-4 rounded-xl overflow-x-auto border border-white/10 whitespace-pre-wrap break-all">
                                                {`{"sender": "PhoneNode", "text": "decrypted_message"}`}
                                            </pre>
                                        </div>
                                        <div>
                                            <p className="text-sm font-mono text-gray-500 mb-1">
                                                Server to client (ACK status)
                                            </p>
                                            <pre className="text-sm font-mono bg-black/40 text-gray-300 p-4 rounded-xl overflow-x-auto border border-white/10 whitespace-pre-wrap break-all">
                                                {`{"type": "ack_status", "local_id": "local_msg_123", "lora_msg_id": 456, "status": "acked" | "failed_ack" | "pending_ack"}`}
                                            </pre>
                                        </div>
                                    </div>
                                </section>
                            </>
                        )}

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

                        {project.slug === "minutely" && <MinutelyGallery />}
                        {project.slug === "vantage-agent-architect" && <VantageGallery />}

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
                    </div>
                </div>
            </article>
        </main>
    );
}
