export default function CTASection() {
    return (
        <section className="py-32 px-6 text-center">
            <div className="max-w-xl mx-auto">
                <p className="text-xs font-mono tracking-[0.4em] text-purple-300/40 uppercase mb-8">
                    MozCyber Community
                </p>

                <h2 className="text-3xl text-white mb-6 leading-snug">
                    Se és mulher e queres entrar na cibersegurança —<br />
                    <span className="text-purple-300/70">este espaço é teu.</span>
                </h2>

                <p className="text-purple-100/50 leading-relaxed mb-10">
                    Segue a MozCyber Community e fica a par dos próximos eventos, iniciativas e oportunidades para mulheres no mundo digital.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="https://instagram.com/mozcyber"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3 rounded-full bg-white text-black text-sm hover:bg-purple-100 transition-colors"
                    >
                        Seguir no Instagram
                    </a>
                    <a
                        href="https://linkedin.com/company/mozcyber"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3 rounded-full border border-purple-400/30 text-purple-200/70 text-sm hover:border-purple-400/60 hover:text-white transition-colors"
                    >
                        LinkedIn
                    </a>
                </div>
            </div>
        </section>
    )
}
