export default function AboutSection() {
    return (
        <section className="py-24 px-6 max-w-5xl mx-auto">
            <span className="text-xs font-mono tracking-[0.3em] text-white/30 uppercase block mb-12">
                Sobre o workshop
            </span>

            {/* Big statement */}
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-16 max-w-3xl">
                A segurança começa{" "}
                <span className="text-white/40">com consciência.</span>
            </p>

            {/* Body */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/15 pt-12">
                <p className="text-white/65 leading-relaxed">
                    O workshop <span className="text-white font-medium">Um Ciberespaço Seguro e Resiliente em Moçambique</span> abordou os principais desafios de cibersegurança no contexto nacional — desde a literacia digital até às responsabilidades institucionais na protecção de infraestruturas críticas.
                </p>
                <p className="text-white/40 leading-relaxed">
                    Num momento em que Moçambique acelera a sua transformação digital, compreender os riscos e as estratégias de defesa tornou-se uma responsabilidade partilhada por profissionais, instituições e cidadãos.
                </p>
            </div>

            {/* Inline tags */}
            <div className="flex flex-wrap gap-3 mt-12">
                {["Cibersegurança Nacional", "Resiliência Digital", "Governação", "Consciencialização", "Workshop Presencial"].map((tag) => (
                    <span
                        key={tag}
                        className="text-xs font-mono text-white/40 border border-white/15 px-3 py-1.5 rounded-full"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </section>
    )
}
