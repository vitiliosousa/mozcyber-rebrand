"use client";

import SubmitButton from "@/components/ui/SubmitButton";

type Props = {
  action: () => Promise<void>;
  label: string;
  pendingLabel?: string;
  className?: string;
};

export default function ActionButton({
  action,
  label,
  pendingLabel = "A processar…",
  className = "text-sm font-semibold text-moz-teal hover:text-white",
}: Props) {
  return (
    <form action={action}>
      <SubmitButton
        type="submit"
        pendingLabel={pendingLabel}
        className={className}
      >
        {label}
      </SubmitButton>
    </form>
  );
}
