import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-10">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-purple-300/50">
            MozCyber Community · Evento
          </span>
        </div>

        <Image
          src="/logos/womancyberlogo.png"
          alt="Woman in Cyber"
          width={288}
          height={288}
          className="mx-auto mb-10 w-40 sm:w-56 md:w-72"
        />

        <p className="mb-12 max-w-md text-base leading-relaxed text-purple-100/70 italic sm:text-xl">
          &quot;O futuro digital também é feminino.&quot;
        </p>

        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-px bg-purple-400/25" />
          <div className="flex flex-col gap-3 font-mono text-sm text-purple-200/50 sm:flex-row">
            <span>24 de Outubro</span>
            <span className="hidden text-purple-400/30 sm:block">·</span>
            <span>16:30</span>
            <span className="hidden text-purple-400/30 sm:block">·</span>
            <span>Triana Business Lounge</span>
          </div>
        </div>
      </div>
    </section>
  );
}
