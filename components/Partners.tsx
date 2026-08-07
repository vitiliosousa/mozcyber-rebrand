import Reveal from "@/components/animations/Reveal";
import RevealStagger from "@/components/animations/RevealStagger";
import { partners } from "@/data/partners";
import Image from "next/image";

export default function Partners() {
  return (
    <section
      id="parceiros"
      className="flex min-h-dvh flex-col justify-center border-t border-white/10 bg-[#0b0f14] py-12 md:min-h-screen md:py-0"
    >
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-moz-teal">
            Rede
          </p>
          <h2 className="mt-2 text-2xl leading-tight md:text-4xl">
            Nossos{" "}
            <span className="font-black text-moz-teal">parceiros</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-moz-muted">
            Instituições e comunidades que caminham connosco na construção de
            uma Moçambique digitalmente mais segura.
          </p>
        </Reveal>

        <RevealStagger
          className="mt-8 w-full md:mt-10"
          selector=":scope li"
          stagger={0.07}
          variant="grid"
        >
          <ul className="grid w-full grid-cols-2 border border-white/10 sm:grid-cols-4">
            {partners.map((partner) => (
              <li
                key={partner.name}
                className="flex min-h-28 items-center justify-center border border-white/10 px-6 py-10 transition-colors hover:bg-white/3 md:min-h-36 md:px-8"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={180}
                  height={72}
                  className="max-h-12 w-auto max-w-full object-contain opacity-70 transition-opacity hover:opacity-100 md:max-h-14"
                />
              </li>
            ))}
          </ul>
        </RevealStagger>
      </div>
    </section>
  );
}
