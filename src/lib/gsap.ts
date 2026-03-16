import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let scrollTriggerRegistered = false;

export const registerScrollTrigger = () => {
    if (scrollTriggerRegistered || typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    scrollTriggerRegistered = true;
};

export { gsap, ScrollTrigger };
