"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export type PanelFilterSelect = {
  name: string;
  value: string;
  allLabel: string;
  options: { value: string; label: string }[];
};

export default function PanelListFilters({
  basePath,
  q = "",
  selects = [],
  searchPlaceholder = "Pesquisar…",
}: {
  basePath: string;
  q?: string;
  selects?: PanelFilterSelect[];
  searchPlaceholder?: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(q);
  const [, startTransition] = useTransition();

  function currentSelects() {
    return Object.fromEntries(selects.map((s) => [s.name, s.value]));
  }

  function push(nextQ: string, nextValues: Record<string, string>) {
    const params = new URLSearchParams();
    if (nextQ.trim()) params.set("q", nextQ.trim());
    for (const [name, value] of Object.entries(nextValues)) {
      if (value) params.set(name, value);
    }
    const qs = params.toString();
    startTransition(() => {
      router.push(qs ? `${basePath}?${qs}` : basePath);
    });
  }

  useEffect(() => {
    setQuery(q);
  }, [q]);

  useEffect(() => {
    if (query === q) return;
    const t = setTimeout(() => push(query, currentSelects()), 350);
    return () => clearTimeout(t);
  }, [query]);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={searchPlaceholder}
        className="rounded-lg border border-white/15 bg-white/3 px-3 py-2 text-sm outline-none focus:border-moz-teal sm:w-56"
      />
      {selects.map((select) => (
        <select
          key={select.name}
          value={select.value}
          onChange={(e) => {
            push(query, {
              ...currentSelects(),
              [select.name]: e.target.value,
            });
          }}
          className="rounded-lg border border-white/15 bg-white/3 px-3 py-2 text-sm outline-none focus:border-moz-teal"
        >
          <option value="" className="bg-[#0b0f14]">
            {select.allLabel}
          </option>
          {select.options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#0b0f14]">
              {opt.label}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
}

export const POST_STATUS_FILTER_OPTIONS = [
  { value: "DRAFT", label: "Rascunho" },
  { value: "PENDING", label: "Em revisão" },
  { value: "PUBLISHED", label: "Publicado" },
  { value: "REJECTED", label: "Rejeitado" },
];
