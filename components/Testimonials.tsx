const testimonials = [
  {
    quote:
      "Os workshops da Mozcyber deram-me bases reais de segurança web. Saí com prática, não só teoria.",
    name: "Nélio Muchanga",
    role: "Estudante de Informática · Maputo",
  },
  {
    quote:
      "O CTF foi intenso. Pela primeira vez senti o que é trabalhar sob pressão num cenário de ataque real.",
    name: "Sara Macuácua",
    role: "Participante CTF · Beira",
  },
  {
    quote:
      "A palestra de literacia digital ajudou a nossa equipa a reconhecer phishing e proteger dados dos clientes.",
    name: "Hélder Sitoe",
    role: "Empreendedor · Nampula",
  },
];

export default function Testimonials() {
  return (
    <section id="testemunhos" className="bg-[#0b0f14] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-moz-teal">
            Comunidade
          </p>
          <h2 className="mt-4 text-3xl leading-tight md:text-5xl">
            O que dizem{" "}
            <span className="font-black text-moz-teal">sobre nós</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-moz-muted">
            Vozes de quem já participou nos workshops, CTFs e palestras da
            Mozcyber.
          </p>
        </div>

        <ul className="mt-14 grid gap-12 md:mt-16 md:grid-cols-3 md:gap-10">
          {testimonials.map((item) => (
            <li key={item.name} className="flex flex-col border-t border-white/15 pt-8">
              <blockquote className="flex-1 text-lg leading-relaxed text-white">
                “{item.quote}”
              </blockquote>
              <footer className="mt-8">
                <p className="text-moz-teal">{item.name}</p>
                <p className="mt-1 text-sm text-moz-muted">{item.role}</p>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
