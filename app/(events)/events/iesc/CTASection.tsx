export default function CTASection() {
    return (
        <section className="py-24 px-6 max-w-5xl mx-auto">
            <div className="border-t border-indigo-400/15 pt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
                <div>
                    <span className="text-xs font-mono tracking-[0.3em] text-indigo-300/40 uppercase block mb-4">
                        Continua o debate
                    </span>
                    <h2 className="text-2xl font-bold text-white max-w-sm leading-snug">
                        A ética na cibersegurança não terminou aqui.
                    </h2>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                    <a
                        href="https://instagram.com/mozcyber"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-indigo-100 transition-colors text-center"
                    >
                        Instagram
                    </a>
                    <a
                        href="https://linkedin.com/company/mozcyber"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3 rounded-full border border-indigo-400/30 text-indigo-200/70 text-sm hover:border-indigo-400/60 hover:text-white transition-colors text-center"
                    >
                        LinkedIn
                    </a>
                </div>
            </div>
        </section>
    )
}
