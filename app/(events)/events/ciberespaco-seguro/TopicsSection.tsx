const topics = [
    {
        number: "01",
        title: "Panorama da cibersegurança em Moçambique",
        description: "Análise do estado actual da cibersegurança no país — ameaças prevalentes, lacunas institucionais e oportunidades de melhoria.",
    },
    {
        number: "02",
        title: "Resiliência digital",
        description: "O que significa ser resiliente no ciberespaço e como organizações e indivíduos podem preparar-se para incidentes.",
    },
    {
        number: "03",
        title: "Responsabilidades e governação",
        description: "O papel das instituições, do governo e dos profissionais de TI na construção de um ciberespaço mais seguro.",
    },
    {
        number: "04",
        title: "Boas práticas e próximos passos",
        description: "Acções concretas que cada participante pode aplicar no seu contexto profissional para contribuir para um ecossistema digital mais seguro.",
    },
]

export default function TopicsSection() {
    return (
        <section className="py-24 px-6 max-w-5xl mx-auto">
            <span className="text-xs font-mono tracking-[0.3em] text-white/30 uppercase block mb-10">
                Temas abordados
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {topics.map((topic) => (
                    <div
                        key={topic.number}
                        className="p-6 border border-white/15 bg-white/[0.04] rounded-2xl hover:border-white/30 transition-colors backdrop-blur-sm"
                    >
                        <span className="text-xs font-mono text-white/20 mb-4 block">{topic.number}</span>
                        <h3 className="text-white font-semibold mb-3">{topic.title}</h3>
                        <p className="text-white/50 text-sm leading-relaxed">{topic.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
