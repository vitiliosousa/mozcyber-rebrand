export default function GallerySection() {
    const placeholders = Array.from({ length: 4 })

    return (
        <section className="py-24 px-6 max-w-5xl mx-auto">
            <div className="mb-12">
                <span className="text-xs font-mono tracking-[0.3em] text-indigo-300/40 uppercase block mb-4">
                    Galeria
                </span>
                <h2 className="text-2xl font-bold text-white">
                    Momentos do evento.
                </h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {placeholders.map((_, i) => (
                    <div
                        key={i}
                        className="aspect-video rounded-2xl border border-indigo-400/10 bg-indigo-400/5 flex items-center justify-center"
                    >
                        <span className="text-indigo-300/20 text-xs font-mono">foto {i + 1}</span>
                    </div>
                ))}
            </div>
        </section>
    )
}
