import type { Metadata } from "next";
import BlogHero from "@/components/blog/BlogHero";
import BlogList from "@/components/blog/BlogList";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | Mozcyber",
  description:
    "Artigos da comunidade Mozcyber sobre cibersegurança, formação e literacia digital em Moçambique.",
};

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function BlogPage({ searchParams }: Props) {
  const { page } = await searchParams;

  return (
    <>
      <BlogHero />
      <BlogList page={page} />
    </>
  );
}
