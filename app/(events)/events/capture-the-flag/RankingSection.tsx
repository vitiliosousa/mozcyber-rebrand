const podium = [
    { position: "2º", name: "MNKEY", score: "— flags" },
    { position: "1º", name: "LUTUS", score: "— flags" },
    { position: "3º", name: "POWER RANGERS", score: "— flags" },
]

const leaderboard = [
    { position: 4, name: "WINNING TEAM", score: "— flags" },
    { position: 5, name: "LIMITLESS", score: "— flags" },
    { position: 6, name: "MOZ$OCIETY", score: "— flags" },
]

export default function RankingSection() {
    return (
        <section className="py-24 px-6">
            <div className="max-w-3xl mx-auto">
                <div className="flex justify-center mb-12">
                    <div className="px-6 py-2 rounded-full border border-white/25 text-white text-xs sm:text-sm tracking-wide sm:tracking-widest bg-white/[0.03] backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
                        Classificação Final
                    </div>
                </div>
                {/* Podium */}
                <div className="flex items-end justify-center gap-4 mb-12">
                    {podium.map((p) => (
                        <div
                            key={p.position}
                            className={`flex flex-col items-center gap-3 flex-1 max-w-[100px] sm:max-w-[160px] ${p.position === "1º" ? "mb-0" : "mb-0 opacity-70"}`}
                        >
                            <p className="text-white/80 text-xs sm:text-sm font-semibold text-center leading-snug">{p.name}</p>
                            <p className="text-white/40 text-xs font-mono">{p.score}</p>
                            <div
                                className={`w-full rounded-t-2xl border border-white/15 bg-white/[0.05] flex items-center justify-center font-bold text-white/60 ${
                                    p.position === "1º" ? "h-20 sm:h-28 text-xl sm:text-2xl" : p.position === "2º" ? "h-14 sm:h-20 text-lg sm:text-xl" : "h-10 sm:h-14 text-base sm:text-lg"
                                }`}
                            >
                                {p.position}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Leaderboard */}
                <div className="flex flex-col gap-2">
                    {leaderboard.map((entry) => (
                        <div
                            key={entry.position}
                            className="flex items-center justify-between px-6 py-3 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md"
                        >
                            <div className="flex items-center gap-4">
                                <span className="text-xs font-mono text-white/25 w-5">{entry.position}º</span>
                                <span className="text-white/60 text-sm">{entry.name}</span>
                            </div>
                            <span className="text-xs font-mono text-white/30">{entry.score}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
