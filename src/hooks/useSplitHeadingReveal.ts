import { useEffect } from "react";
import type { RefObject } from "react";

import { gsap, registerScrollTrigger } from "@/lib/gsap";

export const useSplitHeadingReveal = (
    scopeRef: RefObject<HTMLElement | null>
) => {
    useEffect(() => {
        if (!scopeRef.current) return;
        registerScrollTrigger();

        const ctx = gsap.context(() => {
            const headings = scopeRef.current?.querySelectorAll(
                "[data-split-heading]"
            );

            headings?.forEach((heading) => {
                const words = heading.querySelectorAll("[data-split-word]");
                if (!words.length) return;

                gsap.fromTo(
                    words,
                    { y: 24, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.05,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: heading,
                            start: "top 80%",
                        },
                    }
                );
            });
        }, scopeRef);

        return () => ctx.revert();
    }, [scopeRef]);
};
