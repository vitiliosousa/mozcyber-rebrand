export default function HeroSection() {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center text-center py-24 px-6">
            <div className="mb-6">
                <span className="text-xs font-mono tracking-[0.4em] text-white/40 uppercase">
                    MozCyber Community · Workshop
                </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight max-w-3xl mb-10">
                Um Ciberespaço Seguro e Resiliente em Moçambique
            </h1>

            <p className="text-white/50 text-sm sm:text-base max-w-md leading-relaxed mb-12">
                Um workshop sobre os desafios, estratégias e responsabilidades na construção de um ciberespaço mais seguro para Moçambique.
            </p>

            <div className="flex flex-col items-center gap-3">
                <div className="w-px h-8 bg-white/20" />
                <div className="flex flex-col sm:flex-row gap-3 text-xs sm:text-sm text-white/35 font-mono">
                    <span>27 de Fevereiro de 2026</span>
                    <span className="hidden sm:block text-white/20">·</span>
                    <span>Triana Business Lounge</span>
                </div>
            </div>
        </section>
    )
}
