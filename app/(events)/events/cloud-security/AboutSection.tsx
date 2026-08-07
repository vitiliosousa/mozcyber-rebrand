export default function AboutSection() {
    return (
        <section className="py-24 px-6 max-w-5xl mx-auto">
            <span className="text-xs font-mono tracking-[0.3em] text-gray-400 uppercase block mb-12">
                Sobre o workshop
            </span>

            {/* Big statement */}
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 leading-tight mb-16 max-w-3xl">
                Nunca confiar.{" "}
                <span className="text-gray-400">Sempre verificar.</span>
            </p>

            {/* Body */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-gray-200 pt-12">
                <p className="text-gray-600 leading-relaxed">
                    O workshop <span className="text-gray-900 font-medium">Cloud Security: A Practical Guide to Zero-Trust</span> explorou os fundamentos e a aplicação prática do modelo Zero-Trust em ambientes cloud modernos — uma abordagem essencial numa era em que o perímetro tradicional de rede já não existe.
                </p>
                <p className="text-gray-400 leading-relaxed">
                    Através de exemplos reais e demonstrações práticas, os participantes ficaram a conhecer as ferramentas, os princípios e as estratégias necessárias para proteger infraestruturas cloud de forma eficaz.
                </p>
            </div>

            {/* Inline tags */}
            <div className="flex flex-wrap gap-3 mt-12">
                {["Zero-Trust", "Cloud Architecture", "IAM", "Micro-segmentação", "Workshop Presencial"].map((tag) => (
                    <span
                        key={tag}
                        className="text-xs font-mono text-gray-500 border border-gray-200 bg-white px-3 py-1.5 rounded-full"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </section>
    )
}
