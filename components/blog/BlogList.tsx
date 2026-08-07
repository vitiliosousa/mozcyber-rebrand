import RevealStagger from "@/components/animations/RevealStagger";
import { posts } from "@/data/posts";
import Link from "next/link";

export default function BlogList() {
  return (
    <section className="bg-[#0b0f14] pb-20 md:pb-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <RevealStagger
          selector=":scope li"
          stagger={0.08}
          variant="list"
        >
          <ul className="border-t border-white/10">
            {posts.map((post) => (
              <li key={post.slug} className="border-b border-white/10">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group grid gap-4 py-8 transition-colors md:grid-cols-[10rem_1fr_auto] md:items-start md:gap-10 md:py-10"
                >
                  <div className="text-sm text-moz-muted">
                    <time>{post.date}</time>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-moz-teal">
                      {post.category}
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl leading-snug transition-colors group-hover:text-moz-teal md:text-3xl">
                      {post.title}
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/55 md:text-base">
                      {post.excerpt}
                    </p>
                    <p className="mt-3 text-sm text-white/40">{post.author}</p>
                  </div>

                  <span className="text-sm text-white/40 transition-colors group-hover:text-moz-teal md:pt-1">
                    Ler →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </RevealStagger>
      </div>
    </section>
  );
}
