import Link from "next/link";

export default function EventsCta() {
  return (
    <section className="border-t border-white/10 bg-[#0b0f14] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 text-center md:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-moz-teal">
          Participa
        </p>
        <h2 className="mx-auto mt-4 max-w-3xl text-3xl leading-tight md:text-5xl">
          Queres organizar ou{" "}
          <span className="font-black text-moz-teal">propor</span> um evento?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-moz-muted">
          Se tens um tema, um espaço ou uma ideia para a comunidade, fala
          connosco. Valorizamos quem quer contribuir.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
          <Link
            href="/contacto"
            className="rounded-lg bg-moz-teal px-8 py-3 text-sm font-semibold text-[#0b0f14] transition-colors hover:bg-white"
          >
            Contactar
          </Link>
          <Link
            href="/sobre"
            className="rounded-lg border border-white/25 px-8 py-3 text-sm font-semibold text-white transition-colors hover:border-moz-teal hover:text-moz-teal"
          >
            Sobre a Mozcyber
          </Link>
        </div>
      </div>
    </section>
  );
}
