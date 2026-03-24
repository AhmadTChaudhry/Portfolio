"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type GalleryItem = {
    src: string;
    label: string;
    alt: string;
    description?: string;
};

const items: GalleryItem[] = [
    {
        src: "/projects/vantage/workflow.png",
        label: "Agent generation workflow",
        alt: "Vantage orchestration flow with extract, initiative analysis, parallel agents, merge, and response",
        description:
            "The planner pipeline parses strategy input, maps initiatives, runs specialist agents in parallel, then merges outputs into a structured architecture payload for the UI.",
    },
    {
        src: "/projects/vantage/workforce-map.png",
        label: "Workforce map",
        alt: "Vantage workforce map showing initiatives and agents grouped by execution waves",
        description:
            "The workforce map visualizes initiative-to-agent relationships across delivery waves so teams can see handoffs, dependencies, and orchestration coverage at a glance.",
    },
    {
        src: "/projects/vantage/agent-detail-panel.png",
        label: "Agent specification panel",
        alt: "Vantage side panel showing details for a selected readmission risk prediction agent",
    },
];

const PREVIEW_ZOOM_MIN = 0.5;
const PREVIEW_ZOOM_MAX = 4;
const PREVIEW_ZOOM_STEP = 0.25;
const PREVIEW_BASE_MAX_VW = 96;
const PREVIEW_BASE_MAX_DVH = 85;

type NaturalSize = { w: number; h: number };

export default function VantageGallery() {
    const [preview, setPreview] = useState<GalleryItem | null>(null);
    const [previewZoom, setPreviewZoom] = useState(1);
    const [naturalSize, setNaturalSize] = useState<NaturalSize | null>(null);
    const [viewportPx, setViewportPx] = useState(() => ({
        w: typeof window !== "undefined" ? window.innerWidth : 1200,
        h: typeof window !== "undefined" ? window.innerHeight : 800,
    }));
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const close = useCallback(() => setPreview(null), []);

    useEffect(() => {
        setPreviewZoom(1);
        setNaturalSize(null);
    }, [preview?.src]);

    useEffect(() => {
        if (!preview) return;
        const update = () => {
            const vv = window.visualViewport;
            setViewportPx({
                w: vv?.width ?? window.innerWidth,
                h: vv?.height ?? window.innerHeight,
            });
        };
        update();
        window.addEventListener("resize", update);
        window.visualViewport?.addEventListener("resize", update);
        return () => {
            window.removeEventListener("resize", update);
            window.visualViewport?.removeEventListener("resize", update);
        };
    }, [preview]);

    const zoomIn = useCallback(() => {
        setPreviewZoom((z) => Math.min(PREVIEW_ZOOM_MAX, Math.round((z + PREVIEW_ZOOM_STEP) * 100) / 100));
    }, []);

    const zoomOut = useCallback(() => {
        setPreviewZoom((z) => Math.max(PREVIEW_ZOOM_MIN, Math.round((z - PREVIEW_ZOOM_STEP) * 100) / 100));
    }, []);

    const zoomReset = useCallback(() => setPreviewZoom(1), []);

    useEffect(() => {
        if (!preview) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
            if (e.key === "+" || e.key === "=") {
                e.preventDefault();
                zoomIn();
            }
            if (e.key === "-" || e.key === "_") {
                e.preventDefault();
                zoomOut();
            }
            if (e.key === "0") {
                e.preventDefault();
                zoomReset();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [preview, close, zoomIn, zoomOut, zoomReset]);

    useEffect(() => {
        if (preview) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [preview]);

    const maxPreviewW = viewportPx.w * (PREVIEW_BASE_MAX_VW / 100);
    const maxPreviewH = viewportPx.h * (PREVIEW_BASE_MAX_DVH / 100);
    const fitScale =
        naturalSize && naturalSize.w > 0 && naturalSize.h > 0
            ? Math.min(maxPreviewW / naturalSize.w, maxPreviewH / naturalSize.h)
            : 1;
    const zoomedWidthPx =
        naturalSize && naturalSize.w > 0
            ? naturalSize.w * fitScale * previewZoom
            : undefined;

    return (
        <>
            <section className="mb-10">
                <h2 className="text-xl font-bold mb-3 text-secondary">Product gallery</h2>
                <p className="text-gray-400 mb-6">
                    Strategy-to-agent planning views and generated architecture outputs. Click any
                    image for a fullscreen preview.
                </p>
                <div className="space-y-8">
                    {items.map((item) => (
                        <div key={item.src}>
                            <p className="text-sm font-mono text-gray-500 mb-2">{item.label}</p>
                            {item.description && (
                                <p className="text-gray-400 text-sm leading-relaxed mb-3 max-w-3xl">
                                    {item.description}
                                </p>
                            )}
                            <button
                                type="button"
                                onClick={() => setPreview(item)}
                                className="w-full text-left rounded-2xl overflow-hidden bg-gray-900 border border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary cursor-zoom-in group"
                                aria-label={`Open fullscreen: ${item.label}`}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={item.src}
                                    alt={item.alt}
                                    className="w-full h-auto object-contain max-h-[520px] mx-auto transition-opacity group-hover:opacity-95"
                                />
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {mounted &&
                preview &&
                createPortal(
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label={preview.label}
                        className="fixed inset-0 z-[9999] flex h-[100dvh] max-h-[100dvh] w-full max-w-[100vw] flex-col bg-black/95"
                    >
                        <div
                            className="relative z-10 min-h-0 flex-1 overflow-auto"
                            onClick={close}
                        >
                            <div className="mx-auto flex min-h-full w-max max-w-none items-center justify-center px-2 py-3 sm:px-4 sm:py-4">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    key={preview.src}
                                    src={preview.src}
                                    alt={preview.alt}
                                    onLoad={(e) => {
                                        const el = e.currentTarget;
                                        if (el.naturalWidth > 0 && el.naturalHeight > 0) {
                                            setNaturalSize({
                                                w: el.naturalWidth,
                                                h: el.naturalHeight,
                                            });
                                        }
                                    }}
                                    style={
                                        zoomedWidthPx != null
                                            ? {
                                                  width: `${zoomedWidthPx}px`,
                                                  height: "auto",
                                              }
                                            : {
                                                  maxWidth: `${PREVIEW_BASE_MAX_VW}vw`,
                                                  maxHeight: `${PREVIEW_BASE_MAX_DVH}dvh`,
                                              }
                                    }
                                    className="block h-auto object-contain shadow-2xl sm:rounded-lg"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                        </div>
                        <div
                            className="relative z-10 flex shrink-0 flex-col items-center gap-3 border-t border-white/10 bg-black/40 px-4 py-3 backdrop-blur-sm"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex flex-wrap items-center justify-center gap-2">
                                <button
                                    type="button"
                                    className="liquid-glass-btn inline-flex h-10 min-w-10 items-center justify-center px-3 text-lg font-bold leading-none disabled:pointer-events-none disabled:opacity-40"
                                    aria-label="Zoom out"
                                    disabled={previewZoom <= PREVIEW_ZOOM_MIN}
                                    onClick={zoomOut}
                                >
                                    -
                                </button>
                                <button
                                    type="button"
                                    className="min-w-[4.5rem] rounded-full border border-white/15 bg-white/5 px-3 py-2 text-center text-xs font-mono text-gray-300 tabular-nums transition hover:bg-white/10"
                                    aria-label="Reset zoom to 100 percent"
                                    title="Reset zoom"
                                    onClick={zoomReset}
                                >
                                    {Math.round(previewZoom * 100)}%
                                </button>
                                <button
                                    type="button"
                                    className="liquid-glass-btn inline-flex h-10 min-w-10 items-center justify-center px-3 text-lg font-bold leading-none disabled:pointer-events-none disabled:opacity-40"
                                    aria-label="Zoom in"
                                    disabled={previewZoom >= PREVIEW_ZOOM_MAX}
                                    onClick={zoomIn}
                                >
                                    +
                                </button>
                            </div>
                            <button
                                type="button"
                                className="liquid-glass-btn px-6 py-2.5 text-sm font-bold uppercase tracking-widest"
                                onClick={close}
                            >
                                Close
                            </button>
                            <p className="text-center text-xs text-gray-500">
                                + / - or 0 to reset · Escape or outside to close
                            </p>
                        </div>
                    </div>,
                    document.body
                )}
        </>
    );
}
