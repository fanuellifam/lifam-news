export const DIRECTUS_URL = process.env.DIRECTUS_URL;

export async function directusFetch(endpoint: string) {
  const res = await fetch(`${DIRECTUS_URL}${endpoint}`, {
    next: { revalidate: 60 }
  });

  if (!res.ok) {
    throw new Error("Directus API error");
  }

  return res.json();
}
