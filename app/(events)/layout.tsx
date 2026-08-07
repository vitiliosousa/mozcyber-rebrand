import Link from "next/link";

export default function EventLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Link
        href="/eventos"
        className="fixed top-5 left-5 z-50 rounded-lg border border-white/20 bg-[#0b0f14]/80 px-3 py-2 text-sm text-white/80 backdrop-blur-md transition-colors hover:border-moz-teal hover:text-moz-teal md:top-6 md:left-8"
      >
        ← Eventos
      </Link>
      {children}
    </>
  );
}
