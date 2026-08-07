const sessions = [
    { number: "01", title: "Introdução ao Kali Linux", date: "5 de Abril", description: "Primeiros passos na distribuição Linux mais usada em testes de penetração." },
    { number: "02", title: "Testes de Penetração em Redes", date: "12 de Abril", description: "Técnicas de reconhecimento, scanning e exploração de vulnerabilidades em redes." },
    { number: "03", title: "Testes de Penetração em Aplicações Web", date: "19 de Abril", description: "OWASP Top 10, SQLi, XSS e outras vulnerabilidades críticas em aplicações web." },
    { number: "04", title: "Pentesting em Sistemas Windows", date: "26 de Abril", description: "Exploração de falhas em ambientes Windows, privilege escalation e lateral movement." },
    { number: "05", title: "Capture The Flag (CTF)", date: "3 de Maio", description: "Competição final onde os participantes colocam à prova tudo o que aprenderam." },
]

export default function SectionsSection() {
    return (
        <section className="py-24 px-6">
            <div className="mb-12 flex justify-center">
                <div className="px-6 py-2 rounded-full border border-white/25 text-white text-sm tracking-widest bg-white/[0.03] backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
                    Sessões
                </div>
            </div>

            <div className="max-w-3xl mx-auto flex flex-col gap-4">
                {sessions.map((session) => (
                    <div
                        key={session.number}
                        className="flex items-start gap-6 p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md hover:border-white/25 transition-colors"
                    >
                        <span className="text-xs font-mono text-white/30 mt-1 shrink-0">{session.number}</span>
                        <div className="flex-1 text-left">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                                <h3 className="text-white font-semibold">{session.title}</h3>
                                <span className="text-white/40 text-xs shrink-0">{session.date}</span>
                            </div>
                            <p className="text-white/50 text-sm leading-relaxed">{session.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
