import EventGrid from "@/components/EventGrid";
import { upcomingEvents } from "@/data/events";
import Link from "next/link";

export default function Events() {
  const preview = upcomingEvents.slice(0, 3);

  return (
    <section id="eventos" className="bg-[#0b0f14] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-moz-teal">
            Agenda
          </p>
          <h2 className="mt-4 text-3xl leading-tight md:text-5xl">
            Próximos{" "}
            <span className="font-black text-moz-teal">eventos</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-moz-muted">
            Workshops, hackathons, CTFs e palestras de literacia digital para
            fortalecer a comunidade de cibersegurança em Moçambique.
          </p>
        </div>

        <div className="mt-14 md:mt-16">
          <EventGrid events={preview} href="/eventos" actionLabel="Ver detalhes →" />
        </div>

        <div className="mt-12">
          <Link
            href="/eventos"
            className="inline-flex text-sm font-semibold text-moz-teal transition-colors hover:text-white"
          >
            Ver todos os eventos →
          </Link>
        </div>
      </div>
    </section>
  );
}
