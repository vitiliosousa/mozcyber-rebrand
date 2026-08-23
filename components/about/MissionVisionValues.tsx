import Reveal from "@/components/animations/Reveal";
import RevealStagger from "@/components/animations/RevealStagger";

const pillars = [
  {
    title: "Missão",
    text: "Ser um centro de referência para o apoio e desenvolvimento na indústria cibernética em Moçambique.",
  },
  {
    title: "Visão",
    text: "Fortalecer a comunidade, as organizações e impulsionar o eco-sistema digital de Moçambique, promovendo a colaboração, a inovação e a partilha de conhecimento.",
  },
];

const values = [
  {
    title: "Explorar",
    text: "Incentivamos a curiosidade técnica e a pesquisa constante.",
  },
  {
    title: "Proteger",
    text: "Protegemos pessoas, organizações e o eco-sistema digital moçambicano com responsabilidade e rigor técnico.",
  },
  {
    title: "Evoluir",
    text: "A segurança cibernética não é estática. Evoluímos as nossas competências ao ritmo das ameaças que enfrentamos.",
  },
];

export default function MissionVisionValues() {
  return (
    <section className="border-t border-white/10 bg-[#101820] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal variant="slide" className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-moz-teal">
            Direção
          </p>
          <h2 className="mt-2 text-2xl leading-tight md:text-4xl">
            Missão, visão e{" "}
            <span className="font-black text-moz-teal">valores</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-moz-muted">
            O que nos guia no dia a dia da comunidade — e o que esperamos de
            quem caminha connosco.
          </p>
        </Reveal>

        <RevealStagger
          className="mt-8 grid gap-8 border-t border-white/15 pt-8 md:grid-cols-2 md:gap-12"
          selector=":scope > div"
          stagger={0.12}
          variant="list"
        >
          {pillars.map((item) => (
            <div key={item.title}>
              <h3 className="text-xl leading-snug">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-moz-muted">
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
            className="mt-5 border-t border-white/15"
            selector=":scope li"
            stagger={0.08}
            variant="list"
          >
            <ul>
              {values.map((value) => (
                <li
                  key={value.title}
                  className="grid gap-2 border-b border-white/15 py-5 md:grid-cols-[12rem_1fr] md:items-start md:gap-10"
                >
                  <p className="text-lg leading-snug text-moz-teal">
                    {value.title}
                  </p>
                  <p className="max-w-xl text-sm leading-relaxed text-moz-muted">
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
