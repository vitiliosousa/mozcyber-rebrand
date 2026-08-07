"use client";

import { rejectPostAction, type ActionState } from "@/lib/actions";
import SubmitButton from "@/components/ui/SubmitButton";
import { useActionState } from "react";

export default function RejectPostForm({ postId }: { postId: string }) {
  const [state, formAction] = useActionState(
    rejectPostAction,
    {} as ActionState,
  );

  return (
    <form action={formAction} className="mt-3 space-y-2">
      <input type="hidden" name="id" value={postId} />
      <textarea
        name="reason"
        required
        rows={2}
        placeholder="Motivo da rejeição…"
        className="w-full resize-none rounded-lg border border-white/15 bg-white/3 px-3 py-2 text-sm text-white outline-none focus:border-moz-teal"
      />
      {state.error && <p className="text-xs text-red-400">{state.error}</p>}
      <SubmitButton
        pendingLabel="A rejeitar…"
        className="text-sm text-red-400 hover:text-red-300"
      >
        Rejeitar
      </SubmitButton>
    </form>
  );
}
