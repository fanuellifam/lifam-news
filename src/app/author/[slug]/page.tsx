import { directus } from '@/lib/directus/client';
import { readItems } from '@directus/sdk';
import { getAssetUrl } from '@/lib/directus/client';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;

  const authors = await directus.request(
    readItems('authors', {
      filter: { slug: { _eq: slug } },
      limit: 1,
      fields: ['id', 'name', 'bio', 'image'],
    })
  );

  if (authors.length === 0) {
    notFound();
  }

  const author = authors[0];

  const articles = await directus.request(
    readItems('articles', {
      filter: {
        authors: { _in: [author.id] },
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
      ],
    })
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 flex items-start gap-6">
        {author.image && (
          <img
            src={getAssetUrl(author.image, { w: 120, h: 120, fit: 'cover' })}
            alt={author.name}
            className="w-24 h-24 rounded-full object-cover"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold mb-2">{author.name}</h1>
          {author.bio && <p className="text-muted-foreground">{author.bio}</p>}
          <p className="text-sm text-muted-foreground mt-2">
            {articles.length} article{articles.length !== 1 ? 's' : ''}
          </p>
        </div>
      </header>

      {articles.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article: any) => (
            <article key={article.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition">
              {article.hero_image && (
                <img
                  src={getAssetUrl(article.hero_image, { w: 400, h: 250, fit: 'cover' })}
                  alt={article.headline}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">
                  <Link href={`/article/${article.slug}`}>{article.headline}</Link>
                </h2>
                <p className="text-muted-foreground text-sm mb-2">{article.excerpt}</p>
                <time className="text-xs text-muted-foreground">
                  {format(new Date(article.published_at), 'MMMM d, yyyy')}
                </time>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-12">
          No articles found by this author.
        </p>
      )}
    </div>
  );
}

// Temporarily disable static generation to avoid build-time API calls
export async function generateStaticParams() {
  return []; // Will be generated on-demand (ISR)
}

export const revalidate = 3600;
