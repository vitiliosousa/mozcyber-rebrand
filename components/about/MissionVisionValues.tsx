const pillars = [
  {
    title: "Missão",
    text: "Fortalecer a cultura de cibersegurança em Moçambique através de formação prática, eventos colaborativos e literacia digital acessível a todos.",
  },
  {
    title: "Visão",
    text: "Ser a referência comunitária nacional onde qualquer pessoa pode aprender a proteger o espaço digital — com confiança, ética e impacto real.",
  },
];

const values = [
  {
    title: "Prática",
    text: "Aprendemos fazendo: labs, CTFs e desafios reais antes de slides longos.",
  },
  {
    title: "Comunidade",
    text: "Crescemos juntos. Partilha, mentoria e respeito entre quem chega e quem já caminha.",
  },
  {
    title: "Ética",
    text: "Hacking responsável. O conhecimento serve para proteger, nunca para prejudicar.",
  },
  {
    title: "Acesso",
    text: "Abrimos portas: eventos presenciais e online, em várias cidades, para públicos diversos.",
  },
];

export default function MissionVisionValues() {
  return (
    <section className="bg-moz-teal py-20 text-[#0b0f14] md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#0b0f14]/55">
            Direção
          </p>
          <h2 className="mt-4 text-3xl leading-tight md:text-5xl">
            Missão, visão e{" "}
            <span className="font-black">valores</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[#0b0f14]/70">
            O que nos guia no dia a dia da comunidade — e o que esperamos de
            quem caminha connosco.
          </p>
        </div>

        <div className="mt-14 grid gap-10 border-t border-[#0b0f14]/20 pt-12 md:mt-16 md:grid-cols-2 md:gap-16">
          {pillars.map((item) => (
            <div key={item.title}>
              <h3 className="text-2xl leading-snug">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-[#0b0f14]/65 md:text-base">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 md:mt-20">
          <h3 className="text-2xl leading-snug">Valores</h3>
          <ul className="mt-8 border-t border-[#0b0f14]/20">
            {values.map((value) => (
              <li
                key={value.title}
                className="grid gap-3 border-b border-[#0b0f14]/20 py-8 md:grid-cols-[16rem_1fr] md:items-start md:gap-12"
              >
                <p className="text-2xl leading-snug">{value.title}</p>
                <p className="max-w-xl text-sm leading-relaxed text-[#0b0f14]/65">
                  {value.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
