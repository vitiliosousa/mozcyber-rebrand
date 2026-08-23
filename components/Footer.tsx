import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Início", href: "/" },
  { label: "Eventos", href: "/eventos" },
  { label: "O que fazemos", href: "/#fazemos" },
  { label: "Equipa", href: "/#equipa" },
  { label: "Parceiros", href: "/#parceiros" },
];

const pageLinks = [
  { label: "Sobre", href: "/sobre" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contacto", href: "/contacto" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#101820]">
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-10 md:py-12">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="/Logo.png"
                alt="Mozcyber"
                width={40}
                height={40}
                className="size-9"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-moz-muted">
              Comunidade de cibersegurança em Moçambique — workshops,
              hackathons, CTFs e literacia digital.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-moz-teal">
              Navegação
            </p>
            <ul className="mt-5 space-y-3">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/70 transition-colors hover:text-moz-teal"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-moz-teal">
              Páginas
            </p>
            <ul className="mt-5 space-y-3">
              {pageLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/70 transition-colors hover:text-moz-teal"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Mozcyber. Todos os direitos
            reservados.
          </p>
          <p>Maputo, Moçambique</p>
        </div>
      </div>
    </footer>
  );
}
