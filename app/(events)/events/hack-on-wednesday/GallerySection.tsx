export default function GallerySection() {
    const placeholders = Array.from({ length: 6 })

    return (
        <section className="py-24 px-6 text-center">
            <div className="mb-12">
                <span className="px-6 py-2 rounded-full border border-gray-600 text-sm text-gray-300 backdrop-blur-sm">
                    Galeria
                </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {placeholders.map((_, i) => (
                    <div
                        key={i}
                        className="aspect-video rounded-2xl border border-gray-700 bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm flex items-center justify-center"
                    >
                        <span className="text-gray-600 text-xs font-mono">foto {i + 1}</span>
                    </div>
                ))}
            </div>

            <p className="mt-8 text-gray-500 text-sm">
                As fotos do evento serão adicionadas em breve.
            </p>
        </section>
    )
}
