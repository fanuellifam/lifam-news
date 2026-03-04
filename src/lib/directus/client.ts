import { createDirectus, rest, staticToken } from '@directus/sdk';

// Ensure the URL ends without a slash
const url = process.env.NEXT_PUBLIC_DIRECTUS_URL?.replace(/\/$/, '') || 'http://localhost:8055';
const token = process.env.DIRECTUS_TOKEN || '';

export const directus = createDirectus(url)
  .with(staticToken(token))
  .with(rest());

// Helper to get the full URL for uploaded files
export function getAssetUrl(fileId: string, options?: { w?: number; h?: number; fit?: 'cover' | 'contain' | 'inside' | 'outside' }) {
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

export default directus;
