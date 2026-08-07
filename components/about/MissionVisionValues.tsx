import Reveal from "@/components/animations/Reveal";
import RevealStagger from "@/components/animations/RevealStagger";

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
    <section className="bg-moz-teal py-12 text-[#0b0f14] md:py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal variant="slide" className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#0b0f14]/55">
            Direção
          </p>
          <h2 className="mt-2 text-2xl leading-tight md:text-4xl">
            Missão, visão e{" "}
            <span className="font-black">valores</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#0b0f14]/70">
            O que nos guia no dia a dia da comunidade — e o que esperamos de
            quem caminha connosco.
          </p>
        </Reveal>

        <RevealStagger
          className="mt-8 grid gap-8 border-t border-[#0b0f14]/20 pt-8 md:grid-cols-2 md:gap-12"
          selector=":scope > div"
          stagger={0.12}
          variant="list"
        >
          {pillars.map((item) => (
            <div key={item.title}>
              <h3 className="text-xl leading-snug">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#0b0f14]/65">
                {item.text}
              </p>
            </div>
          ))}
        </RevealStagger>

        <div className="mt-10 md:mt-12">
          <Reveal variant="clip">
            <h3 className="text-xl leading-snug">Valores</h3>
          </Reveal>
          <RevealStagger
            className="mt-5 border-t border-[#0b0f14]/20"
            selector=":scope li"
            stagger={0.08}
            variant="list"
          >
            <ul>
              {values.map((value) => (
                <li
                  key={value.title}
                  className="grid gap-2 border-b border-[#0b0f14]/20 py-5 md:grid-cols-[12rem_1fr] md:items-start md:gap-10"
                >
                  <p className="text-lg leading-snug">{value.title}</p>
                  <p className="max-w-xl text-sm leading-relaxed text-[#0b0f14]/65">
                    {value.text}
                  </p>
                </li>
              ))}
            </ul>
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}
