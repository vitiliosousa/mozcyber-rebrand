const retro = { fontFamily: "'Press Start 2P', monospace" }

export default function AboutSection() {
    return (
        <section className="bg-black py-24 px-6">
            <div className="max-w-3xl mx-auto">
                {/* Section header */}
                <p style={retro} className="text-[10px] text-green-500/40 tracking-[0.3em] mb-6 uppercase">
                    &gt; SOBRE O EVENTO
                </p>

                {/* Terminal box */}
                <div className="border border-green-500/20 bg-green-500/[0.03] p-4 sm:p-8 relative">
                    {/* Corner decorations */}
                    <span style={retro} className="absolute top-2 left-3 text-green-500/20 text-[10px]">┌</span>
                    <span style={retro} className="absolute top-2 right-3 text-green-500/20 text-[10px]">┐</span>
                    <span style={retro} className="absolute bottom-2 left-3 text-green-500/20 text-[10px]">└</span>
                    <span style={retro} className="absolute bottom-2 right-3 text-green-500/20 text-[10px]">┘</span>

                    <p style={retro} className="text-[10px] text-green-400/30 mb-6">// INICIALIZAÇÃO DO SISTEMA</p>

                    <p className="text-green-300/80 text-sm leading-8 mb-6">
                        O <span className="text-red-400">Hack On Sundays</span> foi uma iniciativa da MozCyber Community que
                        decorreu ao longo de 3 domingos consecutivos, trazendo sessões intensivas e práticas
                        sobre hacking em diferentes domínios.
                    </p>

                    <p className="text-green-300/60 text-sm leading-8">
                        Cada sessão combinou teoria com demonstrações práticas, guiadas por especialistas
                        da comunidade — com o objectivo de capacitar os participantes com ferramentas
                        e técnicas reais usadas no mundo da segurança ofensiva.
                    </p>

                    <div className="mt-8 pt-6 border-t border-green-500/10 grid grid-cols-2 sm:grid-cols-3 gap-6">
                        <div>
                            <p style={retro} className="text-[9px] text-green-500/40 mb-2">SESSÕES</p>
                            <p style={retro} className="text-green-400 text-sm">03</p>
                        </div>
                        <div>
                            <p style={retro} className="text-[9px] text-green-500/40 mb-2">FORMATO</p>
                            <p style={retro} className="text-green-400 text-[10px]">ONLINE</p>
                        </div>
                        <div>
                            <p style={retro} className="text-[9px] text-green-500/40 mb-2">PERIODICIDADE</p>
                            <p style={retro} className="text-green-400 text-[10px]">DOMINGOS</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
