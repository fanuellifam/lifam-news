import { getFeaturedArticles, getLatestArticles } from '@/lib/directus/queries';
import { getAssetUrl } from '@/lib/directus/client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

export default async function Home() {
  const featured = await getFeaturedArticles();
  const latest = await getLatestArticles(6);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-serif font-bold mb-4">Welcome to Lifam News</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Trusted, independent, global. Delivering the stories that matter.
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <Button size="lg">Read Latest News</Button>
          <Button size="lg" variant="outline">Watch Live</Button>
        </div>
      </section>

      {/* Featured Articles */}
      {featured.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Featured Stories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featured.map((article) => (
              <article key={article.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition">
                {article.hero_image && (
                  <img
                    src={getAssetUrl(article.hero_image, { w: 400, h: 250, fit: 'cover' })}
                    alt={article.headline}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">
                    <Link href={`/article/${article.slug}`}>{article.headline}</Link>
                  </h3>
                  <p className="text-muted-foreground text-sm mb-2">{article.excerpt}</p>
                  <time className="text-xs text-muted-foreground">
                    {format(new Date(article.published_at), 'MMMM d, yyyy')}
                  </time>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Latest Articles */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Latest News</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {latest.map((article) => (
            <article key={article.id} className="border rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">
                <Link href={`/article/${article.slug}`}>{article.headline}</Link>
              </h3>
              <p className="text-muted-foreground mb-2">{article.excerpt}</p>
              <time className="text-xs text-muted-foreground">
                {format(new Date(article.published_at), 'MMMM d, yyyy')}
              </time>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
