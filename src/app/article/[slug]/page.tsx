import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { ChevronRight } from 'lucide-react';

import { getArticleBySlug, getAuthorById, getCategoryById } from '@/lib/directus/queries';
import { getAssetUrl } from '@/lib/directus/client';
import ViewCounter from './ViewCounter';
import ShareButtons from './ShareButtons';
import DirectusImage from '@/components/ui/DirectusImage';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  const imageUrl = article.featured_image
    ? getAssetUrl(article.featured_image, { w: 1200 })
    : 'https://lifamin.site/default-og-image.jpg';

  return {
    title: article.headline,
    description: article.summary || 'Read the full article on Lifam News.',
    openGraph: {
      title: article.headline,
      description: article.summary || '',
      images: [{ url: imageUrl }],
      type: 'article',
      publishedTime: article.publish_date,
      authors: article.author ? [await getAuthorById(article.author).then(a => a?.name || '')] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.headline,
      description: article.summary || '',
      images: [imageUrl],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const author = article.author ? await getAuthorById(article.author) : null;
  const category = article.category ? await getCategoryById(article.category) : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.headline,
    description: article.summary,
    image: article.featured_image ? [getAssetUrl(article.featured_image, { w: 1200 })] : undefined,
    datePublished: article.publish_date,
    dateModified: article.date_updated || article.publish_date,
    author: author ? {
      '@type': 'Person',
      name: author.name,
      url: `https://lifamin.site/author/${author.slug}`,
    } : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'Lifam News',
      logo: {
        '@type': 'ImageObject',
        url: 'https://lifamin.site/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://lifamin.site/article/${article.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <ViewCounter articleId={article.id} />

        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-primary transition">Home</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          {category ? (
            <Link href={`/category/${category.slug}`} className="hover:text-primary transition">
              {category.name}
            </Link>
          ) : (
            <span>Article</span>
          )}
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-foreground font-medium truncate">{article.headline}</span>
        </nav>

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
            <DirectusImage
              src={article.featured_image}
              alt={article.headline}
              width={1200}
              height={600}
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

        <ShareButtons url={`/article/${article.slug}`} title={article.headline} />
      </article>
    </>
  );
}

export const revalidate = 3600;
