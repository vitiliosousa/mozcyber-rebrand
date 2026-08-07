export function StatusBadge({
  status,
}: {
  status: "DRAFT" | "PENDING" | "PUBLISHED" | "REJECTED" | string;
}) {
  const styles: Record<string, string> = {
    DRAFT: "bg-white/8 text-white/70 ring-white/10",
    PENDING: "bg-amber-400/10 text-amber-300 ring-amber-400/20",
    PUBLISHED: "bg-moz-teal/15 text-moz-teal ring-moz-teal/25",
    REJECTED: "bg-red-400/10 text-red-300 ring-red-400/20",
  };

  const labels: Record<string, string> = {
    DRAFT: "Rascunho",
    PENDING: "Em revisão",
    PUBLISHED: "Publicado",
    REJECTED: "Rejeitado",
  };

  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium tracking-wide ring-1 ring-inset ${
        styles[status] || styles.DRAFT
      }`}
    >
      {labels[status] || status}
    </span>
  );
}
