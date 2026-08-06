import Reveal from "@/components/animations/Reveal";
import RevealStagger from "@/components/animations/RevealStagger";
import { faqs } from "@/data/faqs";

export default function FaqSection() {
  return (
    <section className="bg-[#0b0f14] pb-20 md:pb-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <RevealStagger
          className="border-t border-white/10"
          selector=":scope li"
          stagger={0.07}
          variant="list"
        >
          <ul>
            {faqs.map((item) => (
              <li key={item.q} className="border-b border-white/10">
                <details className="group py-6 md:py-8">
                  <summary className="cursor-pointer list-none marker:content-none [&::-webkit-details-marker]:hidden">
                    <span className="flex items-start justify-between gap-4">
                      <span className="text-xl leading-snug md:text-2xl">
                        {item.q}
                      </span>
                      <span
                        aria-hidden
                        className="shrink-0 text-moz-teal transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/55">
                    {item.a}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </RevealStagger>
      </div>
    </section>
  );
}
