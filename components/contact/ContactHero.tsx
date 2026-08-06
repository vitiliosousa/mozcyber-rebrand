"use client";

import { useRef } from "react";
import { usePageHeroAnimation } from "@/components/animations/usePageHeroAnimation";

export default function ContactHero() {
  const sectionRef = useRef<HTMLElement>(null);
  usePageHeroAnimation(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0b0f14] pt-28 pb-12 md:pt-36 md:pb-16"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p
          data-page="eyebrow"
          className="text-xs font-semibold uppercase tracking-[0.35em] text-moz-teal"
        >
          Contacto
        </p>

        <h1 className="mt-4 max-w-4xl text-4xl leading-[1.15] md:text-6xl lg:text-7xl">
          <span className="block overflow-hidden">
            <span data-page="line-inner" className="block">
              Fala
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              data-page="accent"
              className="inline-block font-black text-moz-teal"
            >
              connosco
            </span>
          </span>
        </h1>

        <div
          data-page="rule"
          className="mt-6 h-px w-16 bg-moz-teal md:mt-8"
          aria-hidden
        />

        <p
          data-page="desc"
          className="mt-6 max-w-2xl text-base leading-relaxed text-moz-muted md:mt-8 md:text-xl"
        >
          Tens uma dúvida, queres propor um evento ou juntar-te à comunidade?
          Envia-nos uma mensagem — respondemos o mais depressa possível.
        </p>
      </div>
    </section>
  );
}
