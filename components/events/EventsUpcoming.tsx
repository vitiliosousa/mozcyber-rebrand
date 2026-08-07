import RevealStagger from "@/components/animations/RevealStagger";
import EventGrid from "@/components/EventGrid";
import { events } from "@/data/events";

export default function EventsUpcoming() {
  return (
    <section id="proximos" className="bg-[#0b0f14] pb-20 md:pb-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <RevealStagger selector=":scope li" stagger={0.08} variant="cards">
          <EventGrid events={events} actionLabel="Ver detalhes →" />
        </RevealStagger>
      </div>
    </section>
  );
}
