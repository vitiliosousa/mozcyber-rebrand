import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Eventos", href: "#eventos" },
  { label: "O que fazemos", href: "#fazemos" },
  { label: "Equipa", href: "#equipa" },
  { label: "Parceiros", href: "#parceiros" },
];

const pageLinks = [
  { label: "Sobre", href: "/sobre" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/contacto" },
];

export default function Footer() {
  return (
    <footer className="bg-moz-teal text-[#0b0f14]">
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-16">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="/Logo.png"
                alt="Mozcyber"
                width={56}
                height={56}
                className="size-12"
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#0b0f14]/70">
              Comunidade de cibersegurança em Moçambique — workshops,
              hackathons, CTFs e literacia digital.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0b0f14]/55">
              Navegação
            </p>
            <ul className="mt-5 space-y-3">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[#0b0f14]/75 transition-colors hover:text-[#0b0f14]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0b0f14]/55">
              Páginas
            </p>
            <ul className="mt-5 space-y-3">
              {pageLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[#0b0f14]/75 transition-colors hover:text-[#0b0f14]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-[#0b0f14]/20 pt-8 text-sm text-[#0b0f14]/55 sm:flex-row sm:items-center sm:justify-between">
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
