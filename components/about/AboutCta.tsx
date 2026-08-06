import Link from "next/link";

export default function AboutCta() {
  return (
    <section className="border-t border-white/10 bg-[#0b0f14] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 text-center md:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-moz-teal">
          Junta-te
        </p>
        <h2 className="mx-auto mt-4 max-w-3xl text-3xl leading-tight md:text-5xl">
          Pronto para fazer parte da{" "}
          <span className="font-black text-moz-teal">Mozcyber</span>?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-moz-muted">
          Vê os próximos eventos, participa num workshop ou CTF, ou fala
          connosco se quiseres contribuir com a comunidade.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
          <Link
            href="/eventos"
            className="rounded-lg bg-moz-teal px-8 py-3 text-sm font-semibold text-[#0b0f14] transition-colors hover:bg-white"
          >
            Ver eventos
          </Link>
          <Link
            href="/contacto"
            className="rounded-lg border border-white/25 px-8 py-3 text-sm font-semibold text-white transition-colors hover:border-moz-teal hover:text-moz-teal"
          >
            Contactar
          </Link>
        </div>
      </div>
    </section>
  );
}
