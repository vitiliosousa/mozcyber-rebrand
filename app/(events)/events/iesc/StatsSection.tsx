const stats = [
    { number: "1", label: "Dia" },
    { number: "5", label: "Oradores" },
    { number: "1 manhã", label: "Duração" },
    { number: "60+", label: "Participantes" },
]

export default function StatsSection() {
    return (
        <section className="py-16 px-6">
            <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="flex flex-col items-center justify-center p-6 rounded-2xl border border-indigo-400/20 bg-indigo-900/10 backdrop-blur-md"
                    >
                        <span className="text-4xl font-bold text-white mb-2">{stat.number}</span>
                        <span className="text-sm text-indigo-200/50 tracking-wide uppercase">{stat.label}</span>
                    </div>
                ))}
            </div>
        </section>
    )
}
