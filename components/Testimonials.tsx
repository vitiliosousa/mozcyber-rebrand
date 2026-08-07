"use client";

import Reveal from "@/components/animations/Reveal";
import { testimonials } from "@/data/testemonials";
import { gsap, prefersReducedMotion, revealEase } from "@/lib/gsap";
import { useEffect, useRef, useState } from "react";

const AUTO_MS = 5000;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const item = testimonials[index];

  function go(direction: 1 | -1) {
    const next =
      (index + direction + testimonials.length) % testimonials.length;

    if (prefersReducedMotion() || !slideRef.current) {
      setIndex(next);
      return;
    }

    const el = slideRef.current;
    gsap.to(el, {
      opacity: 0,
      x: direction * 36,
      duration: 0.28,
      ease: "power2.in",
      onComplete: () => {
        setIndex(next);
        gsap.fromTo(
          el,
          { opacity: 0, x: direction * -36 },
          { opacity: 1, x: 0, duration: 0.4, ease: revealEase },
        );
      },
    });
  }

  useEffect(() => {
    if (prefersReducedMotion() || testimonials.length < 2) return;
    const id = setInterval(() => go(1), AUTO_MS);
    return () => clearInterval(id);
  }, [index]);

  return (
    <section id="testemunhos" className="bg-[#0b0f14] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-moz-teal">
            Comunidade
          </p>
          <h2 className="mt-4 text-3xl leading-tight md:text-5xl">
            O que dizem{" "}
            <span className="font-black text-moz-teal">sobre nós</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-moz-muted">
            Vozes de quem já participou nos workshops, CTFs e palestras da
            Mozcyber.
          </p>
        </Reveal>

        <div className="mt-12 border-t border-white/15 pt-10 md:mt-16 md:pt-14">
          <div ref={slideRef} className="max-w-4xl">
            <blockquote className="text-2xl leading-relaxed text-white md:leading-snug">
              “{item.quote}”
            </blockquote>
            <footer className="mt-10">
              <p className="text-lg text-moz-teal">{item.name}</p>
              <p className="mt-1 text-sm text-moz-muted">{item.designation}</p>
            </footer>
          </div>

          <div className="mt-10 flex items-center justify-between gap-4">
            <p className="text-sm text-white/40">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(testimonials.length).padStart(2, "0")}
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Depoimento anterior"
                className="flex size-11 items-center justify-center rounded-lg border border-white/20 text-white transition-colors hover:border-moz-teal hover:text-moz-teal"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Próximo depoimento"
                className="flex size-11 items-center justify-center rounded-lg border border-white/20 text-white transition-colors hover:border-moz-teal hover:text-moz-teal"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
