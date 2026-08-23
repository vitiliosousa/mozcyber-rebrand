export default function BlogPostLoading() {
  return (
    <article className="bg-[#0b0f14] pt-20 pb-12 md:pt-24 md:pb-16">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <div className="h-4 w-28 animate-pulse rounded bg-white/10" />

        <div className="mt-8">
          <div className="h-3 w-24 animate-pulse rounded bg-white/10" />
          <div className="mt-3 h-9 w-full animate-pulse rounded bg-white/10 md:h-12" />
          <div className="mt-2 h-9 w-2/3 animate-pulse rounded bg-white/10 md:h-12" />
          <div className="mt-6 h-4 w-56 animate-pulse rounded bg-white/5" />
        </div>

        <div className="mt-8 aspect-video animate-pulse bg-white/5 md:mt-10" />

        <div className="mt-10 space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-4 animate-pulse rounded bg-white/5"
              style={{ width: `${100 - (i % 3) * 15}%` }}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
