import type { Metadata } from "next";
import BlogHero from "@/components/blog/BlogHero";
import BlogList from "@/components/blog/BlogList";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | Mozcyber",
  description:
    "Artigos da comunidade Mozcyber sobre cibersegurança, formação e literacia digital em Moçambique.",
  openGraph: {
    title: "Blog | Mozcyber",
    description:
      "Artigos da comunidade Mozcyber sobre cibersegurança, formação e literacia digital em Moçambique.",
    type: "website",
  },
};

type Props = {
  searchParams: Promise<{ page?: string; q?: string; category?: string }>;
};

export default async function BlogPage({ searchParams }: Props) {
  const { page, q, category } = await searchParams;

  return (
    <>
      <BlogHero />
      <div className="mx-auto max-w-7xl px-6 pb-4 md:px-10">
        <Link
          href="/blog/rss.xml"
          className="text-xs text-white/40 hover:text-moz-teal"
        >
          RSS
        </Link>
      </div>
      <BlogList page={page} q={q} category={category} />
    </>
  );
}
