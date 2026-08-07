export default function CTASection() {
    return (
        <section className="py-24 px-6 text-center">
            <div className="max-w-2xl mx-auto p-10 rounded-3xl border border-gray-700 bg-white/5 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-4">
                    Mantém-te ligado à comunidade
                </h2>
                <p className="text-gray-400 leading-relaxed mb-8">
                    O HackOnWednesdays chegou ao fim, mas a MozCyber Community continua activa. Segue-nos nas redes sociais para ficares a par das próximas iniciativas e eventos.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="https://instagram.com/mozcyber"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-colors"
                    >
                        Seguir no Instagram
                    </a>
                    <a
                        href="https://linkedin.com/company/mozcyber"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3 rounded-full border border-gray-600 text-gray-300 text-sm hover:border-gray-400 hover:text-white transition-colors"
                    >
                        LinkedIn
                    </a>
                </div>
            </div>
        </section>
    )
}
