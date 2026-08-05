import Image from "next/image";
import Link from "next/link";

const events = [
  {
    type: "Workshop",
    date: "22 Mar 2026",
    title: "Segurança em Aplicações Web",
    place: "Maputo · Presencial",
    desc: "Laboratório prático sobre OWASP Top 10, autenticação e boas práticas de desenvolvimento seguro.",
    image: "/events/workshop.jpg",
    alt: "Participantes num workshop de programação e segurança",
  },
  {
    type: "Hackathon",
    date: "18–19 Abr 2026",
    title: "Mozcyber Hackathon 2026",
    place: "Maputo · 48 horas",
    desc: "Equipas constroem soluções para desafios reais de cibersegurança em Moçambique.",
    image: "/events/hackathon.jpg",
    alt: "Equipas a trabalhar durante um hackathon",
  },
  {
    type: "CTF",
    date: "09 Mai 2026",
    title: "Capture The Flag — Edição Maputo",
    place: "Online + presencial",
    desc: "Competição de challenges em web, crypto, forensics e privilege escalation.",
    image: "/events/ctf.jpg",
    alt: "Código e ecrãs num ambiente de captura the flag",
  },
  {
    type: "Palestra",
    date: "30 Mai 2026",
    title: "Literacia Digital para Todos",
    place: "Beira · Aberto ao público",
    desc: "Sessão aberta sobre phishing, privacidade e hábitos seguros no dia a dia digital.",
    image: "/events/palestra.jpg",
    alt: "Público numa palestra de literacia digital",
  },
];

export default function Events() {
  return (
    <section id="eventos" className="bg-[#0b0f14] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-moz-teal">
            Agenda
          </p>
          <h2 className="mt-4 text-3xl leading-tight md:text-5xl">
            Próximos{" "}
            <span className="font-black text-moz-teal">eventos</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-moz-muted">
            Workshops, hackathons, CTFs e palestras de literacia digital para
            fortalecer a comunidade de cibersegurança em Moçambique.
          </p>
        </div>

        <ul className="mt-14 space-y-8 md:space-y-10">
          {events.map((event) => (
            <li key={event.title}>
              <Link
                href="#contacto"
                className="group grid grid-cols-[5.5rem_1fr] items-start gap-4 sm:grid-cols-[7rem_1fr] sm:gap-5 md:grid-cols-[minmax(0,17rem)_1fr] md:items-center md:gap-8 lg:grid-cols-[minmax(0,20rem)_1fr]"
              >
                <div className="relative aspect-square overflow-hidden bg-white/5 sm:aspect-video md:aspect-video">
                  <Image
                    src={event.image}
                    alt={event.alt}
                    fill
                    sizes="(max-width: 640px) 5.5rem, (max-width: 768px) 7rem, 20rem"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex min-w-0 flex-col">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm">
                    <span className="font-semibold uppercase tracking-[0.2em] text-moz-teal">
                      {event.type}
                    </span>
                    <time className="text-moz-muted">{event.date}</time>
                  </div>

                  <h3 className="mt-2 text-base leading-snug transition-colors group-hover:text-moz-teal sm:mt-3 sm:text-xl md:text-2xl">
                    {event.title}
                  </h3>
                  <p className="mt-1 text-xs text-moz-muted sm:mt-2 sm:text-sm">
                    {event.place}
                  </p>
                  <p className="mt-2 hidden max-w-xl text-sm leading-relaxed text-white/55 sm:mt-3 sm:block">
                    {event.desc}
                  </p>
                  <span className="mt-3 text-xs text-white/40 transition-colors group-hover:text-moz-teal sm:mt-4 sm:text-sm">
                    Inscrever →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
