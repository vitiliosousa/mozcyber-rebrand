"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export type PanelLink = {
  href: string;
  label: string;
};

type Props = {
  variant: "dashboard" | "admin";
  links: PanelLink[];
  email?: string | null;
  name?: string | null;
  image?: string | null;
  isAdmin?: boolean;
  children: React.ReactNode;
  signOutAction: () => Promise<void>;
};

export default function PanelShell({
  variant,
  links,
  email,
  name,
  image,
  isAdmin,
  children,
  signOutAction,
}: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(href: string) {
    if (href === "/dashboard" || href === "/admin") {
      return pathname === href;
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const title =
    links.find((l) => isActive(l.href))?.label.replace(/\s*\(\d+\)$/, "") ||
    (variant === "admin" ? "Admin" : "Painel");

  const initials = (name || email || "?")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="border-b border-white/8 px-5 py-5">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/Logo.png"
            alt="Mozcyber"
            width={32}
            height={32}
            className="size-8"
            priority
          />
          <span className="text-lg font-black tracking-tight text-moz-teal">
            Mozcyber
          </span>
        </Link>
        <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-white/35">
          {variant === "admin" ? "Administração" : "Espaço do autor"}
        </p>
      </div>

      <nav className="flex-1 space-y-0.5 px-3 py-4">
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
          Menu
        </p>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className={`flex items-center rounded-lg px-3 py-2 text-sm transition-colors ${
              isActive(link.href)
                ? "bg-moz-teal/12 font-medium text-moz-teal"
                : "text-white/65 hover:bg-white/5 hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        ))}

        {variant === "dashboard" && isAdmin && (
          <Link
            href="/admin"
            onClick={() => setOpen(false)}
            className="mt-4 block rounded-lg border border-moz-teal/25 px-3 py-2 text-sm text-moz-teal hover:bg-moz-teal/10"
          >
            Ir ao admin →
          </Link>
        )}
        {variant === "admin" && (
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="mt-4 block rounded-lg px-3 py-2 text-sm text-white/45 hover:bg-white/5 hover:text-white"
          >
            ← Painel do autor
          </Link>
        )}
      </nav>

      <div className="border-t border-white/8 px-5 py-4">
        <div className="flex items-center gap-3">
          {image ? (
            <Image
              src={image}
              alt=""
              width={36}
              height={36}
              className="size-9 shrink-0 rounded-full object-cover"
            />
          ) : (
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-moz-teal/15 text-xs font-semibold text-moz-teal">
              {initials}
            </span>
          )}
          <div className="min-w-0">
            {name && (
              <p className="truncate text-sm font-medium text-white/80">
                {name}
              </p>
            )}
            <p className="truncate text-xs text-white/45">{email}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <Link
            href="/blog"
            className="text-xs text-white/40 hover:text-moz-teal"
          >
            Ver blog
          </Link>
          <span className="text-white/15">·</span>
          <form action={signOutAction}>
            <button
              type="submit"
              className="text-xs text-white/40 transition-colors hover:text-moz-teal"
            >
              Sair
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-dvh bg-[#0a0e13] text-white">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 border-r border-white/8 bg-[#0d1218] md:block">
        {sidebar}
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            aria-label="Fechar menu"
            onClick={() => setOpen(false)}
          />
          <aside className="relative h-full w-60 border-r border-white/8 bg-[#0d1218]">
            {sidebar}
          </aside>
        </div>
      )}

      <div className="md:pl-60">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/8 bg-[#0a0e13]/90 px-4 py-3 backdrop-blur-md md:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="rounded-lg border border-white/15 px-3 py-1.5 text-sm md:hidden"
              aria-label="Abrir menu"
            >
              Menu
            </button>
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/35">
                {variant === "admin" ? "Admin" : "Dashboard"}
              </p>
              <p className="text-sm font-medium text-white/90">{title}</p>
            </div>
          </div>
          {variant === "dashboard" ? (
            <Link
              href="/dashboard/blog/new"
              className="rounded-lg bg-moz-teal px-3.5 py-1.5 text-xs font-semibold text-[#0b0f14] hover:bg-white"
            >
              Novo artigo
            </Link>
          ) : (
            <Link
              href="/admin/blog"
              className="rounded-lg border border-white/12 px-3.5 py-1.5 text-xs text-white/70 hover:border-moz-teal hover:text-moz-teal"
            >
              Artigos
            </Link>
          )}
        </header>

        <main className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8 md:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
