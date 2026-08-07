"use client";

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
  isAdmin?: boolean;
  children: React.ReactNode;
  signOutAction: () => Promise<void>;
};

export default function PanelShell({
  variant,
  links,
  email,
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

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="border-b border-white/10 px-5 py-5">
        <Link
          href="/"
          className="font-black text-moz-teal"
          onClick={() => setOpen(false)}
        >
          Mozcyber
        </Link>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/40">
          {variant === "admin" ? "Admin" : "Painel"}
        </p>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className={`block rounded-lg px-3 py-2.5 text-sm transition-colors ${
              isActive(link.href)
                ? "bg-moz-teal/15 text-moz-teal"
                : "text-white/70 hover:bg-white/5 hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        ))}

        {variant === "dashboard" && isAdmin && (
          <Link
            href="/admin"
            onClick={() => setOpen(false)}
            className="mt-4 block rounded-lg border border-moz-teal/30 px-3 py-2.5 text-sm text-moz-teal hover:bg-moz-teal/10"
          >
            Ir ao admin →
          </Link>
        )}
        {variant === "admin" && (
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="mt-4 block rounded-lg px-3 py-2.5 text-sm text-white/50 hover:bg-white/5 hover:text-white"
          >
            ← Painel do membro
          </Link>
        )}
      </nav>

      <div className="border-t border-white/10 px-5 py-4">
        <p className="truncate text-xs text-white/45">{email}</p>
        <form action={signOutAction} className="mt-3">
          <button
            type="submit"
            className="text-sm text-white/70 transition-colors hover:text-moz-teal"
          >
            Sair
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-dvh bg-[#0b0f14] text-white">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 border-r border-white/10 bg-[#0d1218] md:block">
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
          <aside className="relative h-full w-60 border-r border-white/10 bg-[#0d1218]">
            {sidebar}
          </aside>
        </div>
      )}

      <div className="md:pl-60">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-[#0b0f14]/90 px-4 py-3 backdrop-blur-md md:hidden">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-lg border border-white/20 px-3 py-2 text-sm"
            aria-label="Abrir menu"
          >
            Menu
          </button>
          <span className="font-black text-moz-teal">Mozcyber</span>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-10 xl:max-w-6xl">
          {children}
        </main>
      </div>
    </div>
  );
}
