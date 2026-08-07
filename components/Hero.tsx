"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion, revealEase } from "@/lib/gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const tl = gsap.timeline({ defaults: { ease: revealEase } });

      tl.from("[data-hero='bg']", {
        scale: 1.14,
        duration: 1.6,
        ease: "power2.out",
      })
        .from(
          "[data-hero='grid']",
          { opacity: 0, duration: 1.2 },
          "-=1.1",
        )
        .from(
          "[data-hero='line-inner']",
          { yPercent: 110, duration: 0.95, stagger: 0.14 },
          "-=0.7",
        )
        .from(
          "[data-hero='accent']",
          {
            opacity: 0,
            scale: 0.82,
            filter: "blur(8px)",
            duration: 0.85,
          },
          "-=0.55",
        )
        .from(
          "[data-hero='rule']",
          { scaleX: 0, transformOrigin: "left center", duration: 0.7 },
          "-=0.5",
        )
        .from(
          "[data-hero='desc']",
          { opacity: 0, y: 28, duration: 0.75 },
          "-=0.35",
        )
        .from(
          "[data-hero='cta']",
          { opacity: 0, y: 20, scale: 0.94, duration: 0.6, stagger: 0.1 },
          "-=0.4",
        );

      gsap.to("[data-hero='bg']", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to("[data-hero='grid']", {
        x: 48,
        y: 48,
        duration: 18,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 text-center md:px-10"
    >
      <div data-hero="bg" className="absolute inset-0 -z-10 will-change-transform">
        <Image
          src="/Background.png"
          alt=""
          fill
          quality={75}
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#0b0f14]/75" />
        <div
          data-hero="grid"
          className="hero-grid absolute inset-0 opacity-60"
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#0b0f14]" />
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
        <h1 className="max-w-4xl text-3xl leading-[1.15] md:text-5xl lg:text-6xl">
          <span data-hero="line" className="block overflow-hidden">
            <span data-hero="line-inner" className="block">
              Segurança
            </span>
          </span>
          <span data-hero="line" className="block overflow-hidden">
            <span
              data-hero="line-inner"
              className="block font-black text-moz-teal"
            >
              <span data-hero="accent" className="inline-block">
                Digital
              </span>
            </span>
          </span>
          <span data-hero="line" className="block overflow-hidden">
            <span data-hero="line-inner" className="block">
              em Moçambique
            </span>
          </span>
        </h1>

        <div
          data-hero="rule"
          className="mt-5 h-px w-14 bg-moz-teal md:mt-6"
          aria-hidden
        />

        <p
          data-hero="desc"
          className="mt-5 max-w-2xl text-sm leading-relaxed text-moz-muted md:mt-6 md:text-base"
        >
          Comunidade dedicada à proteção de dados, formação em cibersegurança e
          construção de uma cultura digital mais segura em Moçambique.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4">
          <a
            data-hero="cta"
            href="https://linktr.ee/mozcyber?utm_source=linktree_profile_share&ltsid=30a4afa0-726d-4922-a0e1-66554b59c148"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-moz-teal px-6 py-2.5 text-sm font-semibold text-[#0b0f14] transition-colors hover:bg-white"
          >
            Entrar na comunidade
          </a>
          <Link
            data-hero="cta"
            href="/sobre"
            className="rounded-lg border border-white/25 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:border-moz-teal hover:text-moz-teal"
          >
            Saber mais
          </Link>
        </div>
      </div>
    </section>
  );
}
