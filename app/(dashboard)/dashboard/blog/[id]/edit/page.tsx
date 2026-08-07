import PostForm from "@/components/blog/PostForm";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) notFound();
  if (post.authorId !== session.user.id && session.user.role !== "ADMIN") {
    redirect("/dashboard/blog");
  }

  const lockedForMember =
    session.user.role !== "ADMIN" &&
    (post.status === "PENDING" || post.status === "PUBLISHED");

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl">
            {lockedForMember ? "Artigo" : "Editar artigo"}
          </h1>
          <p className="mt-3 text-sm text-moz-muted">
            Estado actual: <span className="text-moz-teal">{post.status}</span>
          </p>
        </div>
        <Link
          href={`/dashboard/blog/${post.id}`}
          className="text-sm text-moz-teal hover:text-white"
        >
          Ver preview →
        </Link>
      </div>
      <div className="mt-10">
        <PostForm
          isAdmin={session.user.role === "ADMIN"}
          post={{
            id: post.id,
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            category: post.category,
            image: post.image,
            status: post.status,
          }}
        />
      </div>
    </div>
  );
}
