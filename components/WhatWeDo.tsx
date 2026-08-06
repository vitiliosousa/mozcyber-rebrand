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
      className="bg-moz-teal py-20 text-[#0b0f14] md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#0b0f14]/55">
            Comunidade
          </p>
          <h2 className="mt-4 text-3xl leading-tight md:text-5xl">
            O que <span className="font-black">fazemos</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[#0b0f14]/70">
            Formamos e conectamos pessoas em Moçambique através de atividades
            práticas de cibersegurança e literacia digital.
          </p>
        </div>

        <ul className="mt-14 grid gap-px bg-[#0b0f14]/20 sm:grid-cols-2 md:mt-16">
          {activities.map((activity) => (
            <li
              key={activity.type}
              className="bg-moz-teal px-6 py-10 md:px-10 md:py-12"
            >
              <h3 className="text-2xl leading-snug md:text-3xl">
                {activity.type}
              </h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#0b0f14]/65">
                {activity.desc}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
