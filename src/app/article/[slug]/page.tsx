import { getArticleBySlug, getAuthorById, getCategoryById } from '@/lib/directus/queries';
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

  // Fetch related author and category (if they exist)
  const author = article.author ? await getAuthorById(article.author) : null;
  const category = article.category ? await getCategoryById(article.category) : null;

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{article.headline}</h1>

        <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
          <time dateTime={article.publish_date}>
            {format(new Date(article.publish_date), 'MMMM d, yyyy')}
          </time>
          {author && (
            <div className="flex gap-2">
              <span>By</span>
              <Link href={`/author/${author.slug}`} className="hover:underline">
                {author.name}
              </Link>
            </div>
          )}
        </div>

        {category && (
          <div className="flex gap-2">
            <Link
              href={`/category/${category.slug}`}
              className="text-sm bg-muted px-3 py-1 rounded-full hover:bg-muted/80 transition"
            >
              {category.name}
            </Link>
          </div>
        )}
      </header>

      {article.featured_image && (
        <div className="relative w-full h-[400px] mb-8">
          <img
            src={getAssetUrl(article.featured_image, { w: 1200, h: 600, fit: 'cover' })}
            alt={article.headline}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
      )}

      <div className="prose prose-lg max-w-none">
        {article.content ? (
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        ) : (
          <p>No content available.</p>
        )}
      </div>
    </article>
  );
}

export const revalidate = 3600;
