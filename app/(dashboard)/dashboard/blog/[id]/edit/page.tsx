import PostForm from "@/components/blog/PostForm";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const post = await prisma.post.findFirst({
    where: { id, deletedAt: null },
  });
  if (!post) notFound();
  if (post.authorId !== session.user.id && session.user.role !== "ADMIN") {
    redirect("/dashboard/blog");
  }

  return (
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
        rejectionReason: post.rejectionReason,
      }}
    />
  );
}
