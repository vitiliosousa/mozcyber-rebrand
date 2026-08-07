import Image from "next/image";

export default function SpeakerSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <span className="mb-10 block font-mono text-xs uppercase tracking-[0.3em] text-gray-400">
        Orador
      </span>

      <div className="flex flex-col items-start gap-8 rounded-3xl border border-gray-200 bg-white p-8 sm:flex-row">
        <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-2xl border border-gray-200">
          <Image
            src="/speakers/marcus_ritcher.png"
            alt="Marcus Ritcher"
            fill
            className="object-cover object-top"
            sizes="160px"
          />
        </div>

        <div className="flex-1">
          <h3 className="mb-1 text-xl font-bold text-gray-900">
            Marcus Ritcher
          </h3>
          <p className="mb-4 font-mono text-sm text-gray-400">
            Senior Cloud Architect
          </p>
          <div className="mb-4 h-px w-10 bg-gray-200" />
          <p className="text-sm leading-relaxed text-gray-500">
            Especialista em arquitecturas cloud e segurança de infraestruturas.
            Com experiência em ambientes de larga escala, Marcus partilhou
            conhecimentos práticos sobre como implementar o modelo Zero-Trust de
            forma eficaz e sustentável nas organizações.
          </p>
        </div>
      </div>
    </section>
  );
}
