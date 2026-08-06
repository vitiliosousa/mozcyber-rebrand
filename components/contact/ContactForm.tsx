"use client";

import Reveal from "@/components/animations/Reveal";
import RevealStagger from "@/components/animations/RevealStagger";
import { gsap, prefersReducedMotion, revealEase } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { FormEvent, useRef, useState } from "react";

const fieldClass =
  "w-full border-b border-white/20 bg-transparent py-3 text-base text-white outline-none transition-colors placeholder:text-white/35 focus:border-moz-teal";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || sent) return;

      gsap.from("[data-contact='field']", {
        opacity: 0,
        x: 32,
        duration: 0.65,
        stagger: 0.08,
        ease: revealEase,
        scrollTrigger: {
          trigger: "[data-contact='form']",
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef, dependencies: [sent] },
  );

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section ref={sectionRef} className="bg-[#0b0f14] pb-20 md:pb-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-14 md:grid-cols-[1fr_1.2fr] md:gap-20">
          <Reveal variant="slide">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-moz-teal">
              Dados
            </p>
            <h2 className="mt-4 text-3xl leading-tight md:text-5xl">
              Outras{" "}
              <span className="font-black text-moz-teal">formas</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-moz-muted">
              Prefere escrever diretamente? Usa estes canais.
            </p>

            <RevealStagger
              className="mt-10 space-y-8 border-t border-white/10 pt-8"
              selector=":scope li"
              stagger={0.1}
              variant="list"
            >
              <ul>
                <li>
                  <p className="text-xs uppercase tracking-[0.2em] text-moz-muted">
                    Email
                  </p>
                  <a
                    href="mailto:contacto@mozcyber.mz"
                    className="mt-2 block text-xl transition-colors hover:text-moz-teal md:text-2xl"
                  >
                    contacto@mozcyber.mz
                  </a>
                </li>
                <li>
                  <p className="text-xs uppercase tracking-[0.2em] text-moz-muted">
                    Localização
                  </p>
                  <p className="mt-2 text-xl md:text-2xl">Maputo, Moçambique</p>
                </li>
                <li>
                  <p className="text-xs uppercase tracking-[0.2em] text-moz-muted">
                    Redes
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-base text-white/70">
                    <a href="#" className="transition-colors hover:text-moz-teal">
                      Instagram
                    </a>
                    <a href="#" className="transition-colors hover:text-moz-teal">
                      LinkedIn
                    </a>
                    <a href="#" className="transition-colors hover:text-moz-teal">
                      X / Twitter
                    </a>
                  </div>
                </li>
              </ul>
            </RevealStagger>
          </Reveal>

          <Reveal variant="clip">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-moz-teal">
              Mensagem
            </p>
            <h2 className="mt-4 text-3xl leading-tight md:text-5xl">
              Envia a tua{" "}
              <span className="font-black text-moz-teal">mensagem</span>
            </h2>

            {sent ? (
              <p className="mt-10 text-lg leading-relaxed text-moz-teal">
                Obrigado. A tua mensagem foi registada — entraremos em contacto
                em breve.
              </p>
            ) : (
              <form
                data-contact="form"
                onSubmit={handleSubmit}
                className="mt-10 space-y-8"
              >
                <div data-contact="field">
                  <label htmlFor="name" className="sr-only">
                    Nome
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Nome"
                    className={fieldClass}
                  />
                </div>
                <div data-contact="field">
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Email"
                    className={fieldClass}
                  />
                </div>
                <div data-contact="field">
                  <label htmlFor="subject" className="sr-only">
                    Assunto
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    placeholder="Assunto"
                    className={fieldClass}
                  />
                </div>
                <div data-contact="field">
                  <label htmlFor="message" className="sr-only">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Mensagem"
                    className={`${fieldClass} resize-none`}
                  />
                </div>
                <button
                  data-contact="field"
                  type="submit"
                  className="rounded-lg bg-moz-teal px-8 py-3 text-sm font-semibold text-[#0b0f14] transition-colors hover:bg-white"
                >
                  Enviar mensagem
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
