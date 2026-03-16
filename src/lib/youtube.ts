export function getYoutubeVideoId(url: string): string | null {
    try {
        const u = new URL(url);
        if (u.hostname.includes("youtube.com") && u.searchParams.has("v")) {
            return u.searchParams.get("v");
        }
        if (u.hostname === "youtu.be") {
            return u.pathname.slice(1).split("/")[0] || null;
        }
    } catch {
        return null;
    }
    return null;
}

export function getYoutubeThumbnailUrl(url: string, quality: "maxresdefault" | "mqdefault" = "mqdefault"): string | null {
    const id = getYoutubeVideoId(url);
    if (!id) return null;
    return `https://img.youtube.com/vi/${id}/${quality}.jpg`;
}
