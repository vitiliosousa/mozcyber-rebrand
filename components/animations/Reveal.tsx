"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion, revealEase } from "@/lib/gsap";

type Variant = "clip" | "slide" | "fade";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: Variant;
};

export default function Reveal({
  children,
  className,
  delay = 0,
  variant = "clip",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      const base = {
        duration: variant === "clip" ? 1 : 0.85,
        delay,
        ease: revealEase,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      };

      if (variant === "clip") {
        gsap.from(el, {
          clipPath: "inset(100% 0 0 0)",
          opacity: 0,
          ...base,
        });
        return;
      }

      if (variant === "slide") {
        gsap.from(el, {
          opacity: 0,
          x: -48,
          ...base,
        });
        return;
      }

      gsap.from(el, {
        opacity: 0,
        y: 36,
        ...base,
      });
    },
    { scope: ref, dependencies: [variant, delay] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
