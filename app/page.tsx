import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/Background.png"
          alt="Background"
          fill
          quality={75}
          className="object-cover"
          priority
        />
        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-black/65" />
      </div>

      {/* Conteúdo */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-10">
        <Image
          src="/Logo.png"
          alt="Mozcyber Logo"
          width={150}
          height={150}
          className="mb-8 drop-shadow-lg"
          priority
        />
        <h1 className="text-6xl">mozcyber</h1>
          <div className="w-16 h-0.5 bg-white/40 mx-auto my-6" />

        <p className="text-white font-light leading-relaxed">
          O site encontra-se actualmente em manutenção.
          <br />
          Voltamos em breve.
        </p>
      </main>
    </div>
  );
}
