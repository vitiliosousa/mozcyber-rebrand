const partners = [
  "UEM",
  "ISCTEM",
  "MozDevz",
  "ICT4D",
  "CiTi",
  "INAGE",
];

export default function Partners() {
  return (
    <section
      id="parceiros"
      className="border-t border-white/10 bg-[#0b0f14] py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-moz-teal">
            Rede
          </p>
          <h2 className="mt-4 text-3xl leading-tight md:text-5xl">
            Nossos{" "}
            <span className="font-black text-moz-teal">parceiros</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-moz-muted">
            Instituições e comunidades que caminham connosco na construção de
            uma Moçambique digitalmente mais segura.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-2 border border-white/10 sm:grid-cols-3 md:mt-16 lg:grid-cols-6">
          {partners.map((partner) => (
            <li
              key={partner}
              className="flex aspect-4/3 items-center justify-center border border-white/10 px-4 text-center text-lg text-white/45 transition-colors hover:bg-white/3 hover:text-moz-teal md:text-xl"
            >
              {partner}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
