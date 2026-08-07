import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="flex h-screen flex-col items-center justify-center px-6 py-24 text-center md:py-40">
      <div className="mb-8">
        <Image
          src="/logos/hashtag_how.png"
          alt="Hack On Wednesdays"
          width={320}
          height={160}
          className="mx-auto w-56 sm:w-64 md:w-80"
        />
      </div>

      <div className="mt-6 rounded-full border border-gray-600 px-4 py-2 text-xs text-gray-300 backdrop-blur-sm sm:px-6 sm:text-sm">
        Uma iniciativa da MozCyber Community
      </div>

      <div className="mt-8 flex flex-col items-center gap-3">
        <div className="h-8 w-px bg-gray-600/50" />
        <div className="flex flex-col gap-3 font-mono text-sm text-gray-500 sm:flex-row">
          <span>21 Ago – 16 Out 2024</span>
          <span className="hidden text-gray-700 sm:block">·</span>
          <span>Online</span>
        </div>
      </div>
    </section>
  );
}
