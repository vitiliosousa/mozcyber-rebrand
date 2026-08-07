export default function GallerySection() {
    const placeholders = Array.from({ length: 6 })

    return (
        <section className="py-24 px-6 text-center">
            <div className="mb-12 flex justify-center">
                <div className="px-6 py-2 rounded-full border border-white/25 text-white text-sm tracking-widest bg-white/[0.03] backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
                    Galeria
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {placeholders.map((_, i) => (
                    <div
                        key={i}
                        className="aspect-video rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md flex items-center justify-center hover:border-white/25 transition-colors"
                    >
                        <span className="text-white/20 text-xs font-mono">foto {i + 1}</span>
                    </div>
                ))}
            </div>

            <p className="mt-8 text-white/30 text-sm">
                As fotos do evento serão adicionadas em breve.
            </p>
        </section>
    )
}
