import Reveal from "@/components/animations/Reveal";
import RevealStagger from "@/components/animations/RevealStagger";
import { members } from "@/data/team";
import Image from "next/image";

export default function Team() {
  return (
    <section
      id="equipa"
      className="flex min-h-dvh flex-col justify-center border-t border-white/10 bg-[#101820] py-12 md:min-h-screen md:py-16"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-moz-teal">
            Pessoas
          </p>
          <h2 className="mt-2 text-2xl leading-tight md:text-4xl">
            A nossa{" "}
            <span className="font-black text-moz-teal">equipa</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-moz-muted">
            Quem organiza, forma e mantém a comunidade Mozcyber a crescer em
            Moçambique.
          </p>
        </Reveal>

        <RevealStagger
          className="mt-8"
          selector=":scope li"
          stagger={0.06}
          variant="grid"
        >
          <ul className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 md:gap-x-5 md:gap-y-8 lg:grid-cols-4 xl:grid-cols-5">
            {members.map((member) => (
              <li key={member.name} className="group">
                <div className="relative aspect-square overflow-hidden bg-white/5">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-2 text-sm leading-snug md:text-base">
                  {member.name}
                </h3>
                <p className="mt-0.5 text-xs text-moz-teal">
                  {member.description}
                </p>
              </li>
            ))}
          </ul>
        </RevealStagger>
      </div>
    </section>
  );
}
