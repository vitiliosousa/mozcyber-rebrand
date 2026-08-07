import Link from "next/link";
import Image from "next/image";

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-[#0a0e13] text-white">
      <header className="sticky top-0 z-30 border-b border-white/8 bg-[#0a0e13]/92 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/blog" className="shrink-0">
              <Image
                src="/Logo.png"
                alt="Mozcyber"
                width={36}
                height={36}
                className="size-8"
                priority
              />
            </Link>
            <div className="h-5 w-px bg-white/15" aria-hidden />
            <p className="text-sm text-white/55">Editor</p>
          </div>
          <Link
            href="/dashboard/blog"
            className="text-sm text-white/50 transition-colors hover:text-moz-teal"
          >
            ← Voltar aos artigos
          </Link>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8 md:py-8">
        {children}
      </main>
    </div>
  );
}
