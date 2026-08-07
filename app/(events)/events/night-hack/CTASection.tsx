export default function CTASection() {
    return (
        <section className="py-24 px-6 text-center">
            <div className="max-w-2xl mx-auto p-10 rounded-3xl border border-white/15 bg-white/[0.03] backdrop-blur-md">
                <h2 className="text-2xl font-bold text-white mb-4">
                    Fica a par das próximas iniciativas
                </h2>
                <p className="text-white/60 leading-relaxed mb-8">
                    O Night Hack ficará para sempre na memória da comunidade. Segue a MozCyber Community para seres o primeiro a saber dos próximos eventos.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="https://instagram.com/mozcyber"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 transition-colors"
                    >
                        Seguir no Instagram
                    </a>
                    <a
                        href="https://linkedin.com/company/mozcyber"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3 rounded-full border border-white/25 text-white text-sm hover:border-white/50 transition-colors"
                    >
                        LinkedIn
                    </a>
                </div>
            </div>
        </section>
    )
}
