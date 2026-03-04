import { directus } from './client';
import { readItems } from '@directus/sdk';

// ------------------------------------------------------------
// Type Definitions
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
  headline: string;        // field name in your categories collection
  slug: string;
  description?: string;
}

export interface Article {
  id: number;
  headline: string;
  slug: string;
  published_at: string;
  excerpt?: string;
  featured: boolean;
  hero_image?: string;      // file ID
  body?: string;
  status: string;
  date_created: string;
  date_updated: string;
  authors?: number[];       // array of author IDs
  categories?: number[];    // array of category IDs
}

// ------------------------------------------------------------
// Helper: Fetch authors by IDs
// ------------------------------------------------------------
export async function getAuthorsByIds(ids: number[]): Promise<Author[]> {
  if (!ids.length) return [];
  try {
    const authors = await directus.request(
      readItems('authors', {
        filter: { id: { _in: ids } },
        fields: ['id', 'name', 'slug', 'image', 'bio'],
      })
    );
    return authors as Author[];
  } catch (error) {
    console.error('❌ Error fetching authors:', error);
    return [];
  }
}

// ------------------------------------------------------------
// Helper: Fetch categories by IDs
// ------------------------------------------------------------
export async function getCategoriesByIds(ids: number[]): Promise<Category[]> {
  if (!ids.length) return [];
  try {
    const categories = await directus.request(
      readItems('categories', {
        filter: { id: { _in: ids } },
        fields: ['id', 'headline', 'slug', 'description'],
      })
    );
    return categories as Category[];
  } catch (error) {
    console.error('❌ Error fetching categories:', error);
    return [];
  }
}

// ------------------------------------------------------------
// Fetch featured articles (limit 3) – without nested fields
// ------------------------------------------------------------
export async function getFeaturedArticles(): Promise<Article[]> {
  try {
    const articles = await directus.request(
      readItems('articles', {
        filter: {
          featured: { _eq: true },
          status: { _eq: 'published' },
        },
        sort: ['-published_at'],
        limit: 3,
        fields: [
          'id',
          'headline',
          'slug',
          'published_at',
          'excerpt',
          'featured',
          'hero_image',
          'authors',        // array of IDs
          'categories',     // array of IDs
        ],
      })
    );
    return articles as Article[];
  } catch (error) {
    console.error('❌ Error fetching featured articles:', error);
    return [];
  }
}

// ------------------------------------------------------------
// Fetch latest articles (paginated)
// ------------------------------------------------------------
export async function getLatestArticles(limit = 10): Promise<Article[]> {
  try {
    const articles = await directus.request(
      readItems('articles', {
        filter: { status: { _eq: 'published' } },
        sort: ['-published_at'],
        limit,
        fields: [
          'id',
          'headline',
          'slug',
          'published_at',
          'excerpt',
          'hero_image',
          'authors',
          'categories',
        ],
      })
    );
    return articles as Article[];
  } catch (error) {
    console.error('❌ Error fetching latest articles:', error);
    return [];
  }
}

// ------------------------------------------------------------
// Fetch a single article by slug – without nested fields
// ------------------------------------------------------------
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const articles = await directus.request(
      readItems('articles', {
        filter: { slug: { _eq: slug }, status: { _eq: 'published' } },
        limit: 1,
        fields: [
          '*',
          'hero_image',
          'authors',
          'categories',
        ],
      })
    );
    return articles.length > 0 ? (articles[0] as Article) : null;
  } catch (error) {
    console.error(`❌ Error fetching article with slug ${slug}:`, error);
    return null;
  }
}

// ------------------------------------------------------------
// Fetch articles by category slug – using separate helper
// ------------------------------------------------------------
export async function getArticlesByCategory(categorySlug: string): Promise<Article[]> {
  try {
    // First get category ID
    const categories = await directus.request(
      readItems('categories', {
        filter: { slug: { _eq: categorySlug } },
        limit: 1,
        fields: ['id'],
      })
    );
    if (categories.length === 0) return [];

    const categoryId = categories[0].id;

    const articles = await directus.request(
      readItems('articles', {
        filter: {
          categories: { _in: [categoryId] },
          status: { _eq: 'published' },
        },
        sort: ['-published_at'],
        fields: [
          'id',
          'headline',
          'slug',
          'published_at',
          'excerpt',
          'hero_image',
          'authors',
        ],
      })
    );
    return articles as Article[];
  } catch (error) {
    console.error(`❌ Error fetching articles for category ${categorySlug}:`, error);
    return [];
  }
}
