import { absoluteUrl, publishedWhere } from "@/lib/blog";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const posts = await prisma.post.findMany({
    where: publishedWhere,
    orderBy: { publishedAt: "desc" },
    take: 30,
    include: { author: { select: { name: true } } },
  });

  const site = absoluteUrl("/");
  const items = posts
    .map((post) => {
      const link = absoluteUrl(`/blog/${post.slug}`);
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${link}</link>
      <guid>${link}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${(post.publishedAt || post.createdAt).toUTCString()}</pubDate>
      <author>${post.author.name || "Mozcyber"}</author>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Mozcyber Blog</title>
    <link>${site}blog</link>
    <description>Artigos da comunidade Mozcyber</description>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=600, stale-while-revalidate",
    },
  });
}
