import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="bg-[#0b0f14] pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-moz-teal">
          Sobre nós
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl leading-[1.15] md:text-6xl lg:text-7xl">
          Quem somos e{" "}
          <span className="font-black text-moz-teal">porquê</span> existimos
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-moz-muted md:mt-8 md:text-xl">
          A Mozcyber é uma comunidade de cibersegurança em Moçambique. Reunimos
          estudantes, profissionais e curiosos para aprender, praticar e
          partilhar conhecimento através de workshops, hackathons, CTFs e
          palestras de literacia digital.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-3 md:mt-16 md:grid-cols-4 md:gap-4">
          {[
            {
              src: "/about/comunidade.jpg",
              alt: "Membros da comunidade a colaborar",
              className: "aspect-[4/5] md:aspect-[3/4]",
            },
            {
              src: "/about/workshop.jpg",
              alt: "Sessão de workshop prático",
              className: "aspect-[4/5] md:aspect-[3/4] md:mt-10",
            },
            {
              src: "/about/colaboracao.jpg",
              alt: "Equipa a trabalhar em conjunto",
              className: "aspect-[4/5] md:aspect-[3/4]",
            },
            {
              src: "/about/formacao.jpg",
              alt: "Momento de formação e partilha",
              className: "aspect-[4/5] md:aspect-[3/4] md:mt-10",
            },
          ].map((photo) => (
            <div
              key={photo.src}
              className={`relative overflow-hidden bg-white/5 ${photo.className}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
                priority={photo.src.includes("comunidade")}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
