import Reveal from "@/components/animations/Reveal";
import RevealStagger from "@/components/animations/RevealStagger";
import Image from "next/image";

const team = [
  {
    name: "Amina Mussá",
    role: "Coordenação da comunidade",
    image: "/team/amina.jpg",
  },
  {
    name: "Carlos Tembe",
    role: "Workshops & formação",
    image: "/team/carlos.jpg",
  },
  {
    name: "Fátima Nhantumbo",
    role: "CTFs & hackathons",
    image: "/team/fatima.jpg",
  },
  {
    name: "João Mabunda",
    role: "Literacia digital",
    image: "/team/joao.jpg",
  },
  {
    name: "Lara Mussá",
    role: "Coordenação da comunidade",
    image: "/team/amina.jpg",
  },
  {
    name: "Teresa Tembe",
    role: "Workshops & formação",
    image: "/team/carlos.jpg",
  },
  {
    name: "Fernanda Nhantumbo",
    role: "CTFs & hackathons",
    image: "/team/fatima.jpg",
  },
  {
    name: "Jonas Mabunda",
    role: "Literacia digital",
    image: "/team/joao.jpg",
  },
];

export default function Team() {
  return (
    <section id="equipa" className="border-t border-white/10 bg-[#101820] py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-moz-teal">
            Pessoas
          </p>
          <h2 className="mt-4 text-3xl leading-tight md:text-5xl">
            A nossa{" "}
            <span className="font-black text-moz-teal">equipa</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-moz-muted">
            Quem organiza, forma e mantém a comunidade Mozcyber a crescer em
            Moçambique.
          </p>
        </Reveal>

        <RevealStagger
          className="mt-12 md:mt-14"
          selector=":scope li"
          stagger={0.06}
          variant="grid"
        >
          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:gap-x-6 md:gap-y-10 lg:grid-cols-4">
            {team.map((member) => (
              <li key={member.name} className="group">
                <div className="relative aspect-square overflow-hidden bg-white/5">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-3 text-base leading-snug md:text-lg">
                  {member.name}
                </h3>
                <p className="mt-1 text-xs text-moz-teal md:text-sm">
                  {member.role}
                </p>
              </li>
            ))}
          </ul>
        </RevealStagger>
      </div>
    </section>
  );
}
