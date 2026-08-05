import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-dvh flex-col items-center justify-center px-6 text-center md:px-10"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/Background.png"
          alt=""
          fill
          quality={75}
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#0b0f14]/75" />
        <div className="hero-grid absolute inset-0 opacity-60" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#0b0f14]" />
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-moz-teal md:mb-6">
          Mozcyber
        </p>

        <h1 className="max-w-4xl text-4xl leading-[1.15] md:text-6xl lg:text-7xl">
          Segurança{" "}
          <span className="font-black text-moz-teal">Digital</span>
          <br />
          em Moçambique
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-moz-muted md:mt-8 ">
          Comunidade dedicada à proteção de dados, formação em cibersegurança e
          construção de uma cultura digital mais segura em Moçambique.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:gap-5">
          <Link
            href="#eventos"
            className="rounded-lg bg-moz-teal px-8 py-3 text-sm font-semibold text-[#0b0f14] transition-colors hover:bg-white"
          >
            Ver eventos
          </Link>
          <Link
            href="#fazemos"
            className="rounded-lg border border-white/25 px-8 py-3 text-sm font-semibold text-white transition-colors hover:border-moz-teal hover:text-moz-teal"
          >
            Saiba mais
          </Link>
        </div>
      </div>
    </section>
  );
}
