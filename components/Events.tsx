"use client";

import Reveal from "@/components/animations/Reveal";
import { events } from "@/data/events";
import { gsap, prefersReducedMotion, revealEase } from "@/lib/gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const AUTO_MS = 5000;

export default function Events() {
  const preview = events.slice(0, 3);
  const [index, setIndex] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const event = preview[index];

  function go(direction: 1 | -1) {
    const next =
      (index + direction + preview.length) % preview.length;

    if (prefersReducedMotion() || !slideRef.current) {
      setIndex(next);
      return;
    }

    const el = slideRef.current;
    gsap.to(el, {
      opacity: 0,
      x: direction * 40,
      duration: 0.28,
      ease: "power2.in",
      onComplete: () => {
        setIndex(next);
        gsap.fromTo(
          el,
          { opacity: 0, x: direction * -40 },
          { opacity: 1, x: 0, duration: 0.4, ease: revealEase },
        );
      },
    });
  }

  useEffect(() => {
    if (prefersReducedMotion() || preview.length < 2) return;
    const id = setInterval(() => go(1), AUTO_MS);
    return () => clearInterval(id);
  }, [index]);

  return (
    <section id="eventos" className="bg-[#0b0f14] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-moz-teal">
            Agenda
          </p>
          <h2 className="mt-4 text-3xl leading-tight md:text-5xl">
            Próximos{" "}
            <span className="font-black text-moz-teal">eventos</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-moz-muted">
            Workshops, hackathons, CTFs e palestras de literacia digital para
            fortalecer a comunidade de cibersegurança em Moçambique.
          </p>
        </Reveal>

        <div className="mt-12 md:mt-16">
          <div ref={slideRef}>
            <Link href={event.pageUrl} className="group block">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.alt}
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0b0f14] via-[#0b0f14]/50 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                    <span className="font-semibold uppercase tracking-[0.2em] text-moz-teal">
                      {event.type}
                    </span>
                    <time className="text-white/70">{event.date}</time>
                  </div>
                  <h3 className="mt-3 max-w-3xl text-2xl leading-snug md:text-4xl">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/70 md:text-base">
                    {event.place}
                  </p>
                  <p className="mt-3 hidden max-w-2xl text-sm leading-relaxed text-white/55 md:block">
                    {event.desc}
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4">
            <p className="text-sm text-white/40">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(preview.length).padStart(2, "0")}
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Evento anterior"
                className="flex size-11 items-center justify-center rounded-lg border border-white/20 text-white transition-colors hover:border-moz-teal hover:text-moz-teal"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Próximo evento"
                className="flex size-11 items-center justify-center rounded-lg border border-white/20 text-white transition-colors hover:border-moz-teal hover:text-moz-teal"
              >
                →
              </button>
            </div>
          </div>
        </div>

        <Reveal className="mt-10" variant="fade">
          <Link
            href="/eventos"
            className="inline-flex text-sm font-semibold text-moz-teal transition-colors hover:text-white"
          >
            Ver todos os eventos →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
