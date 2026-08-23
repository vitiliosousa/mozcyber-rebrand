export default function BlogLoading() {
  return (
    <>
      <section className="bg-[#0b0f14] pt-20 pb-10 md:pt-24 md:pb-12">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="h-3 w-16 animate-pulse rounded bg-white/10" />
          <div className="mt-4 h-10 w-2/3 max-w-lg animate-pulse rounded bg-white/10 md:h-14" />
          <div className="mt-3 h-4 w-full max-w-2xl animate-pulse rounded bg-white/5" />
        </div>
      </section>

      <section className="bg-[#0b0f14] pb-12 md:pb-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mb-8 h-12 w-full animate-pulse rounded-lg border border-white/10 bg-white/3" />

          <ul className="border-t border-white/10">
            {Array.from({ length: 4 }).map((_, i) => (
              <li
                key={i}
                className="grid gap-4 border-b border-white/10 py-6 md:grid-cols-[12rem_1fr] md:items-center md:gap-8 md:py-7"
              >
                <div className="aspect-video animate-pulse bg-white/5" />
                <div>
                  <div className="h-3 w-40 animate-pulse rounded bg-white/10" />
                  <div className="mt-3 h-6 w-3/4 animate-pulse rounded bg-white/10" />
                  <div className="mt-3 h-4 w-full animate-pulse rounded bg-white/5" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
