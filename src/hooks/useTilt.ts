import { useEffect, useRef } from "react";

import { gsap } from "@/lib/gsap";

type TiltOptions = {
    maxTilt?: number;
    perspective?: number;
};

export const useTilt = <T extends HTMLElement>(
    options: TiltOptions = {}
) => {
    const maxTilt = options.maxTilt ?? 8;
    const perspective = options.perspective ?? 800;
    const ref = useRef<T | null>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleMove = (event: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const rotateY = ((x / rect.width) * 2 - 1) * maxTilt;
            const rotateX = ((y / rect.height) * -2 + 1) * maxTilt;

            gsap.to(element, {
                rotateX,
                rotateY,
                transformPerspective: perspective,
                transformOrigin: "center",
                duration: 0.2,
                ease: "power2.out",
            });
        };

        const handleLeave = () => {
            gsap.to(element, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.4,
                ease: "power3.out",
            });
        };

        element.addEventListener("mousemove", handleMove);
        element.addEventListener("mouseleave", handleLeave);

        return () => {
            element.removeEventListener("mousemove", handleMove);
            element.removeEventListener("mouseleave", handleLeave);
        };
    }, [maxTilt, perspective]);

    return ref;
};
