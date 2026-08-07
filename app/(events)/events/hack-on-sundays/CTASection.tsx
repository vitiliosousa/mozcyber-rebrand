const retro = { fontFamily: "'Press Start 2P', monospace" }

export default function CTASection() {
    return (
        <section className="bg-black py-24 px-6 border-t border-green-500/10">
            <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-8">
                <p style={retro} className="text-[10px] text-green-500/30 tracking-[0.4em] uppercase">
                    &gt; JUNTA-TE À COMUNIDADE
                </p>

                <h2 style={retro} className="text-xl md:text-2xl text-green-400 leading-loose">
                    PRONTO PARA O <span className="text-red-500">PRÓXIMO</span> NÍVEL?
                </h2>

                <p className="text-green-300/40 text-sm leading-8 max-w-md">
                    A MozCyber Community está sempre a preparar novas iniciativas para quem quer
                    aprender segurança cibernética na prática.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <a
                        href="https://www.instagram.com/mozcyberr"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={retro}
                        className="px-6 py-4 bg-red-500/5 border border-red-500/20 text-red-400/70 text-[10px] hover:bg-red-500/10 transition-colors"
                    >
                        [ INSTAGRAM ]
                    </a>
                    <a
                        href="https://www.linkedin.com/company/mozcyber/posts/?feedView=all"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={retro}
                        className="px-6 py-4 bg-green-500/5 border border-green-500/15 text-green-500/50 text-[10px] hover:bg-green-500/10 transition-colors"
                    >
                        [ LINKEDIN ]
                    </a>
                </div>

                <p style={retro} className="text-green-500/15 text-[9px] mt-8">
                    // END OF TRANSMISSION
                </p>
            </div>
        </section>
    )
}
