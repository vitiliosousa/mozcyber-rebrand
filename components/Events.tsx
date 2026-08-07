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
    const next = (index + direction + preview.length) % preview.length;

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
    <section
      id="eventos"
      className="flex min-h-dvh flex-col justify-center bg-[#0b0f14] py-12 md:min-h-screen md:py-0"
    >
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-moz-teal">
              Agenda
            </p>
            <h2 className="mt-2 text-2xl leading-tight md:text-4xl">
              Próximos{" "}
              <span className="font-black text-moz-teal">eventos</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-moz-muted">
              Workshops, hackathons, CTFs e palestras de literacia digital.
            </p>
          </Reveal>
          <Reveal variant="fade">
            <Link
              href="/eventos"
              className="inline-flex text-sm font-semibold text-moz-teal transition-colors hover:text-white"
            >
              Ver todos →
            </Link>
          </Reveal>
        </div>

        {/* Desktop: 3 cards a ocupar a largura */}
        <div className="mt-8 hidden gap-4 md:mt-10 md:grid md:grid-cols-3">
          {preview.map((item) => (
            <Link
              key={item.pageUrl}
              href={item.pageUrl}
              className="group flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-white/5">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 1280px) 33vw, 400px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                <span className="font-semibold uppercase tracking-[0.2em] text-moz-teal">
                  {item.type}
                </span>
                <time className="text-white/55">{item.date}</time>
              </div>
              <h3 className="mt-1.5 text-lg leading-snug transition-colors group-hover:text-moz-teal">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-white/50">{item.place}</p>
            </Link>
          ))}
        </div>

        {/* Mobile: carrossel */}
        <div className="mt-8 md:hidden">
          <div ref={slideRef}>
            <Link href={event.pageUrl} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.alt}
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0b0f14] via-[#0b0f14]/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                    <span className="font-semibold uppercase tracking-[0.2em] text-moz-teal">
                      {event.type}
                    </span>
                    <time className="text-white/70">{event.date}</time>
                  </div>
                  <h3 className="mt-2 text-xl leading-snug">{event.title}</h3>
                  <p className="mt-1 text-sm text-white/70">{event.place}</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <p className="text-sm text-white/40">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(preview.length).padStart(2, "0")}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Evento anterior"
                className="flex size-9 items-center justify-center rounded-lg border border-white/20 text-white transition-colors hover:border-moz-teal hover:text-moz-teal"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Próximo evento"
                className="flex size-9 items-center justify-center rounded-lg border border-white/20 text-white transition-colors hover:border-moz-teal hover:text-moz-teal"
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
