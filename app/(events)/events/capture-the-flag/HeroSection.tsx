export default function HeroSection() {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center text-center py-24 px-6 relative overflow-hidden">
            {/* Decorative grid */}
            <div
                className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            <div className="relative z-10 flex flex-col items-center">
                <div className="mb-6">
                    <span className="text-xs font-mono tracking-[0.4em] text-white/30 uppercase">
                        MozCyber Community · Primeira Edição
                    </span>
                </div>

                <div className="mb-4">
                    <span className="text-xs font-mono tracking-[0.3em] text-white/20 uppercase border border-white/15 px-4 py-1 rounded-full">
                        CTF
                    </span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight max-w-2xl mb-6">
                    CAPTURE<br />THE <br /> FLAG
                </h1>

                <p className="text-white/50 text-sm sm:text-base max-w-md leading-relaxed mb-12">
                    A competição que encerrou o Night Hack, onde os participantes colocaram à prova tudo o que aprenderam ao longo das 4 sessões.
                </p>

                <div className="flex flex-col items-center gap-3">
                    <div className="w-px h-8 bg-white/15" />
                    <div className="flex flex-col sm:flex-row gap-3 text-xs sm:text-sm text-white/30 font-mono">
                        <span>10 de Maio de 2025</span>
                        <span className="hidden sm:block text-white/15">·</span>
                        <span>USTM</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
