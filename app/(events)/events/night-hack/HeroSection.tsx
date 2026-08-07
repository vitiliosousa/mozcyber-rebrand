import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center px-6 py-24 text-center md:py-40">
      <div className="mb-8">
        <Image
          src="/logos/NH.png"
          alt="MozCyber Community"
          width={160}
          height={160}
          className="mx-auto w-28 sm:w-36 md:w-40"
        />
      </div>

      <div className="mb-8">
        <Image
          src="/logos/NIGHT_HACK.png"
          alt="Night Hack"
          width={160}
          height={160}
          className="mx-auto w-28 sm:w-36 md:w-40"
        />
      </div>

      <div className="flex justify-center">
        <div className="rounded-full border border-white/25 bg-white/[0.03] px-4 py-2 text-xs tracking-wide text-white shadow-[0_0_0_1px_rgba(255,255,255,0.05)] backdrop-blur-md sm:px-6 sm:text-sm sm:tracking-widest">
          Uma iniciativa da MozCyber Community
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-3">
        <div className="h-8 w-px bg-white/10" />
        <div className="flex flex-col gap-3 font-mono text-sm text-white/30 sm:flex-row">
          <span>05 Abr – 03 Mai 2025</span>
          <span className="hidden text-white/15 sm:block">·</span>
          <span>ISUTC</span>
        </div>
      </div>
    </section>
  );
}
