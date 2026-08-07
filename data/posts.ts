export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  content: string[];
};

export const posts: BlogPost[] = [
  {
    slug: "o-que-e-um-ctf",
    title: "O que é um CTF e porque deverias experimentar um",
    excerpt:
      "Capture the Flag não é só para especialistas. Explicamos o formato, os tipos de desafios e como preparar a primeira participação.",
    date: "12 Mar 2026",
    author: "Vitilio Sousa",
    category: "Formação",
    content: [
      "Um CTF (Capture the Flag) é uma competição em que equipas resolvem desafios de cibersegurança para encontrar “flags” — provas de que o problema foi resolvido.",
      "Há desafios de web, criptografia, forensics, reverse engineering e mais. O objectivo não é só ganhar: é aprender a pensar como um adversário e como um defensor.",
      "Na Mozcyber, os CTFs são pensados para misturar iniciantes e quem já pratica. Mentoria durante o evento e challenges com níveis diferentes ajudam quem chega pela primeira vez.",
      "Se nunca participaste, começa por rever noções básicas de redes e Linux, junta-te a uma equipa e foca-te em um ou dois tipos de desafio. O resto vem com a prática.",
    ],
  },
  {
    slug: "hacking-etico-em-mocambique",
    title: "Hacking ético em Moçambique: por onde começar",
    excerpt:
      "Caminhos práticos para quem quer aprender hacking responsável sem cair em mitos ou atalhos perigosos.",
    date: "28 Fev 2026",
    author: "Walter Cumbucane",
    category: "Carreira",
    content: [
      "Hacking ético é usar conhecimento técnico para proteger sistemas — sempre com autorização e dentro da lei.",
      "Em Moçambique, a procura por profissionais de cibersegurança cresce com a digitalização de serviços. Mas o primeiro passo continua a ser o mesmo: bases sólidas.",
      "Recomendamos começar por redes, sistemas operativos e programação básica. Depois, labs controlados (como os das nossas sessões Hack On Wednesdays) permitem praticar sem risco.",
      "A ética não é um capítulo no fim do curso. É o filtro de cada decisão: se não tens permissão explícita, não testas.",
    ],
  },
  {
    slug: "literacia-digital-para-todos",
    title: "Literacia digital para todos: o papel da comunidade",
    excerpt:
      "Cibersegurança não é só para quem trabalha em TI. Reflectimos sobre como a comunidade pode alargar o acesso ao conhecimento.",
    date: "10 Fev 2026",
    author: "Chantel Valoi",
    category: "Comunidade",
    content: [
      "Phishing, palavras-passe fracas e partilha excessiva de dados afectam estudantes, comerciantes e famílias — não só empresas de tecnologia.",
      "A Mozcyber acredita que literacia digital acessível é parte da missão. Palestras abertas e linguagem clara são tão importantes quanto workshops avançados.",
      "Quando a comunidade ensina, multiplica-se o impacto: quem aprende hoje pode ajudar o colega amanhã.",
      "Se queres contribuir, propõe um tema, oferece mentoria ou traz a tua organização para um evento de sensibilização.",
    ],
  },
  {
    slug: "zero-trust-na-pratica",
    title: "Zero-Trust na prática: o que muda no dia a dia",
    excerpt:
      "Para além do buzzword — princípios concretos de zero-trust que podes aplicar em ambientes cloud e híbridos.",
    date: "22 Jan 2026",
    author: "Patricio Massinga",
    category: "Cloud",
    content: [
      "Zero-trust parte de uma ideia simples: não confiar por defeito, nem dentro da rede.",
      "Na prática, isto significa verificar identidade, limitar privilégios e assumir que uma violação pode já ter acontecido.",
      "No workshop Cloud Security da Mozcyber explorámos controlos concretos — segmentação, MFA e políticas de acesso mínimas — sem ficar só na teoria.",
      "Começa pequeno: inventaria identidades e acessos, remove o que ninguém usa e documenta o que fica. Zero-trust é um percurso, não um produto único.",
    ],
  },
  {
    slug: "mulheres-na-ciberseguranca",
    title: "Mulheres na cibersegurança: porque a inclusão importa",
    excerpt:
      "Espaços dedicados, mentoria e visibilidade — o que aprendemos com o Woman in Cyber e o que ainda falta fazer.",
    date: "05 Jan 2026",
    author: "Muthimbane Langa",
    category: "Comunidade",
    content: [
      "A cibersegurança ganha quando mais vozes entram na conversa. Diversidade não é só justiça — é melhor detecção de riscos e melhores soluções.",
      "O Woman in Cyber foi um espaço para partilha de percursos, desafios e oportunidades no sector em Moçambique.",
      "Mentoria, modelos de referência e eventos acolhedores reduzem barreiras de entrada. A comunidade tem de manter essa porta aberta o ano inteiro, não só num evento.",
      "Se és mulher a começar na área, estás no sítio certo. Se já caminhas há anos, a tua experiência pode desbloquear o caminho de outra pessoa.",
    ],
  },
  {
    slug: "como-preparar-um-hackathon",
    title: "Como preparar a tua primeira noite de hackathon",
    excerpt:
      "Checklist simples para chegar a um Night Hack com energia, foco e a mentalidade certa.",
    date: "18 Dez 2025",
    author: "Elton Nhaca",
    category: "Eventos",
    content: [
      "Um hackathon de cibersegurança pede resistência e colaboração. Dormir bem na véspera conta tanto como saber usar a ferramenta favorita.",
      "Leva portátil carregado, carregador, caderno e uma lista curta de recursos que já usaste. Evita instalar tudo na hora.",
      "Define papéis na equipa cedo: quem pesquisa, quem ataca o challenge, quem documenta. Trocar a meio é normal — o importante é comunicar.",
      "No fim, independentemente do ranking, anota o que aprendeste. Esse caderno vale mais do que qualquer medalha.",
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
