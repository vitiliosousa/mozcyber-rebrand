"use client";

import Image from "next/image";
import { useRef } from "react";
import { usePageHeroAnimation } from "@/components/animations/usePageHeroAnimation";

const photos = [
  {
    src: "/about/1.jpeg",
    alt: "Membros da comunidade Mozcyber",
    className: "aspect-[4/5] md:aspect-[4/5]",
  },
  {
    src: "/about/2.jpg",
    alt: "Sessão de workshop prático",
    className: "aspect-[4/5] md:aspect-[4/5] md:mt-6",
  },
  {
    src: "/about/3.jpg",
    alt: "Equipa a trabalhar em conjunto",
    className: "aspect-[4/5] md:aspect-[4/5]",
  },
  {
    src: "/about/4.jpg",
    alt: "Momento de formação e partilha",
    className: "aspect-[4/5] md:aspect-[4/5] md:mt-6",
  },
];

export default function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  usePageHeroAnimation(sectionRef, true);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0b0f14] pt-20 pb-10 md:pt-24 md:pb-14"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p
          data-page="eyebrow"
          className="text-xs font-semibold uppercase tracking-[0.35em] text-moz-teal"
        >
          Sobre nós
        </p>

        <h1 className="mt-4 max-w-4xl text-3xl leading-[1.15] md:text-5xl">
          <span className="block overflow-hidden">
            <span data-page="line-inner" className="block">
              Quem somos e
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-page="line-inner" className="block">
              <span
                data-page="accent"
                className="inline-block font-black text-moz-teal"
              >
                porquê
              </span>{" "}
              existimos
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
          A Mozcyber é uma comunidade de cibersegurança em Moçambique. Reunimos
          estudantes, profissionais e curiosos para aprender, praticar e
          partilhar conhecimento através de workshops, hackathons, CTFs e
          palestras de literacia digital.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-2 md:mt-10 md:grid-cols-4 md:gap-3">
          {photos.map((photo) => (
            <div
              key={photo.src}
              data-page="photo"
              className={`relative overflow-hidden bg-white/5 ${photo.className}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
                priority={photo.src.includes("1.jpeg")}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
