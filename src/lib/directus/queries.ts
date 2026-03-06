import { directus } from './client';
import { readItems } from '@directus/sdk';
import { cache } from 'react';

// ------------------------------------------------------------
// Type Definitions – Match Your Actual Directus Schema
// ------------------------------------------------------------

export interface Author {
  id: number;
  name: string;
  slug: string;
  image?: string;          // file ID
  bio?: string;
}

export interface Category {
  id: number;
  name: string;            // field is 'name', not 'title'
  slug: string;
  description?: string;
}

export interface Article {
  id: number;
  headline: string;
  slug: string;
  summary?: string;         // short excerpt
  content?: string;         // full article body (HTML)
  publish_date: string;     // ISO datetime
  breaking_news: boolean;
  featured: boolean;
  featured_image?: string;  // file ID of the hero image
  views: number;            // view count for "Most Read"
  category?: number;        // ID of the category (single relation)
  author?: number;          // ID of the author (single relation)
  tags?: string[];
  status: string;           // e.g., 'published', 'draft'
  date_created: string;
  date_updated: string;
}

// ------------------------------------------------------------
// Asset URL Helper – with optional image transformations
// ------------------------------------------------------------

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL?.replace(/\/$/, '') || '';

/**
 * Returns a full URL to a Directus file asset, with optional resize parameters.
 * @param fileId - The UUID of the file
 * @param options - Optional width, height, and fit (cover, contain, inside, outside)
 * @returns Fully qualified asset URL
 */
export function getAssetUrl(
  fileId: string,
  options?: { w?: number; h?: number; fit?: 'cover' | 'contain' | 'inside' | 'outside' }
): string {
  if (!fileId) return '';
  let url = `${DIRECTUS_URL}/assets/${fileId}`;
  if (options) {
    const params = new URLSearchParams();
    if (options.w) params.set('width', options.w.toString());
    if (options.h) params.set('height', options.h.toString());
    if (options.fit) params.set('fit', options.fit);
    url += `?${params.toString()}`;
  }
  return url;
}

// Alias for backward compatibility
export const getHeroUrl = getAssetUrl;

// ------------------------------------------------------------
// Fetch Helpers – each wrapped with React cache()
// ------------------------------------------------------------

/**
 * Fetch a single category by its ID.
 */
export const getCategoryById = cache(async (id: number): Promise<Category | null> => {
  try {
    const result = await directus.request(
      readItems('categories', {
        filter: { id: { _eq: id } },
        limit: 1,
        fields: ['id', 'name', 'slug', 'description'],
      })
    );
    return result.length ? (result[0] as Category) : null;
  } catch (error) {
    console.error(`❌ Error fetching category #${id}:`, error);
    return null;
  }
});

/**
 * Fetch all published categories, sorted by name.
 * Used for the main navigation and dropdown menus.
 */
export const getAllCategories = cache(async (): Promise<Category[]> => {
  try {
    const categories = await directus.request(
      readItems('categories', {
        // If you don't have a 'status' field, remove the filter or adjust accordingly
        filter: { status: { _eq: 'published' } },
        sort: ['name'],
        fields: ['id', 'name', 'slug', 'description'],
      })
    );
    return categories as Category[];
  } catch (error) {
    console.error('❌ Error fetching all categories:', error);
    return [];
  }
});

/**
 * Fetch a single author by ID.
 */
export const getAuthorById = cache(async (id: number): Promise<Author | null> => {
  try {
    const result = await directus.request(
      readItems('authors', {
        filter: { id: { _eq: id } },
        limit: 1,
        fields: ['id', 'name', 'slug', 'image', 'bio'],
      })
    );
    return result.length ? (result[0] as Author) : null;
  } catch (error) {
    console.error(`❌ Error fetching author #${id}:`, error);
    return null;
  }
});

// ------------------------------------------------------------
// Article Queries
// ------------------------------------------------------------

/**
 * Fetch featured articles (limit 5).
 */
export const getFeaturedArticles = cache(async (): Promise<Article[]> => {
  try {
    const articles = await directus.request(
      readItems('articles', {
        filter: {
          featured: { _eq: true },
          status: { _eq: 'published' },
        },
        sort: ['-publish_date'],
        limit: 5,
        fields: [
          'id',
          'headline',
          'slug',
          'publish_date',
          'summary',
          'featured',
          'featured_image',
          'category',
          'author',
        ],
      })
    );
    return articles as Article[];
  } catch (error) {
    console.error('❌ Error fetching featured articles:', error);
    return [];
  }
});

/**
 * Fetch the latest published articles (for the "Latest News" list).
 */
export const getLatestArticles = cache(async (limit = 10): Promise<Article[]> => {
  try {
    const articles = await directus.request(
      readItems('articles', {
        filter: { status: { _eq: 'published' } },
        sort: ['-publish_date'],
        limit,
        fields: [
          'id',
          'headline',
          'slug',
          'publish_date',
          'summary',
          'featured_image',
          'category',
          'author',
        ],
      })
    );
    return articles as Article[];
  } catch (error) {
    console.error('❌ Error fetching latest articles:', error);
    return [];
  }
});

/**
 * Fetch articles that have breaking_news = true.
 */
export const getBreakingNews = cache(async (limit = 5): Promise<Article[]> => {
  try {
    const articles = await directus.request(
      readItems('articles', {
        filter: { breaking_news: { _eq: true }, status: { _eq: 'published' } },
        sort: ['-publish_date'],
        limit,
        fields: ['id', 'headline', 'slug', 'publish_date'],
      })
    );
    return articles as Article[];
  } catch (error) {
    console.error('❌ Error fetching breaking news:', error);
    return [];
  }
});

/**
 * Fetch the most read articles (by views).
 */
export const getMostRead = cache(async (limit = 5): Promise<Article[]> => {
  try {
    const articles = await directus.request(
      readItems('articles', {
        filter: { status: { _eq: 'published' } },
        sort: ['-views', '-publish_date'],
        limit,
        fields: ['id', 'headline', 'slug', 'views'],
      })
    );
    return articles as Article[];
  } catch (error) {
    console.error('❌ Error fetching most read:', error);
    return [];
  }
});

/**
 * Fetch articles belonging to a category, identified by its slug.
 * First resolves the category ID, then fetches articles with that ID.
 */
export const getArticlesByCategorySlug = cache(
  async (slug: string, limit = 10): Promise<Article[]> => {
    try {
      // 1. Get category ID from slug
      const cats = await directus.request(
        readItems('categories', {
          filter: { slug: { _eq: slug } },
          limit: 1,
          fields: ['id'],
        })
      );
      if (!cats.length) return [];

      const catId = cats[0].id;

      // 2. Fetch articles for that category
      const articles = await directus.request(
        readItems('articles', {
          filter: {
            category: { _eq: catId },
            status: { _eq: 'published' },
          },
          sort: ['-publish_date'],
          limit,
          fields: [
            'id',
            'headline',
            'slug',
            'publish_date',
            'summary',
            'featured_image',
            'author',
          ],
        })
      );
      return articles as Article[];
    } catch (error) {
      console.error(`❌ Error fetching articles for category "${slug}":`, error);
      return [];
    }
  }
);

/**
 * Fetch a single article by its slug.
 */
export const getArticleBySlug = cache(async (slug: string): Promise<Article | null> => {
  try {
    const articles = await directus.request(
      readItems('articles', {
        filter: { slug: { _eq: slug }, status: { _eq: 'published' } },
        limit: 1,
        fields: [
          '*',                  // all top‑level fields
          'featured_image',     // ensure image field is included
          'category',
          'author',
        ],
      })
    );
    return articles.length ? (articles[0] as Article) : null;
  } catch (error) {
    console.error(`❌ Error fetching article with slug "${slug}":`, error);
    return null;
  }
});
