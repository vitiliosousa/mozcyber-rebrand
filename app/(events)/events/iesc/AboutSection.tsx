export default function AboutSection() {
    return (
        <section className="py-24 px-6 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                {/* Left — description */}
                <div>
                    <span className="text-xs font-mono tracking-[0.3em] text-indigo-300/40 uppercase block mb-6">
                        Sobre o evento
                    </span>
                    <h2 className="text-3xl font-bold text-white leading-tight mb-6">
                        Porque a ética não é opcional.
                    </h2>
                    <p className="text-indigo-100/60 leading-relaxed">
                        A Importância da Ética na Segurança Cibernética foi um evento de debate organizado pela MozCyber Community para reflectir sobre o papel da ética no exercício da cibersegurança. Im tema que define quem somos como profissionais, para além do que sabemos fazer tecnicamente.
                    </p>
                </div>

                {/* Right — format cards */}
                <div className="flex flex-col gap-4 pt-2 md:pt-14">
                    <div className="p-5 rounded-2xl border border-indigo-400/15 bg-indigo-400/5">
                        <p className="text-xs font-mono text-indigo-300/40 uppercase tracking-widest mb-2">Formato</p>
                        <p className="text-white/80 text-sm">Mesa de debate com oradores convidados</p>
                    </div>
                    <div className="p-5 rounded-2xl border border-indigo-400/15 bg-indigo-400/5">
                        <p className="text-xs font-mono text-indigo-300/40 uppercase tracking-widest mb-2">Duração</p>
                        <p className="text-white/80 text-sm">Um dia · Sessão da manhã</p>
                    </div>
                    <div className="p-5 rounded-2xl border border-indigo-400/15 bg-indigo-400/5">
                        <p className="text-xs font-mono text-indigo-300/40 uppercase tracking-widest mb-2">Público</p>
                        <p className="text-white/80 text-sm">Profissionais, estudantes e entusiastas de cibersegurança</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
