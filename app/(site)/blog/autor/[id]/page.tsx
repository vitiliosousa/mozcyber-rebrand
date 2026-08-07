import CoverImage from "@/components/blog/CoverImage";
import { publishedWhere, readingTimeMinutes } from "@/lib/blog";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const author = await prisma.user.findUnique({
    where: { id },
    select: { name: true },
  });
  return {
    title: `${author?.name || "Autor"} | Blog Mozcyber`,
  };
}

export default async function AuthorPage({ params }: Props) {
  const { id } = await params;
  const author = await prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, image: true },
  });
  if (!author) notFound();

  const posts = await prisma.post.findMany({
    where: { authorId: id, ...publishedWhere },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <section className="bg-[#0b0f14] pt-20 pb-12 md:pt-24 md:pb-16">
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <Link
          href="/blog"
          className="text-sm text-white/40 hover:text-moz-teal"
        >
          ← Blog
        </Link>
        <h1 className="mt-6 text-2xl md:text-4xl">
          {author.name || "Membro Mozcyber"}
        </h1>
        <p className="mt-3 text-moz-muted">
          {posts.length} artigo{posts.length === 1 ? "" : "s"} publicado
          {posts.length === 1 ? "" : "s"}
        </p>

        <ul className="mt-12 border-t border-white/10">
          {posts.length === 0 && (
            <li className="py-8 text-moz-muted">Sem artigos publicados.</li>
          )}
          {posts.map((post) => (
            <li key={post.id} className="border-b border-white/10 py-6">
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="flex gap-5">
                  {post.image && (
                    <div className="relative hidden aspect-video w-40 shrink-0 overflow-hidden sm:block">
                      <CoverImage
                        src={post.image}
                        alt=""
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-moz-teal">
                      {post.category}
                    </p>
                    <h2 className="mt-2 text-xl group-hover:text-moz-teal">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm text-white/50">
                      {readingTimeMinutes(post.content)} min de leitura
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
