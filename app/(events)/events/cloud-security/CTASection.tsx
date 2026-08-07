export default function CTASection() {
    return (
        <section className="py-24 px-6 max-w-5xl mx-auto">
            <div className="border-t border-gray-200 pt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
                <div>
                    <span className="text-xs font-mono tracking-[0.3em] text-gray-400 uppercase block mb-4">
                        MozCyber Community
                    </span>
                    <h2 className="text-2xl font-bold text-gray-900 max-w-sm leading-snug">
                        Fica a par dos próximos workshops.
                    </h2>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                    <a
                        href="https://www.instagram.com/mozcyberr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 transition-colors text-center"
                    >
                        Instagram
                    </a>
                    <a
                        href="https://www.linkedin.com/company/mozcyber/posts/?feedView=all"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3 rounded-full border border-gray-300 text-gray-600 text-sm hover:border-gray-400 hover:text-gray-900 transition-colors text-center"
                    >
                        LinkedIn
                    </a>
                </div>
            </div>
        </section>
    )
}
