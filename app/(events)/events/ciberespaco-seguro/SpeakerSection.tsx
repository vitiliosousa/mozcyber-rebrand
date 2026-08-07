import Image from "next/image";

export default function SpeakerSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <span className="mb-10 block font-mono text-xs uppercase tracking-[0.3em] text-white/30">
        Oradora
      </span>

      <div className="flex flex-col items-start gap-8 rounded-3xl border border-white/15 bg-white/[0.05] p-8 backdrop-blur-sm sm:flex-row">
        <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-2xl border border-white/15">
          <Image
            src="/speakers/jaqueline_pateguana.png"
            alt="Jaqueline Pateguana"
            fill
            className="object-cover object-top"
            sizes="160px"
          />
        </div>

        <div className="flex-1">
          <h3 className="mb-1 text-xl font-bold text-white">
            Jaqueline Pateguana
          </h3>
          <p className="mb-4 font-mono text-sm text-white/35">
            Cybersecurity Consultant
          </p>
          <div className="mb-4 h-px w-10 bg-white/15" />
          <p className="text-sm leading-relaxed text-white/50">
            Consultora de cibersegurança com foco em estratégia, governação e
            resiliência digital. Jaqueline conduziu o workshop com uma visão
            abrangente sobre o panorama actual da cibersegurança em Moçambique e
            os passos necessários para construir um ecossistema digital mais
            seguro.
          </p>
        </div>
      </div>
    </section>
  );
}
