"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Eventos", href: "#eventos" },
  { label: "Blog", href: "#blog" },
  { label: "Contacto", href: "#contacto" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300 ${
        scrolled ? "bg-[#0b0f14]/20 backdrop-blur-lg" : "bg-transparent"
      }`}
    >
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link href="/" className="shrink-0">
          <Image
            src="/Logo.png"
            alt="Mozcyber"
            width={56}
            height={56}
            className="size-12 md:size-14"
            priority
          />
        </Link>

        <nav className="hidden lg:block" aria-label="Navegação principal">
          <ul className="flex items-center gap-8 text-sm tracking-wide text-white/80">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="transition-colors hover:text-moz-teal"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="#entrar"
          className="rounded-lg bg-white px-5 py-2 text-sm font-semibold text-black transition-colors hover:bg-moz-teal"
        >
          Entrar
        </Link>
      </header>
    </div>
  );
}
