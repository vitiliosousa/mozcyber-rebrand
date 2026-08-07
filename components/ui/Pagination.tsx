import Link from "next/link";

type Props = {
  page: number;
  totalPages: number;
  basePath: string;
  pageParam?: string;
};

export default function Pagination({
  page,
  totalPages,
  basePath,
  pageParam = "page",
}: Props) {
  if (totalPages <= 1) return null;

  function href(p: number) {
    const sep = basePath.includes("?") ? "&" : "?";
    return `${basePath}${sep}${pageParam}=${p}`;
  }

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      <Link
        href={href(Math.max(1, page - 1))}
        aria-disabled={page <= 1}
        className={`flex size-10 items-center justify-center rounded-lg border text-sm ${
          page <= 1
            ? "pointer-events-none border-white/10 text-white/25"
            : "border-white/20 text-white hover:border-moz-teal hover:text-moz-teal"
        }`}
      >
        ←
      </Link>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <Link
          key={p}
          href={href(p)}
          aria-current={p === page ? "page" : undefined}
          className={`flex size-10 items-center justify-center rounded-lg border text-sm ${
            p === page
              ? "border-moz-teal bg-moz-teal text-[#0b0f14]"
              : "border-white/20 text-white hover:border-moz-teal hover:text-moz-teal"
          }`}
        >
          {p}
        </Link>
      ))}

      <Link
        href={href(Math.min(totalPages, page + 1))}
        aria-disabled={page >= totalPages}
        className={`flex size-10 items-center justify-center rounded-lg border text-sm ${
          page >= totalPages
            ? "pointer-events-none border-white/10 text-white/25"
            : "border-white/20 text-white hover:border-moz-teal hover:text-moz-teal"
        }`}
      >
        →
      </Link>
    </div>
  );
}

export function parsePage(value: string | string[] | undefined) {
  const n = Number(Array.isArray(value) ? value[0] : value);
  return Number.isFinite(n) && n >= 1 ? Math.floor(n) : 1;
}
