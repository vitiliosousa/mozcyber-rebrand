"use client";

import Reveal from "@/components/animations/Reveal";
import RevealStagger from "@/components/animations/RevealStagger";
import { socialmedia } from "@/data/socialmedia";
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
    <section ref={sectionRef} className="bg-[#0b0f14] pb-12 md:pb-16">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-14">
          <Reveal variant="slide">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-moz-teal">
              Dados
            </p>
            <h2 className="mt-2 text-2xl leading-tight md:text-4xl">
              Outras{" "}
              <span className="font-black text-moz-teal">formas</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-moz-muted">
              Prefere escrever diretamente? Usa estes canais.
            </p>

            <RevealStagger
              className="mt-6 space-y-5 border-t border-white/10 pt-6"
              selector=":scope li"
              stagger={0.1}
              variant="list"
            >
              <ul className="space-y-4">
                <li>
                  <p className="text-xs uppercase tracking-[0.2em] text-moz-muted">
                    Email
                  </p>
                  <a
                    href="mailto:mozcyber.community@gmail.com"
                    className="mt-1.5 block text-lg transition-colors hover:text-moz-teal"
                  >
                    mozcyber.community@gmail.com
                  </a>
                </li>
                <li>
                  <p className="text-xs uppercase tracking-[0.2em] text-moz-muted">
                    Localização
                  </p>
                  <p className="mt-1.5 text-lg">Maputo, Moçambique</p>
                </li>
                <li>
                  <p className="text-xs uppercase tracking-[0.2em] text-moz-muted">
                    Redes
                  </p>
                  <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/70">
                    {socialmedia.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-moz-teal"
                      >
                        {social.name}
                      </a>
                    ))}
                  </div>
                </li>
              </ul>
            </RevealStagger>
          </Reveal>

          <Reveal variant="clip">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-moz-teal">
              Mensagem
            </p>
            <h2 className="mt-2 text-2xl leading-tight md:text-4xl">
              Envia a tua{" "}
              <span className="font-black text-moz-teal">mensagem</span>
            </h2>

            {sent ? (
              <p className="mt-6 text-base leading-relaxed text-moz-teal">
                Obrigado. A tua mensagem foi registada — entraremos em contacto
                em breve.
              </p>
            ) : (
              <form
                data-contact="form"
                onSubmit={handleSubmit}
                className="mt-6 space-y-5"
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
