export default function HeroSection() {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center text-center py-24 px-6">
            <div className="mb-6">
                <span className="text-xs font-mono tracking-[0.4em] text-gray-400 uppercase">
                    MozCyber Community · Workshop
                </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight max-w-2xl mb-4">
                Cloud Security
            </h1>
            <p className="text-xl sm:text-2xl text-gray-400 font-light mb-10 max-w-xl">
                A Practical Guide to Zero-Trust
            </p>

            <p className="text-gray-500 text-sm sm:text-base max-w-md leading-relaxed mb-12">
                Um workshop intensivo sobre arquitectura Zero-Trust e as melhores práticas de segurança em ambientes cloud — conduzido por um especialista da indústria.
            </p>

            <div className="flex flex-col items-center gap-3">
                <div className="w-px h-8 bg-gray-300" />
                <div className="flex flex-col sm:flex-row gap-3 text-xs sm:text-sm text-gray-400 font-mono">
                    <span>04 de Setembro de 2025</span>
                    <span className="hidden sm:block text-gray-300">·</span>
                    <span>Triana Business Lounge</span>
                </div>
            </div>
        </section>
    )
}
