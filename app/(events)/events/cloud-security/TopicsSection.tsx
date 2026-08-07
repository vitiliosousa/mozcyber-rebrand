const topics = [
    {
        number: "01",
        title: "O que é Zero-Trust?",
        description: "Princípios fundamentais do modelo Zero-Trust e por que o perímetro tradicional de rede já não é suficiente.",
    },
    {
        number: "02",
        title: "Identidade como novo perímetro",
        description: "Gestão de identidade e acesso (IAM) em ambientes cloud — autenticação, autorização e princípio do menor privilégio.",
    },
    {
        number: "03",
        title: "Segurança em redes cloud",
        description: "Micro-segmentação, encriptação de tráfego e monitorização contínua em infraestruturas cloud.",
    },
    {
        number: "04",
        title: "Implementação prática",
        description: "Estratégias para adoptar Zero-Trust de forma gradual em organizações que já operam em ambientes cloud.",
    },
]

export default function TopicsSection() {
    return (
        <section className="py-24 px-6 max-w-5xl mx-auto">
            <span className="text-xs font-mono tracking-[0.3em] text-gray-400 uppercase block mb-10">
                Temas abordados
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {topics.map((topic) => (
                    <div
                        key={topic.number}
                        className="p-6 border border-gray-200 bg-white rounded-2xl hover:border-gray-300 transition-colors"
                    >
                        <span className="text-xs font-mono text-gray-300 mb-4 block">{topic.number}</span>
                        <h3 className="text-gray-900 font-semibold mb-3">{topic.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{topic.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
