"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion, revealEase } from "@/lib/gsap";

const navLinks = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Eventos", href: "/eventos" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/contacto" },
];

const LINKTREE_URL =
  "https://linktr.ee/mozcyber?utm_source=linktree_profile_share&ltsid=30a4afa0-726d-4922-a0e1-66554b59c148";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const mobileNavRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useGSAP(
    () => {
      const nav = mobileNavRef.current;
      if (!nav || prefersReducedMotion()) return;

      if (open) {
        gsap.fromTo(
          nav,
          { clipPath: "inset(0 0 100% 0)", opacity: 0.6 },
          {
            clipPath: "inset(0 0 0% 0)",
            opacity: 1,
            duration: 0.45,
            ease: revealEase,
          },
        );
        gsap.fromTo(
          nav.querySelectorAll("[data-mobile-link]"),
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.06,
            delay: 0.12,
            ease: revealEase,
          },
        );
      }
    },
    { dependencies: [open] },
  );

  return (
    <div
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-[#0b0f14]/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-2.5 md:px-10">
        <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
          <Image
            src="/Logo.png"
            alt="Mozcyber"
            width={40}
            height={40}
            className="size-8 md:size-9"
            priority
          />
        </Link>

        <nav className="hidden md:block" aria-label="Navegação principal">
          <ul className="flex items-center gap-5 text-sm tracking-wide text-white/80 lg:gap-7">
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

        <div className="flex items-center gap-3">
          <a
            href={LINKTREE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-lg bg-white px-4 py-1.5 text-sm font-semibold text-black transition-colors hover:bg-moz-teal sm:inline-flex"
          >
            Entrar
          </a>

          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-lg border border-white/20 text-white md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {open && (
        <nav
          ref={mobileNavRef}
          id="mobile-nav"
          className="border-t border-white/10 bg-[#0b0f14]/95 px-6 py-6 backdrop-blur-md md:hidden"
          aria-label="Navegação mobile"
        >
          <ul className="space-y-1">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <Link
                  data-mobile-link
                  href={href}
                  className="block rounded-lg px-3 py-3 text-base text-white/85 transition-colors hover:bg-white/5 hover:text-moz-teal"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <a
                data-mobile-link
                href={LINKTREE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg bg-moz-teal px-3 py-3 text-center text-sm font-semibold text-[#0b0f14]"
                onClick={() => setOpen(false)}
              >
                Entrar
              </a>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
