import photos from '@/content/photo-variants.json';

export function ResponsivePhoto({
  src,
  alt,
  sizes,
  fill = false,
  priority = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  fill?: boolean;
  priority?: boolean;
}) {
  const photo = photos[src as keyof typeof photos];
  if (!photo) throw new Error(`Missing responsive photo: ${src}`);
  return (
    // Static WHC hosting has no image optimizer; these local variants are built with Sharp.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      srcSet={photo.variants.map((variant) => `${variant.src} ${variant.width}w`).join(', ')}
      sizes={sizes}
      alt={alt}
      width={photo.width}
      height={photo.height}
      className={fill ? 'photo-fill' : undefined}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
    />
  );
}
