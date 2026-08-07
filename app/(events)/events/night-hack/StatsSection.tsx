const stats = [
    { number: "100+", label: "Participantes" },
    { number: "5", label: "Oradores" },
    { number: "5", label: "Sessões" },
    { number: "5", label: "Sábados" },
]

export default function StatsSection() {
    return (
        <section className="py-16 px-6">
            <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="flex flex-col items-center justify-center p-6 rounded-2xl border border-white/15 bg-white/[0.03] backdrop-blur-md"
                    >
                        <span className="text-4xl font-bold text-white mb-2">{stat.number}</span>
                        <span className="text-sm text-white/50 tracking-wide uppercase">{stat.label}</span>
                    </div>
                ))}
            </div>
        </section>
    )
}
