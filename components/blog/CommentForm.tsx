"use client";

import { createCommentAction, type ActionState } from "@/lib/actions";
import SubmitButton from "@/components/ui/SubmitButton";
import { useActionState, useEffect, useRef } from "react";

export default function CommentForm({
  postId,
  showNameField,
}: {
  postId: string;
  showNameField: boolean;
}) {
  const [state, formAction] = useActionState(
    createCommentAction,
    {} as ActionState,
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) formRef.current?.reset();
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="mt-6 space-y-3">
      <input type="hidden" name="postId" value={postId} />
      {showNameField && (
        <input
          name="authorName"
          required
          maxLength={60}
          placeholder="O teu nome"
          className="w-full rounded-lg border border-white/15 bg-white/3 px-3 py-2 text-sm text-white outline-none focus:border-moz-teal"
        />
      )}
      <textarea
        name="body"
        required
        rows={4}
        maxLength={2000}
        placeholder="Escreve um comentário…"
        className="w-full resize-none rounded-lg border border-white/15 bg-white/3 px-3 py-2 text-sm text-white outline-none focus:border-moz-teal"
      />
      {state.error && <p className="text-xs text-red-400">{state.error}</p>}
      {state.success && (
        <p className="text-xs text-moz-teal">{state.success}</p>
      )}
      <SubmitButton
        pendingLabel="A enviar…"
        className="text-sm font-semibold text-moz-teal hover:text-white"
      >
        Enviar comentário
      </SubmitButton>
    </form>
  );
}
