import { getArticleBySlug, getAuthorsByIds, getCategoriesByIds } from '@/lib/directus/queries';
import { getAssetUrl } from '@/lib/directus/client';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Fetch related authors and categories (if IDs exist)
  const authors = article.authors?.length ? await getAuthorsByIds(article.authors) : [];
  const categories = article.categories?.length ? await getCategoriesByIds(article.categories) : [];

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{article.headline}</h1>

        <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
          <time dateTime={article.published_at}>
            {format(new Date(article.published_at), 'MMMM d, yyyy')}
          </time>
          {authors.length > 0 && (
            <div className="flex gap-2">
              <span>By</span>
              {authors.map((author) => (
                <Link
                  key={author.id}
                  href={`/author/${author.slug}`}
                  className="hover:underline"
                >
                  {author.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {categories.length > 0 && (
          <div className="flex gap-2">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="text-sm bg-muted px-3 py-1 rounded-full hover:bg-muted/80 transition"
              >
                {cat.headline}
              </Link>
            ))}
          </div>
        )}
      </header>

      {article.hero_image && (
        <div className="relative w-full h-[400px] mb-8">
          <img
            src={getAssetUrl(article.hero_image, { w: 1200, h: 600, fit: 'cover' })}
            alt={article.headline}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
      )}

      <div className="prose prose-lg max-w-none">
        {article.body ? (
          <div dangerouslySetInnerHTML={{ __html: article.body }} />
        ) : (
          <p>No content available.</p>
        )}
      </div>
    </article>
  );
}

export const revalidate = 3600;
