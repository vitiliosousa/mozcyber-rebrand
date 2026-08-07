const stats = [
    { number: "80+", label: "Participantes" },
    { number: "5", label: "Oradores" },
    { number: "4", label: "Temas" },
    { number: "3h", label: "De sessão" },
]

export default function StatsSection() {
    return (
        <section className="py-16 px-6">
            <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="flex flex-col items-center justify-center p-6 rounded-2xl border border-gray-700 bg-white/5 backdrop-blur-sm"
                    >
                        <span className="text-4xl font-bold text-white mb-2">{stat.number}</span>
                        <span className="text-sm text-gray-400 tracking-wide uppercase">{stat.label}</span>
                    </div>
                ))}
            </div>
        </section>
    )
}
