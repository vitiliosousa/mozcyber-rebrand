const steps = [
    {
        number: "01",
        title: "Formação dos grupos",
        description: "Os grupos foram formados antecipadamente, antes do dia da competição.",
    },
    {
        number: "02",
        title: "Chegada e posicionamento",
        description: "No dia do CTF, cada grupo sentou-se junto e cada participante com a sua própria máquina.",
    },
    {
        number: "03",
        title: "Acesso aos laboratórios",
        description: "Os grupos tiveram acesso a laboratórios para hackear. O objectivo: encontrar o máximo de flags possível.",
    },
    {
        number: "04",
        title: "Contagem final",
        description: "No final da competição, as flags acumuladas por cada grupo foram contadas. O grupo com mais flags venceu.",
    },
]

export default function RulesSection() {
    return (
        <section className="py-24 px-6">
            <div className="max-w-3xl mx-auto">
                <div className="flex justify-center mb-12">
                    <div className="px-6 py-2 rounded-full border border-white/25 text-white text-xs sm:text-sm tracking-wide sm:tracking-widest bg-white/[0.03] backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
                        Como funcionou
                    </div>
                </div>

                <div className="flex flex-col">
                    {steps.map((step, i) => (
                        <div key={step.number} className="flex gap-6">
                            {/* Timeline line */}
                            <div className="flex flex-col items-center">
                                <div className="w-8 h-8 rounded-full border border-white/25 bg-white/[0.05] flex items-center justify-center shrink-0">
                                    <span className="text-white/50 text-xs font-mono">{step.number}</span>
                                </div>
                                {i < steps.length - 1 && (
                                    <div className="w-px flex-1 bg-white/10 my-2" />
                                )}
                            </div>

                            {/* Content */}
                            <div className={`pb-10 ${i === steps.length - 1 ? "pb-0" : ""}`}>
                                <h3 className="text-white font-semibold mb-2">{step.title}</h3>
                                <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
