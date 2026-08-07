// Replace these with actual imported photos when available
// e.g.: import photo1 from "@/assets/wic_photo1.jpg"
// and replace the placeholder divs with <Image src={photo1} ... />

const photoCount = 10 // update as photos are added

export default function GallerySection() {
    const items = Array.from({ length: photoCount }, (_, i) => i + 1)

    return (
        <section className="py-24 overflow-hidden">
            <div className="px-6 max-w-5xl mx-auto mb-12">
                <span className="text-xs font-mono tracking-[0.3em] text-purple-300/40 uppercase block mb-4">
                    Galeria
                </span>
                <h2 className="text-2xl text-white">
                    Momentos do evento.
                </h2>
            </div>

            {/* Marquee wrapper */}
            <div className="relative overflow-hidden">
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-[#1D182B] to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-[#1D182B] to-transparent pointer-events-none" />

                <div
                    className="flex gap-4"
                    style={{
                        animation: "wic-marquee 40s linear infinite",
                        width: "max-content",
                    }}
                >
                    {/* Duplicated for seamless loop */}
                    {[...items, ...items].map((n, i) => (
                        <div
                            key={i}
                            className="w-64 h-44 rounded-2xl border border-purple-400/15 bg-purple-400/5 shrink-0 flex items-center justify-center"
                        >
                            <span className="text-purple-300/20 text-xs font-mono">foto {n}</span>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes wic-marquee {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </section>
    )
}
