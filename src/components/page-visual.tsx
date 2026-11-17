import Image from 'next/image';
import { media } from '@/content/media';
import type { Locale } from '@/content/site';

export function PageVisual({
  id,
  locale,
  priority = false,
}: {
  id: string;
  locale: Locale;
  priority?: boolean;
}) {
  const visual = media.find((m) => m.id === id);
  if (!visual) throw new Error(`Missing page visual: ${id}`);
  return (
    <figure className={`page-visual ${visual.kind}`}>
      <Image
        src={visual.src}
        alt={visual.alt[locale]}
        width={1200}
        height={900}
        sizes="(max-width: 760px) 100vw, 50vw"
        priority={priority}
      />
      <figcaption>{visual.caption[locale]}</figcaption>
    </figure>
  );
}
