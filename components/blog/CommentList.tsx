import { prisma } from "@/lib/prisma";

export default async function CommentList({ postId }: { postId: string }) {
  const comments = await prisma.comment.findMany({
    where: { postId, status: "APPROVED" },
    orderBy: { createdAt: "desc" },
  });

  if (comments.length === 0) {
    return (
      <p className="mt-6 text-sm text-white/40">
        Ainda sem comentários. Sê o primeiro a comentar.
      </p>
    );
  }

  return (
    <ul className="mt-6 space-y-5">
      {comments.map((comment) => (
        <li key={comment.id} className="border-b border-white/10 pb-5">
          <p className="text-sm font-semibold text-white">
            {comment.authorName}
          </p>
          <p className="mt-1 text-xs text-white/40">
            {comment.createdAt.toLocaleDateString("pt-MZ")}
          </p>
          <p className="mt-2 whitespace-pre-line text-sm text-white/70">
            {comment.body}
          </p>
        </li>
      ))}
    </ul>
  );
}
