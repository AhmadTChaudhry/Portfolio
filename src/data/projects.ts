export const projectCategories = [
    "Embedded Systems - Internet of Things",
    "Web Development - AI Development",
    "Software Engineering",
    "UI/UX",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type ProjectLink = {
    demo: string;
    code: string;
    type?: "video" | "blog";
    label?: string;
};

export type ProjectMedia = {
    type: "image" | "youtube";
    url: string;
};

export type Project = {
    slug: string;
    title: string;
    description: string;
    tags: string[];
    links: ProjectLink;
    category: ProjectCategory;
    media?: ProjectMedia[];
    story: string;
    execution: string;
};

export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find((p) => p.slug === slug);
}

export function getProjectThumbnailSrc(project: Project): string | null {
    const first = project.media?.[0];
    if (!first) return null;
    if (first.type === "image") return first.url;
    if (first.type === "youtube") {
        try {
            const u = new URL(first.url);
            if (u.hostname.includes("youtube.com") && u.searchParams.has("v")) {
                const id = u.searchParams.get("v");
                return id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : null;
            }
            if (u.hostname === "youtu.be") {
                const id = u.pathname.slice(1).split("/")[0];
                return id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : null;
            }
        } catch {
            return null;
        }
    }
    return null;
}

export const projects: Project[] = [
    {
        slug: "lora-encrypted-comms",
        title: "Encrypted Off-Grid Communications (LoRa)",
        description:
            "ESP32 LoRa nodes with encrypted payloads, ACK/retry delivery, OLED status, and a browser chat UI served from the device over WiFi and WebSockets.",
        tags: [
            "C/C++",
            "ESP32",
            "LoRa",
            "SX1262",
            "PlatformIO",
            "WebSockets",
            "RadioLib",
        ],
        links: {
            demo: "https://youtu.be/B4Z7MDHfVqc",
            code: "https://github.com/AhmadTChaudhry/OffGrid-LoRa-Communication",
            type: "video",
        },
        category: "Embedded Systems - Internet of Things",
        media: [{ type: "youtube", url: "https://www.youtube.com/watch?v=B4Z7MDHfVqc" }],
        story:
            "I wrote the firmware and software for the LoRa nodes and the embedded web server chat application myself, designed the hardware, assembled the boards, and 3D-printed casings for each node.\n\nOff-grid situations still need trustworthy comms when cellular or the internet is missing, unreliable, or not appropriate: remote sites, crowded events, disaster response, or small teams that want private radio-backed messaging without infrastructure. LoRa is a strong fit for low-power, long-range links, so I built a complete prototype that pairs robust radio behavior with a familiar chat experience in the browser.",
        execution:
            "Overview\n\nEach node runs modular C++ firmware (PlatformIO) on ESP32-class hardware with an SX1262 LoRa transceiver. The device brings up a WiFi access point, serves a responsive web UI over HTTP, and uses WebSockets for real-time chat and delivery status. Payloads are encrypted before they go over LoRa; an acknowledgment and retry path reports success, failure after retries, or pending state back to the UI. A small OLED shows AP SSID/password, assigned IP, connected WiFi clients, and snippets of recent LoRa TX/RX so you can operate without a phone at a glance. A GPIO button can fire a predefined \"alive\" ping across the link.\n\nHardware layout, tested boards, components per node, and LoRa/WebSocket framing (with diagrams) are documented in the Hardware architecture and Communication protocols sections below.\n\nSoftware architecture\n\nThe codebase splits into managers: lora_manager configures the radio via RadioLib, formats packets, handles interrupt-driven reception, maintains an outgoing queue, and drives ACK timeouts/retries; web_manager hosts AsyncWebServer on port 80, serves the chat page, and manages JSON over WebSocket at /ws; display_manager drives U8g2 with states for boot, AP details, IP ready, chat context, and RX alerts; encryption helpers XOR-encrypt message bodies and represent ciphertext as HEX on the wire. ArduinoJson serializes WebSocket messages. WiFi stack and async web work sit on FreeRTOS alongside a lean Arduino loop, with LoRa events surfaced from ISR context safely.",
    },
    {
        slug: "minutely",
        title: "Minutely – Smart Meeting Debrief",
        description:
            "Meeting debrief workspace: paste a transcript and get an executive summary, owned action items with deadlines and priorities, and a structured view of risks and blockers, plus Kanban and markdown export.",
        tags: ["Next.js", "n8n", "Gemini", "AI", "App Router", "TypeScript"],
        links: {
            demo: "https://minutely-six.vercel.app",
            code: "#",
            label: "Visit project",
        },
        category: "Web Development - AI Development",
        story:
            "After messy meetings, the hard part is not the conversation; it is turning it into something teams can execute. I built Minutely so a raw transcript becomes leadership-ready output without manual note cleanup.",
        execution:
            "Minutely is a meeting debrief workspace: you give it a transcript, and it turns the conversation into something you can act on: executive summary, owned action items with deadlines and priorities, and a structured view of risks and blockers.\n\nThe interface is built for scanning and sharing: tables with clear badges, optional markdown export, and a Kanban-style board so the same debrief can be viewed as columns (summary, actions by priority, risks).\n\nBehind the scenes, the Next.js app does not run the models itself. It orchestrates the UI and proxies requests to an n8n webhook. The n8n workflow runs three Gemini agents in parallel (actions, risks, and summary), then merges the outputs into JSON for the frontend. Configuration uses N8N_WEBHOOK_URL in .env.local pointing at your n8n webhook.\n\nStack: Next.js (App Router) for the UI and an API route that forwards transcripts to n8n; n8n for multi-agent orchestration and Gemini calls.",
        media: [
            { type: "image", url: "/projects/minutely/hero.png" },
            { type: "image", url: "/projects/minutely/n8n-workflow.png" },
            { type: "image", url: "/projects/minutely/summary-actions.png" },
            { type: "image", url: "/projects/minutely/risks.png" },
            { type: "image", url: "/projects/minutely/kanban.png" },
        ],
    },
    {
        slug: "vantage-agent-architect",
        title: "Vantage - AI Agent Architect",
        description:
            "Strategy-to-agent architecture workspace that turns planning inputs into initiatives, role-based agents, and relationship maps with export-ready structured output.",
        tags: ["Next.js", "n8n", "Gemini", "AI Agents", "TypeScript", "Architecture Mapping"],
        links: {
            demo: "#",
            code: "#",
            label: "Visit project",
        },
        category: "Web Development - AI Development",
        story:
            "Teams can have strong strategy documents but still struggle to operationalize them into clear AI agent roles with ownership, wave planning, and handoffs. I built Vantage to bridge that gap: it converts strategy input into a workforce-style agent architecture that leaders and delivery teams can actually execute.",
        execution:
            "Vantage is an AI Agent Architect workspace focused on moving from planning to implementation-ready structures.\n\nYou start with strategic input, and the system produces initiatives, specialized agents, and explicit relationships (handoffs, triggers, oversight, and data-sharing links). The result is a structured architecture view that can be scanned visually and exported.\n\nThe interface is built around architecture clarity: a workforce map by execution wave, agent catalogue cards with augments/tools, and a detail panel for deep inspection of selected agents.\n\nUnder the hood, orchestration follows a multi-agent flow similar to production planning pipelines: extraction and initiative analysis feed specialist agent-generation steps, outputs are merged, then assembled for client consumption.",
        media: [
            { type: "image", url: "/projects/vantage/hero.png" },
            { type: "image", url: "/projects/vantage/workflow.png" },
            { type: "image", url: "/projects/vantage/workforce-map.png" },
            { type: "image", url: "/projects/vantage/agent-detail-panel.png" },
            { type: "image", url: "/projects/vantage/agents-view.png" },
        ],
    },
    {
        slug: "ai-resume-tailor",
        title: "AI Resume Tailor",
        description:
            "An AI tool that takes a role description and modifies your CV to match it, creating a Cover Letter. Powered by the Gemini API with Supabase on the backend.",
        tags: ["AI", "Gemini API", "Supabase", "React"],
        links: {
            demo: "https://resume-tailor-eosin.vercel.app",
            code: "#",
            label: "Visit project",
        },
        category: "Web Development - AI Development",
        media: [
            { type: "image", url: "/projects/ai-resume-tailor/hero.png" },
            { type: "youtube", url: "https://www.youtube.com/watch?v=JMBqw2SkuRw" },
        ],
        story:
            "Job applications often require tailoring your resume and cover letter to each role. I built this to automate that process using AI while keeping the output coherent and role-specific.",
        execution:
            "Used Supabase for authentication and persistence, with the Gemini API behind Edge Functions for serverless inference. Designed a structured system prompt to take a role description and user CV, then generate a tailored resume and cover letter. React front-end for upload and display.",
    },
    {
        slug: "brickpress",
        title: "BrickPress – AI Lego Poster Generator",
        description:
            "Turn any Lego creation into a professional poster and logo using AI, then order high-quality posters or sticker packs shipped to your door.",
        tags: ["Node.js", "Next.js", "Convex", "Nano Banana 2", "AI", "Tailwind CSS"],
        links: { demo: "https://brick-press.vercel.app", code: "#" },
        category: "Web Development - AI Development",
        story:
            "I wanted to make it effortless for Lego enthusiasts to showcase their builds like real products. Instead of photos just living on a phone, BrickPress turns them into polished posters and branding that feel like official sets.",
        execution:
            "Built a full-stack web app with a Node.js/Next.js frontend and Convex on the backend for data and workflows. Integrated Google's Nano Banana 2 model to generate themed posters and custom logos from uploaded photos and selected themes. Users can preview the designs and then order printed posters or sticker packs delivered to their homes.\n\nFor example, a phone snapshot of a Lego supercar is transformed into a cinematic poster with motion blur, lighting, and branded typography, then surfaced in a gallery of recent creations.",
        media: [
            { type: "image", url: "/projects/brickpress/gallery.png" },
        ],
    },
    {
        slug: "nocodejam",
        title: "NoCodeJam – VibeCoding Hackathon Platform",
        description:
            "A platform built for VibeCoding challenges, demonstrating rapid product development. Implemented back-end architecture on Supabase with secure RBAC and Row Level Security Policies. Front-end built using NodeJS, Tailwind CSS and Shadcn.",
        tags: ["Node.js", "Tailwind CSS", "Supabase", "Shadcn"],
        links: { demo: "https://nocodejam2.vercel.app/", code: "#" },
        category: "Web Development - AI Development",
        story:
            "I wanted to create a dedicated space for VibeCoding challenges where participants could ship quickly and showcase rapid product development. The hackathon format demanded a platform that was both flexible and secure.",
        execution:
            "Designed the back-end on Supabase with role-based access control and Row Level Security. Built the front-end with Node.js, Tailwind CSS, and Shadcn for a consistent, accessible UI. Deployed on Vercel for fast global delivery.",
        media: [{ type: "image", url: "/projects/nocodejam/hero.png" }],
    },
    {
        slug: "threataware",
        title: "ThreatAware – ML Intrusion Detection",
        description:
            "Smart Intrusion Detection using ML. Implemented Machine Learning to Detect Intruders and Register Friends through Pattern Mining Algorithms. Developed Firebase Implementation and Cross Platform Application using Flutter.",
        tags: ["Flutter", "Firebase", "Machine Learning", "Dart"],
        links: { demo: "#", code: "#" },
        category: "Software Engineering",
        story:
            "I wanted to explore how ML could distinguish between known residents and unknown visitors using pattern mining, turning a standard camera feed into a simple intrusion-awareness system.",
        execution:
            "Applied pattern mining and ML to classify faces/patterns, integrated with Firebase for auth and data. Built a cross-platform app in Flutter (Dart) so the same logic could run on mobile and desktop.",
        media: [{ type: "image", url: "/projects/threataware/hero.png" }],
    },
    {
        slug: "kubernetes-blog",
        title: "Technical Blog",
        description:
            "A collection of technical articles and insights on Kubernetes architecture, deployment strategies, and best practices.",
        tags: ["Kubernetes", "Technical Writing", "DevOps"],
        links: { demo: "https://medium.com/@ahmadtc17", code: "#", type: "blog" },
        category: "Software Engineering",
        story:
            "I started writing these articles to solidify my own understanding of Kubernetes and to share practical patterns and lessons with others learning DevOps and cloud-native systems.",
        execution:
            "Wrote and published articles on Medium covering architecture, deployment strategies, and operational best practices. Focused on clarity and real-world applicability.",
        media: [{ type: "image", url: "/projects/kubernetes-blog/hero.png" }],
    },
    {
        slug: "rentto-classifieds",
        title: "Rentto – Classified Ads",
        description:
            "Classified ads application for renting residential properties, designed end-to-end as a mobile-first experience.",
        tags: ["UI/UX", "Figma", "Design System", "Prototyping"],
        links: {
            demo: "https://www.behance.net/gallery/161154787/Rental-Mobile-Application",
            code: "#",
            type: "blog",
            label: "Visit project",
        },
        category: "UI/UX",
        story:
            "Finding and listing rental properties often feels fragmented across multiple apps and informal channels. I wanted to explore a focused, mobile-first experience that streamlines how renters discover places and how owners publish listings.",
        execution:
            "Designed a complete design system in Figma for Rentto, including typography, color tokens, components, and interaction states. Created all graphical assets and iconography from scratch. Mapped out the end-to-end navigation flow from onboarding, search, and filters through to listing details and messaging. Built a fully interactive prototype covering key user journeys, and produced both light and dark mode variants to support different viewing contexts.",
        media: [{ type: "image", url: "/projects/rentto/hero.png" }],
    },
    {
        slug: "wazan-watch",
        title: "Wazan Watch – Weight Watcher",
        description:
            "Calorie counter tailored for desi households, with flows designed around South Asian meals and eating patterns.",
        tags: ["UI/UX", "Figma", "Mobile", "Health"],
        links: {
            demo: "https://www.behance.net/gallery/161156759/Weight-Watching-Mobile-App",
            code: "#",
            type: "blog",
            label: "Visit project",
        },
        category: "UI/UX",
        story:
            "Most calorie-tracking apps are built around Western food databases and portion assumptions, which makes them hard to use in desi households. I wanted to design an experience that speaks the same language as the food people actually eat at home.",
        execution:
            "Created a full design system in Figma for Wazan Watch, including logo, color palette, typography, and reusable components. Designed all graphical assets and screen visuals. Defined navigation flows for logging meals, tracking progress, and discovering high-calorie dishes specific to South Asian cuisine. Built a fully functional prototype that stitches these flows together, making it easy to explore the experience from onboarding to daily tracking.",
        media: [{ type: "image", url: "/projects/wazan-watch/hero.png" }],
    },
];
