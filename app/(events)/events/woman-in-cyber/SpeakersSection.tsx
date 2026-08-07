import Image from "next/image";

const speakers: {
  name: string;
  title: string;
  company: string;
  image: string;
}[] = [
  {
    name: "Chelsea Bucuane",
    title: "Network & Cybersecurity",
    company: "Triana Business",
    image: "/speakers/chelsea_bucuane.png",
  },
  {
    name: "Cintia Banze",
    title: "Head of Information Technology",
    company: "Hollard Seguros",
    image: "/speakers/cintia_banze.png",
  },
  {
    name: "Suelly Pereira",
    title: "Head of IT & Telecommunications",
    company: "Hidroelétrica de Cahora Bassa (HCB)",
    image: "/speakers/suelly_pereira.png",
  },
  {
    name: "Sázia de Sousa",
    title: "Managing Director",
    company: "Technoplus",
    image: "/speakers/sazia_sousa.png",
  },
];

export default function SpeakersSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <div className="mb-12">
        <span className="mb-4 block font-mono text-xs uppercase tracking-[0.3em] text-purple-300/40">
          Oradoras
        </span>
        <h2 className="text-2xl text-white">
          As vozes que marcaram o evento.
        </h2>
      </div>

      <div className="mb-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {speakers.map((speaker) => (
          <div
            key={speaker.name}
            className="flex flex-col overflow-hidden rounded-2xl border border-purple-400/15 bg-purple-400/5 transition-colors hover:border-purple-400/30"
          >
            <div className="relative aspect-square w-full">
              <Image
                src={speaker.image}
                alt={speaker.name}
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
            </div>
            <div className="p-4">
              <p className="text-sm leading-snug font-medium text-white">
                {speaker.name}
              </p>
              <p className="mt-1 text-xs leading-snug text-purple-200/50">
                {speaker.title}
              </p>
              <p className="mt-0.5 text-xs text-purple-300/35">
                {speaker.company}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-purple-400/10 pt-8">
        <span className="mb-5 block font-mono text-xs uppercase tracking-[0.3em] text-purple-300/40">
          Moderadora
        </span>
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl border border-purple-400/20">
            <Image
              src="/speakers/michelle_new.jpeg"
              alt="Michelle Chuva"
              fill
              className="object-cover object-top"
              sizes="128px"
            />
          </div>
          <div>
            <p className="text-lg font-medium text-white">Michelle Chuva</p>
            <p className="mt-1 text-sm text-purple-200/50">
              Marketing & Communication Specialist
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
