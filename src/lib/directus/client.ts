import { createDirectus, rest, staticToken } from '@directus/sdk';

const url = process.env.NEXT_PUBLIC_DIRECTUS_URL?.replace(/\/$/, '') || 'http://localhost:8055';
const token = process.env.DIRECTUS_TOKEN || '';

// Debug: print first few characters of token (remove in production)
console.log('Token starts with:', token.substring(0, 10));

export const directus = createDirectus(url)
  .with(staticToken(token))
  .with(rest());

export function getAssetUrl(fileId: string, options?: { w?: number; h?: number; fit?: string }) {
  if (!fileId) return '';
  let assetUrl = `${url}/assets/${fileId}`;
  if (options) {
    const params = new URLSearchParams();
    if (options.w) params.set('width', options.w.toString());
    if (options.h) params.set('height', options.h.toString());
    if (options.fit) params.set('fit', options.fit);
    assetUrl += `?${params.toString()}`;
  }
  return assetUrl;
}

export const getHeroUrl = getAssetUrl;
