const retro = { fontFamily: "'Press Start 2P', monospace" }

export default function HeroSection() {
    return (
        <section
            style={retro}
            className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-6 py-24 relative overflow-hidden"
        >
            <div className="relative z-10 flex flex-col items-center">
                {/* Top label */}
                <p className="text-[10px] text-green-500/40 tracking-[0.4em] mb-10 uppercase">
                    [ MOZCYBER COMMUNITY ]
                </p>

                {/* Main title */}
                <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl leading-tight mb-8">
                    <span className="text-red-500">H</span>
                    <span className="text-green-400">ACK </span>
                    <span className="text-red-500">ON</span>
                    <span className="text-green-400"> </span>
                    <span className="text-red-500">S</span>
                    <span className="text-green-400">UNDAYS</span>
                </h1>

                {/* Tagline */}
                <p className="text-green-500/50 text-[10px] md:text-xs mb-12 max-w-md leading-loose tracking-widest">
                    &gt; APRENDE. PRATICA. HACKEIA.
                </p>

                {/* Date & Location */}
                <div className="flex flex-col items-center gap-4">
                    <div className="w-px h-8 bg-green-500/20" />
                    <div className="flex flex-col sm:flex-row gap-4 text-[10px] text-green-500/40">
                        <span>16 NOV – 30 NOV 2025</span>
                        <span className="hidden sm:block text-green-800">·</span>
                        <span>ONLINE</span>
                    </div>
                </div>

                {/* Blinking cursor */}
                <div className="mt-12 text-green-400 text-sm animate-pulse">_</div>
            </div>
        </section>
    )
}
