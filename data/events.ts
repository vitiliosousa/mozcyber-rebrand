export type EventItem = {
  type: string;
  date: string;
  title: string;
  place: string;
  desc: string;
  image: string;
  alt: string;
  pageUrl: string;
  url?: string;
};

export const events: EventItem[] = [
  {
    type: "Palestra",
    date: "27 Fev 2026",
    title: "Um Ciberespaço Seguro e Resiliente em Moçambique",
    place: "Triana Business Lounge",
    desc: "Debate sobre um ciberespaço mais seguro e resiliente em Moçambique.",
    image: "/events/ciberspacesecurity.png",
    alt: "Banner Ciberespaço Seguro",
    pageUrl: "/events/ciberespaco-seguro",
    url: "https://chat.whatsapp.com/LyJ75AMFdSLFox27fkFAHP",
  },
  {
    type: "Workshop",
    date: "16 – 30 Nov 2025",
    title: "Hack On Sundays",
    place: "Online",
    desc: "Sessões de domingo com labs e prática de hacking ético.",
    image: "/events/hos_banner.png",
    alt: "Banner Hack On Sundays",
    pageUrl: "/events/hack-on-sundays",
    url: "https://chat.whatsapp.com/LyJ75AMFdSLFox27fkFAHP",
  },
  {
    type: "Palestra",
    date: "24 Out 2025",
    title: "Woman in Cyber",
    place: "Triana Business Lounge",
    desc: "Encontro dedicado às mulheres na cibersegurança e à inclusão no sector.",
    image: "/events/woman_cyber_banner.png",
    alt: "Banner Woman in Cyber",
    pageUrl: "/events/woman-in-cyber",
    url: "https://chat.whatsapp.com/LyJ75AMFdSLFox27fkFAHP",
  },
  {
    type: "Workshop",
    date: "04 Set 2025",
    title: "Cloud Security: A Practical Guide to Zero-Trust",
    place: "Triana Business Lounge",
    desc: "Guia prático de segurança na cloud com foco em zero-trust.",
    image: "/events/cloud_security_banner.png",
    alt: "Banner Cloud Security",
    pageUrl: "/events/cloud-security",
    url: "https://chat.whatsapp.com/LyJ75AMFdSLFox27fkFAHP",
  },
  {
    type: "Palestra",
    date: "23 Ago 2025",
    title: "A Importância da Ética na Segurança Cibernética",
    place: "Escola Superior de Ciências Náuticas",
    desc: "Conversa sobre ética, responsabilidade e boas práticas em cibersegurança.",
    image: "/events/ethical_hacking_banner.png",
    alt: "Banner Ética na Segurança Cibernética",
    pageUrl: "/events/iesc",
    url: "https://chat.whatsapp.com/LyJ75AMFdSLFox27fkFAHP",
  },
  {
    type: "CTF",
    date: "10 Mai 2025",
    title: "Capture the Flag: The First Edition",
    place: "USTM",
    desc: "Primeira edição do CTF com challenges de web, crypto e forensics.",
    image: "/events/capture_flag_banner.png",
    alt: "Banner Capture the Flag",
    pageUrl: "/events/capture-the-flag",
    url: "https://chat.whatsapp.com/LyJ75AMFdSLFox27fkFAHP",
  },
  {
    type: "Hackathon",
    date: "05 Abr – 03 Mai 2025",
    title: "Night Hack",
    place: "ISUTC",
    desc: "Maratona noturna de resolução de desafios reais de cibersegurança.",
    image: "/events/nighthack_banner.png",
    alt: "Banner Night Hack",
    pageUrl: "/events/night-hack",
    url: "https://chat.whatsapp.com/LyJ75AMFdSLFox27fkFAHP",
  },
  {
    type: "Workshop",
    date: "21 Ago – 16 Out 2024",
    title: "Hack On Wednesdays",
    place: "Online",
    desc: "Sessões semanais práticas de hacking ético e desafios de cibersegurança.",
    image: "/events/how_banner.png",
    alt: "Banner Hack On Wednesdays",
    pageUrl: "/events/hack-on-wednesday",
    url: "https://chat.whatsapp.com/LyJ75AMFdSLFox27fkFAHP",
  },
];
