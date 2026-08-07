const retro = { fontFamily: "'Press Start 2P', monospace" }

const sessions = [
    {
        index: "01",
        topic: "Mobile Hacking",
        date: "16/11/2025",
        description:
            "Exploração de vulnerabilidades em aplicações móveis Android e iOS. Técnicas de análise estática e dinâmica, interceptação de tráfego e extracção de dados.",
        tag: "MOBILE",
    },
    {
        index: "02",
        topic: "Active Directory Hacking",
        date: "23/11/2025",
        description:
            "Ataques a ambientes Active Directory: enumeração, Kerberoasting, Pass-the-Hash, movimentação lateral e escalada de privilégios em redes Windows.",
        tag: "AD / WINDOWS",
    },
    {
        index: "03",
        topic: "Web Hacking",
        date: "30/11/2025",
        description:
            "Identificação e exploração das principais vulnerabilidades web — OWASP Top 10 — com demonstrações práticas em ambientes controlados.",
        tag: "WEB",
    },
]

export default function SessionsSection() {
    return (
        <section className="bg-black py-24 px-6">
            <div className="max-w-3xl mx-auto">
                {/* Section header */}
                <p style={retro} className="text-[10px] text-green-500/40 tracking-[0.3em] mb-10 uppercase">
                    &gt; SESSÕES
                </p>

                <div className="flex flex-col gap-0">
                    {sessions.map((s, i) => (
                        <div key={i} className="group flex gap-6 border-b border-green-500/10 py-8 hover:bg-green-500/[0.02] transition-colors px-2">
                            {/* Index */}
                            <div className="flex-shrink-0 pt-1">
                                <span style={retro} className="text-green-500/20 text-xs">{s.index}</span>
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                                    <h3 style={retro} className="text-green-400 text-sm leading-relaxed">
                                        {s.topic}
                                    </h3>
                                    <span style={retro} className="text-[9px] text-red-500/60 border border-red-500/20 px-2 py-1 flex-shrink-0">
                                        {s.tag}
                                    </span>
                                </div>
                                <p style={retro} className="text-[9px] text-green-500/30 mb-4 tracking-widest">
                                    {s.date}
                                </p>
                                <p className="text-green-300/50 text-sm leading-7">
                                    {s.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
