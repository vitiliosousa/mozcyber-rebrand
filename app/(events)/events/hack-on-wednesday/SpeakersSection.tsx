import Image from "next/image";

interface Speaker {
  name: string;
  image: string;
}

const speakers: Speaker[] = [
  { name: "Fábio White", image: "/speakers/bw_fabio.png" },
  { name: "Elton Nhaca", image: "/speakers/bw_elton.png" },
  { name: "Patrício Massinga", image: "/speakers/bw_patricio.png" },
  { name: "Muthimbane Langa", image: "/speakers/bw_muthimbane.png" },
  { name: "Roberto Júnior", image: "/speakers/bw_roberto.png" },
  { name: "Walter Cumbucane", image: "/speakers/WalterCumbucaneHow.png" },
  { name: "Arlindo Júnior", image: "/speakers/ArlindoJuniorHow.png" },
];

function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <div className="flex flex-col items-center">
      <div className="rounded-2xl border border-gray-600 bg-white/5 p-2">
        <Image
          src={speaker.image}
          alt={speaker.name}
          width={160}
          height={160}
          className="rounded-xl object-cover grayscale"
        />
      </div>
      <p className="mt-4 text-gray-300">{speaker.name}</p>
    </div>
  );
}

export default function SpeakersSection() {
  const topRow = speakers.slice(0, 4);
  const bottomRow = speakers.slice(4);

  return (
    <section className="px-6 py-24 text-center">
      <div className="mb-12">
        <span className="rounded-full border border-gray-600 px-6 py-2 text-sm text-gray-300 backdrop-blur-sm">
          Os Atacantes
        </span>
      </div>
      <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-10">
        {topRow.map((speaker) => (
          <SpeakerCard key={speaker.name} speaker={speaker} />
        ))}
      </div>

      {bottomRow.length > 0 && (
        <div className="mx-auto mt-10 flex max-w-6xl justify-center gap-10">
          {bottomRow.map((speaker) => (
            <SpeakerCard key={speaker.name} speaker={speaker} />
          ))}
        </div>
      )}
    </section>
  );
}
