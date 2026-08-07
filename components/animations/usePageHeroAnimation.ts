"use client";

import { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion, revealEase } from "@/lib/gsap";

export function usePageHeroAnimation(
  scope: RefObject<HTMLElement | null>,
  withExtra = false,
) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const tl = gsap.timeline({ defaults: { ease: revealEase } });

      tl.from("[data-page='eyebrow']", {
        opacity: 0,
        y: 16,
        duration: 0.6,
      })
        .from(
          "[data-page='line-inner']",
          { yPercent: 110, duration: 0.85, stagger: 0.12 },
          "-=0.25",
        )
        .from(
          "[data-page='accent']",
          {
            opacity: 0,
            scale: 0.88,
            filter: "blur(6px)",
            duration: 0.75,
          },
          "-=0.5",
        )
        .from(
          "[data-page='rule']",
          {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.65,
          },
          "-=0.4",
        )
        .from(
          "[data-page='desc']",
          { opacity: 0, y: 24, duration: 0.7 },
          "-=0.35",
        );

      if (withExtra) {
        tl.from(
          "[data-page='photo']",
          {
            clipPath: "inset(100% 0 0 0)",
            scale: 1.06,
            duration: 0.85,
            stagger: 0.1,
          },
          "-=0.2",
        );
      }
    },
    { scope, dependencies: [withExtra] },
  );
}
