export default function EventsHero() {
  return (
    <section className="bg-[#0b0f14] pt-28 pb-16 md:pt-36 md:pb-20">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-moz-teal">
          Agenda
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl leading-[1.15] md:text-6xl lg:text-7xl">
          Eventos da{" "}
          <span className="font-black text-moz-teal">comunidade</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-moz-muted md:mt-8 md:text-xl">
          Workshops, hackathons, CTFs e palestras de literacia digital. Aprende,
          compete e conecta-te com a comunidade de cibersegurança em Moçambique.
        </p>
      </div>
    </section>
  );
}
