import type { Metadata } from "next";
import EventsCta from "@/components/events/EventsCta";
import EventsHero from "@/components/events/EventsHero";
import EventsUpcoming from "@/components/events/EventsUpcoming";

export const metadata: Metadata = {
  title: "Eventos | Mozcyber",
  description:
    "Workshops, hackathons, CTFs e palestras de literacia digital da comunidade Mozcyber em Moçambique.",
};

export default function EventosPage() {
  return (
    <>
      <EventsHero />
      <EventsUpcoming />
      <EventsCta />
    </>
  );
}
