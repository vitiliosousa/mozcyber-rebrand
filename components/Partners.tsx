import Reveal from "@/components/animations/Reveal";
import RevealStagger from "@/components/animations/RevealStagger";
import { partners } from "@/data/partners";
import Image from "next/image";

export default function Partners() {
  return (
    <section
      id="parceiros"
      className="border-t border-white/10 bg-[#0b0f14] py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-moz-teal">
            Rede
          </p>
          <h2 className="mt-4 text-3xl leading-tight md:text-5xl">
            Nossos{" "}
            <span className="font-black text-moz-teal">parceiros</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-moz-muted">
            Instituições e comunidades que caminham connosco na construção de
            uma Moçambique digitalmente mais segura.
          </p>
        </Reveal>

        <RevealStagger
          className="mt-14 md:mt-16"
          selector=":scope li"
          stagger={0.07}
          variant="grid"
        >
          <ul className="grid grid-cols-2 border border-white/10 sm:grid-cols-3 lg:grid-cols-4">
            {partners.map((partner) => (
              <li
                key={partner.name}
                className="flex aspect-4/3 items-center justify-center border border-white/10 px-6 transition-colors hover:bg-white/3"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={160}
                  height={64}
                  className="max-h-12 w-auto object-contain opacity-70 transition-opacity hover:opacity-100 md:max-h-14"
                />
              </li>
            ))}
          </ul>
        </RevealStagger>
      </div>
    </section>
  );
}
