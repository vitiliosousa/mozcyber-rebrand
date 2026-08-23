export default function AuthorLoading() {
  return (
    <section className="bg-[#0b0f14] pt-20 pb-12 md:pt-24 md:pb-16">
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <div className="h-4 w-16 animate-pulse rounded bg-white/10" />
        <div className="mt-6 h-9 w-64 animate-pulse rounded bg-white/10 md:h-11" />
        <div className="mt-3 h-4 w-40 animate-pulse rounded bg-white/5" />

        <ul className="mt-12 border-t border-white/10">
          {Array.from({ length: 3 }).map((_, i) => (
            <li key={i} className="border-b border-white/10 py-6">
              <div className="flex gap-5">
                <div className="hidden aspect-video w-40 shrink-0 animate-pulse bg-white/5 sm:block" />
                <div className="flex-1">
                  <div className="h-3 w-24 animate-pulse rounded bg-white/10" />
                  <div className="mt-3 h-6 w-3/4 animate-pulse rounded bg-white/10" />
                  <div className="mt-3 h-4 w-32 animate-pulse rounded bg-white/5" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
