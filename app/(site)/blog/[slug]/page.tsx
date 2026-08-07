import Reveal from "@/components/animations/Reveal";
import CoverImage from "@/components/blog/CoverImage";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findFirst({
    where: { slug, status: "PUBLISHED" },
  });
  if (!post) return { title: "Artigo | Mozcyber" };

  return {
    title: `${post.title} | Mozcyber`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.post.findFirst({
    where: { slug, status: "PUBLISHED" },
    include: { author: { select: { name: true } } },
  });
  if (!post) notFound();

  return (
    <article className="bg-[#0b0f14] pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <Reveal variant="fade">
          <Link
            href="/blog"
            className="text-sm text-white/40 transition-colors hover:text-moz-teal"
          >
            ← Voltar ao blog
          </Link>
        </Reveal>

        <Reveal variant="slide" className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-moz-teal">
            {post.category}
          </p>
          <h1 className="mt-4 text-3xl leading-tight md:text-5xl">
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-moz-muted">
            <time>
              {(post.publishedAt || post.createdAt).toLocaleDateString("pt-MZ")}
            </time>
            <span aria-hidden>·</span>
            <span>{post.author.name || "Mozcyber"}</span>
          </div>
        </Reveal>

        {post.image && (
          <Reveal variant="clip" className="mt-8 md:mt-10">
            <div className="relative aspect-video overflow-hidden">
              <CoverImage
                src={post.image}
                alt={post.title}
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>
        )}

        <Reveal variant="fade" delay={0.1} className="mt-10">
          <div
            className="blog-article-content text-base leading-relaxed text-white/75 md:text-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </Reveal>

        <Reveal variant="fade" className="mt-14 border-t border-white/10 pt-8">
          <Link
            href="/blog"
            className="text-sm font-semibold text-moz-teal transition-colors hover:text-white"
          >
            Ver todos os artigos →
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
