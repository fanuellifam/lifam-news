'use client';

import Image from 'next/image';
import { getAssetUrl } from '@/lib/directus/client';

interface DirectusImageProps {
  src: string;                // file ID
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  fit?: 'cover' | 'contain' | 'inside' | 'outside';
}

export default function DirectusImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  fit = 'cover',
}: DirectusImageProps) {
  const imageUrl = getAssetUrl(src, { w: width, h: height, fit });
  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}
