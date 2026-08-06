"use client";

import Link from "next/link";
import { useRef } from "react";
import Reveal from "@/components/animations/Reveal";
import RevealStagger from "@/components/animations/RevealStagger";

type LinkItem = {
  href: string;
  label: string;
  primary?: boolean;
};

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  links: LinkItem[];
};

export default function PageCta({
  eyebrow,
  title,
  description,
  links,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      ref={ref}
      className="border-t border-white/10 bg-[#0b0f14] py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 text-center md:px-10">
        <Reveal variant="clip">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-moz-teal">
            {eyebrow}
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl leading-tight md:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-moz-muted">
            {description}
          </p>
        </Reveal>

        <RevealStagger
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5"
          selector=":scope a"
          stagger={0.1}
          variant="list"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                link.primary
                  ? "rounded-lg bg-moz-teal px-8 py-3 text-sm font-semibold text-[#0b0f14] transition-colors hover:bg-white"
                  : "rounded-lg border border-white/25 px-8 py-3 text-sm font-semibold text-white transition-colors hover:border-moz-teal hover:text-moz-teal"
              }
            >
              {link.label}
            </Link>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
