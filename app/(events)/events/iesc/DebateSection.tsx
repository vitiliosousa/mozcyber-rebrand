const theses = [
    {
        thesis: "A competência técnica sem ética é uma ameaça.",
        description: "Um profissional de cibersegurança com grande capacidade técnica mas sem bússola moral pode causar mais dano do que qualquer agente externo.",
    },
    {
        thesis: "O hacking ético começa na intenção, não na autorização.",
        description: "A autorização legal é necessária, mas insuficiente. A verdadeira ética está na intenção que guia cada acção, mesmo quando ninguém está a ver.",
    },
    {
        thesis: "Privacidade e segurança não são opostos.",
        description: "O acesso a dados sensíveis durante um pentest não justifica o seu uso fora do contexto. Proteger sistemas não significa ignorar os direitos das pessoas.",
    },
    {
        thesis: "Divulgar uma vulnerabilidade é um acto político.",
        description: "Reportar ou silenciar uma falha tem consequências reais para utilizadores, empresas e governos. A forma como o fazemos diz muito sobre quem somos.",
    },
    {
        thesis: "O profissional de segurança é um guardião, não um predador.",
        description: "A identidade do especialista em cibersegurança deve ser construída sobre a protecção, não sobre a demonstração de poder técnico.",
    },
]

export default function DebateSection() {
    return (
        <section className="py-24 px-6 max-w-3xl mx-auto">
            <div className="mb-16">
                <span className="text-xs font-mono tracking-[0.3em] text-indigo-300/40 uppercase block mb-4">
                    Teses debatidas
                </span>
                <h2 className="text-2xl font-bold text-white">
                    As questões que estiveram em cima da mesa.
                </h2>
            </div>

            <div className="flex flex-col">
                {theses.map((item, i) => (
                    <div
                        key={i}
                        className="flex gap-8 py-8 border-b border-indigo-400/10 last:border-b-0 group"
                    >
                        <span className="text-xs font-mono text-indigo-400/30 mt-1 shrink-0 w-6">
                            {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                            <p className="text-white font-semibold text-lg leading-snug mb-3 group-hover:text-indigo-200 transition-colors">
                                "{item.thesis}"
                            </p>
                            <p className="text-indigo-100/45 text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
