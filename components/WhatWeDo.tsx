import Reveal from "@/components/animations/Reveal";
import RevealStagger from "@/components/animations/RevealStagger";

const activities = [
  {
    type: "Workshops",
    desc: "Sessões práticas de segurança ofensiva e defensiva — web, redes, cloud e desenvolvimento seguro.",
  },
  {
    type: "Hackathons",
    desc: "Maratonas de resolução de problemas reais de cibersegurança, em equipa e sob pressão de tempo.",
  },
  {
    type: "CTFs",
    desc: "Competições Capture The Flag para treinar hacking ético, forensics, crypto e privilege escalation.",
  },
  {
    type: "Palestras",
    desc: "Literacia digital aberta ao público: phishing, privacidade e hábitos seguros no dia a dia.",
  },
];

export default function WhatWeDo() {
  return (
    <section
      id="fazemos"
      className="flex min-h-dvh flex-col justify-center border-t border-white/10 bg-[#101820] py-12 md:min-h-screen md:py-0"
    >
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <Reveal variant="slide" className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-moz-teal">
            Comunidade
          </p>
          <h2 className="mt-2 text-2xl leading-tight md:text-4xl">
            O que <span className="font-black text-moz-teal">fazemos</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-moz-muted">
            Formamos e conectamos pessoas em Moçambique através de atividades
            práticas de cibersegurança e literacia digital.
          </p>
        </Reveal>

        <RevealStagger
          className="mt-8 md:mt-10"
          selector=":scope li"
          stagger={0.08}
          variant="list"
        >
          <ul className="grid gap-px bg-white/10 sm:grid-cols-2">
            {activities.map((activity) => (
              <li
                key={activity.type}
                className="bg-[#101820] px-5 py-6 md:px-8 md:py-10"
              >
                <h3 className="text-xl leading-snug md:text-2xl">
                  {activity.type}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-moz-muted">
                  {activity.desc}
                </p>
              </li>
            ))}
          </ul>
        </RevealStagger>
      </div>
    </section>
  );
}
