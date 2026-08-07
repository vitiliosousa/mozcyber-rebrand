export default function AboutSection() {
    return (
        <section className="py-24 px-6 text-center max-w-4xl mx-auto">
            <div className="mb-8">
                <span className="px-6 py-2 rounded-full border border-gray-600 text-sm text-gray-300 backdrop-blur-sm">
                    O que foi o HackOnWednesdays?
                </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 leading-tight">
                Aprender. Hackear. Repetir.
            </h2>

            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6">
                O <span className="text-white font-semibold">HackOnWednesdays</span> foi uma série de sessões semanais de cibersegurança promovida pela MozCyber Community, onde profissionais e entusiastas se reuniram para explorar, aprender e praticar técnicas de hacking ético de forma colaborativa.
            </p>

            <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                Cada sessão foi conduzida por especialistas da área, abordando temas práticos como testes de penetração, análise de vulnerabilidades e enumeração de sistemas — sempre num ambiente seguro, inclusivo e orientado ao crescimento técnico da comunidade moçambicana.
            </p>
        </section>
    )
}