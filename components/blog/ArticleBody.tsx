import CoverImage from "@/components/blog/CoverImage";
import Link from "next/link";

type Props = {
  category: string;
  categoryHref?: string;
  title: string;
  dateLabel: string;
  authorName: string;
  authorHref?: string;
  minutes: number;
  image?: string | null;
  html: string;
};

export default function ArticleBody({
  category,
  categoryHref,
  title,
  dateLabel,
  authorName,
  authorHref,
  minutes,
  image,
  html,
}: Props) {
  return (
    <>
      {categoryHref ? (
        <Link
          href={categoryHref}
          className="text-xs font-semibold uppercase tracking-[0.35em] text-moz-teal hover:text-white"
        >
          {category}
        </Link>
      ) : (
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-moz-teal">
          {category}
        </p>
      )}
      <h1 className="mt-3 break-words text-2xl leading-tight md:text-4xl">
        {title}
      </h1>
      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-moz-muted">
        <time>{dateLabel}</time>
        <span aria-hidden>·</span>
        {authorHref ? (
          <Link href={authorHref} className="hover:text-moz-teal">
            {authorName}
          </Link>
        ) : (
          <span>{authorName}</span>
        )}
        <span aria-hidden>·</span>
        <span>{minutes} min de leitura</span>
      </div>

      {image && (
        <div className="relative mt-8 aspect-video overflow-hidden md:mt-10">
          <CoverImage
            src={image}
            alt={title}
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>
      )}

      <div
        className="blog-article-content mt-10 text-base leading-relaxed text-white/75 md:text-lg"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
}
