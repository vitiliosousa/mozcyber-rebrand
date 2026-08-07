export default function AboutSection() {
    return (
        <section className="py-24 px-6 text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
                <div className="px-6 py-2 rounded-full border border-white/25 text-white text-sm tracking-widest bg-white/[0.03] backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
                    O que foi o Night Hack
                </div>
            </div>

            <h2 className="text-3xl font-bold text-white mb-6 leading-tight">
                5 sábados. Muita intensidade.
            </h2>

            <p className="text-lg text-white/70 leading-relaxed mb-6">
                O <span className="text-white font-semibold">Night Hack</span> foi um evento presencial organizado pela MozCyber Community, desenhado para mergulhar os participantes no mundo da cibersegurança através de sessões práticas conduzidas por profissionais experientes da indústria.
            </p>

            <p className="text-lg text-white/50 leading-relaxed">
                Com um formato intensivo distribuído por 5 sábados consecutivos, o Night Hack reuniu estudantes e profissionais da área para explorar temas como pentesting em redes, segurança em sistemas operativos e competições do tipo Capture The Flag.
            </p>
        </section>
    )
}
