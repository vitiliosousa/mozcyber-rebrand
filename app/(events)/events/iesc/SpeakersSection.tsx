import Image from "next/image";

const speakers: {
  name: string;
  title: string;
  company: string;
  image?: string;
}[] = [
  {
    name: "Arafat Bique",
    title: "Chief Information Security Officer (CISO)",
    company: "BCI",
    image: "/speakers/arafat_bique.png",
  },
  {
    name: "Jaime Mulhovo",
    title: "Regional Chief Information Security Officer (CISO)",
    company: "Access Bank",
    image: "/speakers/jaime_mulhovo.png",
  },
  {
    name: "Pragnesh Nanji",
    title: "Information Technology Specialist",
    company: "Kudumba Investments",
    image: "/speakers/pragnesh_nanji.png",
  },
  {
    name: "Paulo Mandlate",
    title: "IT Manager",
    company: "Banco Letshego",
    image: "/speakers/paulo_mandlate.png",
  },
  {
    name: "Gerson Jamal",
    title: "Manager: Cyber Defense",
    company: "Vodacom Moçambique",
  },
];

export default function SpeakersSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <div className="mb-12">
        <span className="mb-4 block font-mono text-xs uppercase tracking-[0.3em] text-indigo-300/40">
          Painel
        </span>
        <h2 className="text-2xl font-bold text-white">
          Quem conduziu o debate.
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {speakers.map((speaker) => (
          <div
            key={speaker.name}
            className="flex flex-col overflow-hidden rounded-2xl border border-indigo-400/15 bg-indigo-400/5 transition-colors hover:border-indigo-400/30"
          >
            <div className="relative aspect-square w-full">
              {speaker.image ? (
                <Image
                  src={speaker.image}
                  alt={speaker.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-indigo-400/10">
                  <span className="text-4xl font-bold text-indigo-300/30">
                    {speaker.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            <div className="p-4">
              <p className="text-sm leading-snug font-medium text-white">
                {speaker.name}
              </p>
              <p className="mt-1 text-xs leading-snug text-indigo-200/50">
                {speaker.title}
              </p>
              <p className="mt-0.5 text-xs text-indigo-300/35">
                {speaker.company}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
