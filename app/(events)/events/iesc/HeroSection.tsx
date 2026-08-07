export default function HeroSection() {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 relative">
            {/* Decorative top label */}
            <div className="mb-10">
                <span className="text-xs font-mono tracking-[0.4em] text-indigo-300/40 uppercase">
                    MozCyber Community
                </span>
            </div>

            {/* Main question */}
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl mb-8">
                A IMPORTÂNCIA DA ÉTICA NA SEGURANÇA CIBERNÉTICA
            </h1>

            <p className="text-indigo-100/50 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed mb-12">
                QUANDO A TÉCNICA ENCONTRA A ÉTICA, NASCE A VERDADEIRA SEGURANÇA CIBERNÉTICA
            </p>

            {/* Date & Location */}
            <div className="flex flex-col items-center gap-3">
                <div className="w-px h-10 bg-indigo-400/20" />
                <div className="flex flex-col sm:flex-row gap-3 text-sm text-indigo-200/40 font-mono">
                    <span>23 de Agosto de 2025</span>
                    <span className="hidden sm:block text-indigo-400/20">·</span>
                    <span>Escola Superior de Ciências Náuticas</span>
                </div>
            </div>
        </section>
    )
}
