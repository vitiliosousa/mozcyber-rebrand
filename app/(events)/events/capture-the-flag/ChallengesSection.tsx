const categories = [
    {
        tag: "WEB",
        title: "Web Exploitation",
        description: "Identificação e exploração de vulnerabilidades em aplicações web — SQLi, XSS, CSRF e outras falhas do OWASP Top 10.",
    },
    {
        tag: "CRYPTO",
        title: "Criptografia",
        description: "Desafios de cifras clássicas, hashing, RSA e criptografia simétrica. Decifrar o que parece impossível.",
    },
    {
        tag: "FORENSICS",
        title: "Forense Digital",
        description: "Análise de ficheiros, imagens de disco, capturas de rede e metadados para encontrar evidências escondidas.",
    },
    {
        tag: "OSINT",
        title: "OSINT",
        description: "Recolha de informação em fontes abertas — redes sociais, registos públicos e pesquisa avançada na internet.",
    },
    {
        tag: "REV",
        title: "Engenharia Reversa",
        description: "Análise de binários e executáveis para compreender o funcionamento interno e extrair informação oculta.",
    },
    {
        tag: "MISC",
        title: "Miscelânea",
        description: "Desafios que não se encaixam nas outras categorias — lógica, programação, esteganografia e muito mais.",
    },
]

export default function ChallengesSection() {
    return (
        <section className="py-24 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-center mb-12">
                    <div className="px-6 py-2 rounded-full border border-white/25 text-white text-xs sm:text-sm tracking-wide sm:tracking-widest bg-white/[0.03] backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
                        Categorias de Desafios
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories.map((cat) => (
                        <div
                            key={cat.tag}
                            className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md hover:border-white/25 transition-colors flex flex-col gap-3"
                        >
                            <span className="text-xs font-mono text-white/30 border border-white/15 px-2 py-0.5 rounded w-fit">
                                {cat.tag}
                            </span>
                            <h3 className="text-white font-semibold">{cat.title}</h3>
                            <p className="text-white/50 text-sm leading-relaxed">{cat.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
