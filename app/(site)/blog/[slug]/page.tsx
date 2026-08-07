import Reveal from "@/components/animations/Reveal";
import CoverImage from "@/components/blog/CoverImage";
import ShareButtons from "@/components/blog/ShareButtons";
import TrackPostView from "@/components/blog/TrackPostView";
import {
  absoluteUrl,
  publishedWhere,
  readingTimeMinutes,
} from "@/lib/blog";
import { prisma } from "@/lib/prisma";
import { sanitizeHtml } from "@/lib/sanitize";
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
    where: { slug, ...publishedWhere },
  });
  if (!post) return { title: "Artigo | Mozcyber" };

  const url = absoluteUrl(`/blog/${post.slug}`);
  const image = post.image
    ? post.image.startsWith("http")
      ? post.image
      : absoluteUrl(post.image)
    : undefined;

  return {
    title: `${post.title} | Mozcyber`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url,
      images: image ? [{ url: image }] : undefined,
      publishedTime: post.publishedAt?.toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: image ? [image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const post = await prisma.post.findFirst({
    where: { slug, ...publishedWhere },
    include: {
      author: { select: { id: true, name: true } },
    },
  });
  if (!post) notFound();

  const related = await prisma.post.findMany({
    where: {
      ...publishedWhere,
      category: post.category,
      id: { not: post.id },
    },
    orderBy: { publishedAt: "desc" },
    take: 3,
    select: { slug: true, title: true, category: true },
  });

  const minutes = readingTimeMinutes(post.content);
  const url = absoluteUrl(`/blog/${post.slug}`);
  const safeHtml = sanitizeHtml(post.content);

  return (
    <article className="bg-[#0b0f14] pt-28 pb-20 md:pt-36 md:pb-28">
      <TrackPostView postId={post.id} />
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
          <h1 className="mt-4 break-words text-3xl leading-tight md:text-5xl">
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-moz-muted">
            <time>
              {(post.publishedAt || post.createdAt).toLocaleDateString("pt-MZ")}
            </time>
            <span aria-hidden>·</span>
            <Link
              href={`/blog/autor/${post.author.id}`}
              className="hover:text-moz-teal"
            >
              {post.author.name || "Mozcyber"}
            </Link>
            <span aria-hidden>·</span>
            <span>{minutes} min de leitura</span>
            <span aria-hidden>·</span>
            <span>{post.views} views</span>
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
            dangerouslySetInnerHTML={{ __html: safeHtml }}
          />
        </Reveal>

        <Reveal variant="fade" className="mt-10">
          <ShareButtons title={post.title} url={url} />
        </Reveal>

        {related.length > 0 && (
          <Reveal variant="fade" className="mt-14 border-t border-white/10 pt-8">
            <h2 className="text-xl">Artigos relacionados</h2>
            <ul className="mt-4 space-y-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/blog/${item.slug}`}
                    className="text-white/70 hover:text-moz-teal"
                  >
                    {item.title}
                    <span className="ml-2 text-xs text-white/35">
                      {item.category}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        )}

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
