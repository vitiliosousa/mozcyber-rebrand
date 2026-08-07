"use client";

import { useRef } from "react";
import { usePageHeroAnimation } from "@/components/animations/usePageHeroAnimation";

export default function BlogHero() {
  const sectionRef = useRef<HTMLElement>(null);
  usePageHeroAnimation(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0b0f14] pt-20 pb-10 md:pt-24 md:pb-12"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p
          data-page="eyebrow"
          className="text-xs font-semibold uppercase tracking-[0.35em] text-moz-teal"
        >
          Blog
        </p>

        <h1 className="mt-4 max-w-4xl text-3xl leading-[1.15] md:text-5xl">
          <span className="block overflow-hidden">
            <span data-page="line-inner" className="block">
              Ideias, prática e
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              data-page="accent"
              className="inline-block font-black text-moz-teal"
            >
              cibersegurança
            </span>
          </span>
        </h1>

        <div
          data-page="rule"
          className="mt-4 h-px w-14 bg-moz-teal md:mt-5"
          aria-hidden
        />

        <p
          data-page="desc"
          className="mt-4 max-w-2xl text-sm leading-relaxed text-moz-muted md:mt-5 md:text-base"
        >
          Artigos da comunidade Mozcyber sobre formação, eventos, carreira e
          literacia digital em Moçambique.
        </p>
      </div>
    </section>
  );
}
