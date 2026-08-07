export default function AboutSection() {
    return (
        <section className="py-24 px-6 max-w-4xl mx-auto">
            <div className="flex justify-center mb-12">
                <div className="px-6 py-2 rounded-full border border-white/25 text-white text-xs sm:text-sm tracking-wide sm:tracking-widest bg-white/[0.03] backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
                    Sobre o evento
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-6">
                        O encerramento perfeito para o Night Hack.
                    </h2>
                    <p className="text-white/60 leading-relaxed mb-4">
                        O <span className="text-white font-semibold">Capture The Flag</span> foi a competição final que encerrou o Night Hack, a primeira edição organizada pela MozCyber Community em Moçambique.
                    </p>
                    <p className="text-white/40 leading-relaxed">
                        Cada grupo teve acesso a laboratórios reais para hackear e encontrar flags escondidas. Todas as flags valiam o mesmo, venceu quem encontrou mais. Sem atalhos, só habilidade.
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md">
                        <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-2">Formato</p>
                        <p className="text-white/80 text-sm">Competição por grupos · Laboratórios reais</p>
                    </div>
                    <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md">
                        <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-2">Edição</p>
                        <p className="text-white/80 text-sm">Primeira Edição · Encerramento do Night Hack</p>
                    </div>
                    <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md">
                        <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-2">Local</p>
                        <p className="text-white/80 text-sm">USTM · Maputo</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
