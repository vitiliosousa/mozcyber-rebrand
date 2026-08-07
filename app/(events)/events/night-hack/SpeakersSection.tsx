import Image from "next/image";

interface Speaker {
  name: string;
  image: string;
  title: string;
}

const speakers: Speaker[] = [
  {
    name: "Gérsica Matsinhe",
    image: "/speakers/gessica.png",
    title: "Network Engineer (CyberSec) & Cloud Support, BCX",
  },
  {
    name: "Marco Ferreira",
    image: "/speakers/marco.png",
    title: "Head of Cybersecurity, Vodacom",
  },
  {
    name: "Américo Júnior",
    image: "/speakers/americo.png",
    title: "CTO (Nexus) & Ethicak Hacker, Cybersecurity Researcher",
  },
  {
    name: "Vanildo Perdo",
    image: "/speakers/vanildo.png",
    title: "Business Owner, Empire Cybersecurity",
  },
  {
    name: "Muthimbane Langa",
    image: "/speakers/nh_muthimbax.png",
    title: "Tech Specialist, Mozcyber",
  },
];

function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <div className="flex flex-col items-center">
      <div className="rounded-full bg-white/5">
        <Image
          src={speaker.image}
          alt={speaker.name}
          width={170}
          height={170}
          className="rounded-full"
        />
      </div>
      <div className="mt-4 flex min-h-16 w-full max-w-[13rem] flex-col items-center justify-center gap-1 rounded-3xl border border-white/25 bg-white/[0.03] px-4 py-3 shadow-[0_0_0_1px_rgba(255,255,255,0.05)] backdrop-blur-md">
        <p className="text-sm font-medium text-white">{speaker.name}</p>
        <p className="text-xs leading-snug text-white/50">{speaker.title}</p>
      </div>
    </div>
  );
}

export default function SpeakersSection() {
  const topRow = speakers.slice(0, 3);
  const bottomRow = speakers.slice(3);

  return (
    <section className="px-6 py-24 text-center">
      <div className="mb-12">
        <div className="flex justify-center">
          <div className="rounded-full border border-white/25 bg-white/[0.03] px-6 py-2 text-xs tracking-wide text-white shadow-[0_0_0_1px_rgba(255,255,255,0.05)] backdrop-blur-md sm:text-sm sm:tracking-widest">
            Oradores
          </div>
        </div>
      </div>
      <div className="mx-auto grid max-w-4xl grid-cols-1 place-items-center gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {topRow.map((speaker) => (
          <SpeakerCard key={speaker.name} speaker={speaker} />
        ))}
      </div>

      {bottomRow.length > 0 && (
        <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-10">
          {bottomRow.map((speaker) => (
            <SpeakerCard key={speaker.name} speaker={speaker} />
          ))}
        </div>
      )}
    </section>
  );
}
