const faqs = [
  {
    q: "A Mozcyber é só para profissionais de TI?",
    a: "Não. Recebemos estudantes, profissionais, empreendedores e qualquer pessoa interessada em cibersegurança ou literacia digital. Há atividades para diferentes níveis.",
  },
  {
    q: "Os eventos são pagos?",
    a: "A maioria das atividades da comunidade é gratuita ou de baixo custo. Quando houver taxa (por exemplo, materiais de workshop), comunicamos com antecedência na inscrição.",
  },
  {
    q: "Preciso de experiência para participar num CTF ou hackathon?",
    a: "Não é obrigatório. Há challenges para iniciantes e mentoria durante os eventos. O importante é vontade de aprender e trabalhar em equipa.",
  },
  {
    q: "Como posso juntar-me à comunidade?",
    a: "Acompanha os próximos eventos na página inicial, participa nas sessões e segue os nossos canais. Em breve poderás criar conta na plataforma para gerir inscrições.",
  },
  {
    q: "Organizam atividades fora de Maputo?",
    a: "Sim. Já realizámos e planeamos sessões noutros pontos do país, como Beira e Nampula, além de formatos online para quem está longe.",
  },
  {
    q: "Posso propor um workshop ou palestra?",
    a: "Claro. Se tens um tema de cibersegurança ou literacia digital para partilhar, contacta-nos — valorizamos quem quer contribuir com a comunidade.",
  },
];

export default function AboutFaq() {
  return (
    <section className="bg-[#0b0f14] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-moz-teal">
            Questões
          </p>
          <h2 className="mt-4 text-3xl leading-tight md:text-5xl">
            Perguntas{" "}
            <span className="font-black text-moz-teal">frequentes</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-moz-muted">
            Respostas rápidas sobre a comunidade, eventos e como participar.
          </p>
        </div>

        <ul className="mt-14 border-t border-white/10 md:mt-16">
          {faqs.map((item) => (
            <li key={item.q} className="border-b border-white/10">
              <details className="group py-6 md:py-8">
                <summary className="cursor-pointer list-none marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-4">
                    <span className="text-xl leading-snug md:text-2xl">
                      {item.q}
                    </span>
                    <span
                      aria-hidden
                      className="shrink-0 text-moz-teal transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/55">
                  {item.a}
                </p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
