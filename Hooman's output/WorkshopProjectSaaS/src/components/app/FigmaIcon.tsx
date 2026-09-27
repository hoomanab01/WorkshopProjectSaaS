import Image from "next/image";

// An icon exported from the Figma design (public/figma/...). Decorative unless `alt` is given.
export function FigmaIcon({
  src,
  size = 16,
  alt = "",
  className,
}: {
  src: string;
  size?: number;
  alt?: string;
  className?: string;
}) {
  return <Image src={src} width={size} height={size} alt={alt} className={className} />;
}
