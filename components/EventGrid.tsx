import type { EventItem } from "@/data/events";
import Image from "next/image";
import Link from "next/link";

type Props = {
  events: EventItem[];
  href?: string;
  actionLabel?: string;
};

export default function EventGrid({
  events,
  href = "/eventos",
  actionLabel = "Ver detalhes →",
}: Props) {
  return (
    <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-6 sm:gap-y-10">
      {events.map((event) => (
        <li key={event.title}>
          <Link href={href} className="group block">
            <div className="relative aspect-[16/10] overflow-hidden bg-white/5">
              <Image
                src={event.image}
                alt={event.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm">
              <span className="font-semibold uppercase tracking-[0.2em] text-moz-teal">
                {event.type}
              </span>
              <time className="text-moz-muted">{event.date}</time>
            </div>

            <h3 className="mt-2 text-lg leading-snug transition-colors group-hover:text-moz-teal md:text-xl">
              {event.title}
            </h3>
            <p className="mt-1 text-sm text-moz-muted">{event.place}</p>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              {event.desc}
            </p>
            <span className="mt-4 inline-block text-sm text-white/40 transition-colors group-hover:text-moz-teal">
              {actionLabel}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
