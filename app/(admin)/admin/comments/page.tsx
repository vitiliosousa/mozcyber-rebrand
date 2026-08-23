import {
  approveCommentAction,
  deleteCommentAction,
  rejectCommentAction,
} from "@/lib/actions";
import ActionButton from "@/components/ui/ActionButton";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

const statusLabel: Record<string, string> = {
  PENDING: "Pendente",
  APPROVED: "Aprovado",
  REJECTED: "Rejeitado",
};

export default async function AdminCommentsPage() {
  const pending = await prisma.comment.findMany({
    where: { status: "PENDING" },
    orderBy: { createdAt: "asc" },
    include: { post: { select: { slug: true, title: true } } },
  });

  const recent = await prisma.comment.findMany({
    where: { status: { in: ["APPROVED", "REJECTED"] } },
    orderBy: { createdAt: "desc" },
    take: 30,
    include: { post: { select: { slug: true, title: true } } },
  });

  return (
    <div>
      <h1 className="text-3xl md:text-4xl">Comentários</h1>
      <p className="mt-3 text-moz-muted">
        Modera os comentários enviados nos artigos do blog.
      </p>

      <h2 className="mt-10 text-xl text-moz-teal">
        Pendentes ({pending.length})
      </h2>
      <ul className="mt-4 border-t border-white/10">
        {pending.length === 0 && (
          <li className="py-8 text-moz-muted">Nada por rever.</li>
        )}
        {pending.map((comment) => (
          <li key={comment.id} className="border-b border-white/10 py-6">
            <p className="text-sm font-semibold text-white">
              {comment.authorName}
            </p>
            <p className="mt-1 text-xs text-white/45">
              em{" "}
              <Link
                href={`/blog/${comment.post.slug}`}
                className="hover:text-moz-teal"
              >
                {comment.post.title}
              </Link>
            </p>
            <p className="mt-3 whitespace-pre-line text-sm text-white/70">
              {comment.body}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <ActionButton
                action={approveCommentAction.bind(null, comment.id)}
                label="Aprovar"
                pendingLabel="A aprovar…"
                className="text-sm font-semibold text-moz-teal hover:text-white"
              />
              <ActionButton
                action={rejectCommentAction.bind(null, comment.id)}
                label="Rejeitar"
                pendingLabel="A rejeitar…"
                className="text-sm text-red-400 hover:text-red-300"
              />
              <ActionButton
                action={deleteCommentAction.bind(null, comment.id)}
                label="Apagar"
                pendingLabel="A apagar…"
                className="text-sm text-white/50 hover:text-red-300"
              />
            </div>
          </li>
        ))}
      </ul>

      <h2 className="mt-12 text-xl">Recentes</h2>
      <ul className="mt-4 border-t border-white/10">
        {recent.length === 0 && (
          <li className="py-8 text-moz-muted">Sem comentários moderados ainda.</li>
        )}
        {recent.map((comment) => (
          <li
            key={comment.id}
            className="flex flex-col gap-3 border-b border-white/10 py-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-sm text-white">{comment.authorName}</p>
              <p className="mt-1 text-xs text-white/45">
                {statusLabel[comment.status]} · {comment.post.title}
              </p>
            </div>
            <ActionButton
              action={deleteCommentAction.bind(null, comment.id)}
              label="Apagar"
              pendingLabel="…"
              className="text-sm text-red-400 hover:text-red-300"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
