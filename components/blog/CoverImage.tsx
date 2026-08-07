import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

function isRemote(src: string) {
  return /^https?:\/\//i.test(src);
}

export default function CoverImage({
  src,
  alt,
  className = "object-cover",
  sizes,
  priority,
}: Props) {
  if (isRemote(src)) {
    return (
      // Remote covers from arbitrary author URLs — skip next/image host allowlist
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} className={`absolute inset-0 size-full ${className}`} />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
