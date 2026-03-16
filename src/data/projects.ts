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
            "Engineered a custom firmware solution using C/C++ on ESP32 microcontrollers. Integrated LoRa radio modules for long-range wireless communication without cellular reliance and developed a custom encryption hash function.",
        tags: ["C/C++", "ESP32", "LoRa", "Embedded Systems"],
        links: { demo: "https://youtu.be/B4Z7MDHfVqc", code: "#", type: "video" },
        category: "Embedded Systems - Internet of Things",
        media: [{ type: "youtube", url: "https://www.youtube.com/watch?v=B4Z7MDHfVqc" }],
        story:
            "I was interested in off-grid, long-range communication that doesn't depend on cellular or Wi-Fi. LoRa's low-power, long-range characteristics made it ideal for building a secure messaging system that works in the field.",
        execution:
            "Wrote custom firmware in C/C++ for ESP32, integrated LoRa radio modules, and implemented a custom encryption scheme. Focused on range, power efficiency, and ensuring only intended receivers could read the payloads.",
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
        title: "ThreatAware",
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
