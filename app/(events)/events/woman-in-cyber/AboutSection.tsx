export default function AboutSection() {
    return (
        <section className="py-24 px-6 max-w-4xl mx-auto text-center">
            <p className="text-xs font-mono tracking-[0.4em] text-purple-300/40 uppercase mb-16">
                Sobre o evento
            </p>

            {/* Big statement */}
            <p className="text-4xl md:text-5xl text-white leading-tight mb-12">
                Em Moçambique, as mulheres{" "}
                <span className="text-purple-300/70">já estão a liderar</span>{" "}
                a cibersegurança.
            </p>

            <p className="text-purple-100/55 text-lg leading-relaxed max-w-2xl mx-auto mb-16">
                O Woman in Cyber nasceu para tornar isso visível. Num sector onde a representação feminina ainda é escassa, reunimos quatro profissionais de topo para partilhar as suas trajectórias, os seus desafios e a sua visão — e para mostrar que o espaço existe, e que está a crescer.
            </p>

            {/* Divider with detail */}
            <div className="flex items-center justify-center gap-6 text-purple-300/30 text-sm font-mono">
                <div className="w-16 h-px bg-purple-400/20" />
                <span>24 de Outubro · 16:30 · Triana Business Lounge</span>
                <div className="w-16 h-px bg-purple-400/20" />
            </div>
        </section>
    )
}
