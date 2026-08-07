"use client";

import RevealStagger from "@/components/animations/RevealStagger";
import EventGrid from "@/components/EventGrid";
import { events } from "@/data/events";
import { useState } from "react";

const PER_PAGE = 9;

export default function EventsUpcoming() {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(events.length / PER_PAGE);
  const pageEvents = events.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  return (
    <section id="proximos" className="bg-[#0b0f14] pb-12 md:pb-16">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <RevealStagger
          key={page}
          selector=":scope li"
          stagger={0.08}
          variant="cards"
        >
          <EventGrid events={pageEvents} actionLabel="Ver detalhes →" />
        </RevealStagger>

        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              aria-label="Página anterior"
              className="flex size-11 items-center justify-center rounded-lg border border-white/20 text-white transition-colors hover:border-moz-teal hover:text-moz-teal disabled:pointer-events-none disabled:opacity-30"
            >
              ←
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPage(i)}
                aria-label={`Página ${i + 1}`}
                aria-current={page === i ? "page" : undefined}
                className={`flex size-11 items-center justify-center rounded-lg border text-sm transition-colors ${
                  page === i
                    ? "border-moz-teal bg-moz-teal text-[#0b0f14]"
                    : "border-white/20 text-white hover:border-moz-teal hover:text-moz-teal"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              aria-label="Próxima página"
              className="flex size-11 items-center justify-center rounded-lg border border-white/20 text-white transition-colors hover:border-moz-teal hover:text-moz-teal disabled:pointer-events-none disabled:opacity-30"
            >
              →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
