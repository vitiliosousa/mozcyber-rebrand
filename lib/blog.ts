export const BLOG_CATEGORIES = [
  "Geral",
  "Cibersegurança",
  "Formação",
  "Eventos",
  "Literacia digital",
  "Carreira",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export const EXCERPT_MAX_WORDS = 40;

export function countWords(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

export function readingTimeMinutes(html: string) {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const words = text ? text.split(" ").length : 0;
  return Math.max(1, Math.ceil(words / 200));
}

export function absoluteUrl(path: string) {
  const base = (
    process.env.AUTH_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000"
  ).replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export const publishedWhere = {
  status: "PUBLISHED" as const,
  deletedAt: null,
};
