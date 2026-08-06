export default function ContactHero() {
  return (
    <section className="bg-[#0b0f14] pt-28 pb-12 md:pt-36 md:pb-16">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-moz-teal">
          Contacto
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl leading-[1.15] md:text-6xl lg:text-7xl">
          Fala{" "}
          <span className="font-black text-moz-teal">connosco</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-moz-muted md:mt-8 md:text-xl">
          Tens uma dúvida, queres propor um evento ou juntar-te à comunidade?
          Envia-nos uma mensagem — respondemos o mais depressa possível.
        </p>
      </div>
    </section>
  );
}
