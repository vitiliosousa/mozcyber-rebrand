export type EventItem = {
  type: string;
  date: string;
  title: string;
  place: string;
  desc: string;
  image: string;
  alt: string;
};

export const upcomingEvents: EventItem[] = [
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
  {
    type: "Workshop",
    date: "14 Jun 2026",
    title: "Introdução a Redes e Análise de Tráfego",
    place: "Maputo · Presencial",
    desc: "Wireshark, protocolos e deteção de anomalias — sessão hands-on para iniciantes e intermédios.",
    image: "/events/workshop.jpg",
    alt: "Workshop de redes e análise de tráfego",
  },
  {
    type: "CTF",
    date: "12 Jul 2026",
    title: "CTF Online — Summer Challenge",
    place: "Online",
    desc: "Competição remota com challenges progressivos. Ideal para quem quer treinar a partir de casa.",
    image: "/events/ctf.jpg",
    alt: "Competição CTF online",
  },
];
