import { notFound } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { directus } from '@/lib/directus/client';
import { readItems } from '@directus/sdk';
import { getArticlesByCategorySlug } from '@/lib/directus/queries';
import { getAssetUrl } from '@/lib/directus/client';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  // Fetch category details – note: field is 'name', not 'title' or 'headline'
  const categories = await directus.request(
    readItems('categories', {
      filter: { slug: { _eq: slug } },
      limit: 1,
      fields: ['id', 'name', 'description'],
    })
  );

  if (!categories.length) {
    notFound();
  }

  const category = categories[0];

  // Fetch articles in this category
  const articles = await getArticlesByCategorySlug(slug, 10);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
        {category.description && (
          <p className="text-muted-foreground">{category.description}</p>
        )}
        <p className="text-sm text-muted-foreground mt-2">
          {articles.length} article{articles.length !== 1 ? 's' : ''}
        </p>
      </header>

      {articles.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <article key={article.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition">
              {article.featured_image && (
                <img
                  src={getAssetUrl(article.featured_image, { w: 400, h: 250, fit: 'cover' })}
                  alt={article.headline}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">
                  <Link href={`/article/${article.slug}`}>{article.headline}</Link>
                </h2>
                <p className="text-muted-foreground text-sm mb-2">{article.summary}</p>
                <time className="text-xs text-muted-foreground">
                  {format(new Date(article.publish_date), 'MMMM d, yyyy')}
                </time>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-12">
          No articles found in this category.
        </p>
      )}
    </div>
  );
}

// Optionally disable static generation
export async function generateStaticParams() {
  return [];
}

export const revalidate = 3600;
