import Image from "next/image";

const retro = { fontFamily: "'Press Start 2P', monospace" };

const speakers: {
  name: string;
  role: string;
  org: string;
  session: string;
  image: string;
}[] = [
  {
    name: "Patricio Massinga",
    role: "Tech Specialist",
    org: "MozCyber",
    session: "01 — Mobile Hacking",
    image: "/speakers/Patricio Massinga - HOS.png",
  },
  {
    name: "Muthimbane Langa",
    role: "Tech Specialist Lead",
    org: "MozCyber",
    session: "02 — Active Directory Hacking",
    image: "/speakers/Muthimbane Langa - HOS.png",
  },
  {
    name: "Elton Nhaca",
    role: "Tech Specialist",
    org: "MozCyber",
    session: "03 — Web Hacking",
    image: "/speakers/Elton Nhaca - HOS.png",
  },
];

export default function SpeakersSection() {
  return (
    <section className="bg-black px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <p
          style={retro}
          className="mb-10 text-[10px] uppercase tracking-[0.3em] text-green-500/40"
        >
          &gt; INSTRUTORES
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {speakers.map((s) => (
            <div
              key={s.name}
              className="flex h-full flex-col overflow-hidden border border-green-500/15 bg-green-500/[0.02]"
            >
              <div className="relative aspect-square w-full">
                <Image
                  src={s.image}
                  alt={s.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>

              <div className="flex flex-1 flex-col gap-2 p-6">
                <p
                  style={retro}
                  className="text-[10px] leading-relaxed text-green-400"
                >
                  {s.name}
                </p>
                <p
                  style={retro}
                  className="text-[9px] leading-relaxed text-green-500/40"
                >
                  {s.role}
                </p>
                <p style={retro} className="text-[9px] text-green-500/25">
                  {s.org}
                </p>
              </div>

              <div className="border-t border-green-500/10 px-6 pt-4 pb-6">
                <p
                  style={retro}
                  className="text-[9px] leading-relaxed text-red-500/50"
                >
                  {s.session}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
