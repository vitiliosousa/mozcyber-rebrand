"use client";

import { useFormStatus } from "react-dom";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  pendingLabel?: string;
};

export default function SubmitButton({
  children,
  pendingLabel = "A processar…",
  className = "",
  disabled,
  ...props
}: Props) {
  const { pending } = useFormStatus();
  const busy = pending || disabled;

  return (
    <button
      {...props}
      disabled={busy}
      aria-busy={pending}
      className={`${className} disabled:pointer-events-none disabled:opacity-60`}
    >
      {pending ? (
        <span className="inline-flex items-center justify-center gap-2">
          <span
            className="size-3.5 animate-spin rounded-full border-2 border-current border-r-transparent"
            aria-hidden
          />
          {pendingLabel}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
