import Image from "next/image";

const moments = [
  {
    title: "Começámos em Maputo",
    text: "A Mozcyber nasceu da vontade de juntar pessoas que queriam aprender cibersegurança de forma prática — sem barreiras e sem exclusividade.",
  },
  {
    title: "Crescemos com a comunidade",
    text: "Workshops, CTFs e palestras passaram a acontecer com mais frequência. Cada evento trouxe novos rostos, mentores e ideias.",
  },
  {
    title: "Olhamos para o país",
    text: "Hoje levamos literacia digital e formação além da capital, com formatos presenciais e online para quem quer proteger o espaço digital moçambicano.",
  },
];

export default function AboutStory() {
  return (
    <section className="border-t border-white/10 bg-[#101820] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden bg-white/5 md:aspect-[3/4]">
            <Image
              src="/about/formacao.jpg"
              alt="Sessão de formação da comunidade Mozcyber"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-moz-teal">
              Percurso
            </p>
            <h2 className="mt-4 text-3xl leading-tight md:text-5xl">
              A nossa{" "}
              <span className="font-black text-moz-teal">história</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-moz-muted">
              De um grupo pequeno a uma comunidade que forma, compete e partilha
              conhecimento em Moçambique.
            </p>

            <ul className="mt-10 border-t border-white/10">
              {moments.map((moment) => (
                <li
                  key={moment.title}
                  className="border-b border-white/10 py-6"
                >
                  <h3 className="text-xl leading-snug md:text-2xl">
                    {moment.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">
                    {moment.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
