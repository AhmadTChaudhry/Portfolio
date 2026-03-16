import { useEffect, useRef } from "react";

import { gsap } from "@/lib/gsap";

type MagneticOptions = {
    strength?: number;
};

export const useMagnetic = <T extends HTMLElement>(
    options: MagneticOptions = {}
) => {
    const strength = options.strength ?? 0.35;
    const ref = useRef<T | null>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleMove = (event: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const x = event.clientX - rect.left - rect.width / 2;
            const y = event.clientY - rect.top - rect.height / 2;

            gsap.to(element, {
                x: x * strength,
                y: y * strength,
                duration: 0.2,
                ease: "power2.out",
            });
        };

        const handleLeave = () => {
            gsap.to(element, {
                x: 0,
                y: 0,
                duration: 0.3,
                ease: "power3.out",
            });
        };

        element.addEventListener("mousemove", handleMove);
        element.addEventListener("mouseleave", handleLeave);

        return () => {
            element.removeEventListener("mousemove", handleMove);
            element.removeEventListener("mouseleave", handleLeave);
        };
    }, [strength]);

    return ref;
};
