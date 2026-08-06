"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion, revealEase } from "@/lib/gsap";

type Variant = "list" | "cards" | "grid";

type Props = {
  children: React.ReactNode;
  className?: string;
  selector?: string;
  stagger?: number;
  variant?: Variant;
};

export default function RevealStagger({
  children,
  className,
  selector = ":scope > *",
  stagger = 0.1,
  variant = "list",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      const items = gsap.utils.toArray<Element>(el.querySelectorAll(selector));
      if (!items.length) return;

      const trigger = {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      };

      if (variant === "cards") {
        const tl = gsap.timeline({ scrollTrigger: trigger });

        items.forEach((item, index) => {
          const media = item.querySelector("[data-reveal='media']");
          const body = item.querySelector("[data-reveal='body']");
          const at = index * stagger;

          if (media) {
            tl.from(
              media,
              {
                clipPath: "inset(0 100% 0 0)",
                scale: 1.08,
                duration: 0.9,
                ease: revealEase,
              },
              at,
            );
          }

          if (body) {
            tl.from(
              body,
              { opacity: 0, y: 28, duration: 0.65, ease: revealEase },
              at + 0.15,
            );
          }
        });
        return;
      }

      if (variant === "grid") {
        gsap.from(items, {
          opacity: 0,
          scale: 0.88,
          y: 36,
          duration: 0.85,
          stagger,
          ease: revealEase,
          scrollTrigger: trigger,
        });
        return;
      }

      gsap.from(items, {
        opacity: 0,
        x: -32,
        duration: 0.75,
        stagger,
        ease: revealEase,
        scrollTrigger: trigger,
      });
    },
    { scope: ref, dependencies: [selector, stagger, variant] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
