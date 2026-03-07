import { getArticlesByCategorySlug } from '@/lib/directus/queries';
import Link from 'next/link';
import { getAssetUrl } from '@/lib/directus/client';
import { format } from 'date-fns';

interface CategorySectionProps {
  slug: string;
  title: string;
  limit?: number;
}

export default async function CategorySection({ slug, title, limit = 3 }: CategorySectionProps) {
  const articles = await getArticlesByCategorySlug(slug, limit);
  if (!articles.length) return null;

  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-4 border-l-4 border-blue-600 pl-2">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {articles.map((article) => (
          <Link key={article.id} href={`/article/${article.slug}`} className="group">
            {article.featured_image && (
              <img
                src={getAssetUrl(article.featured_image, { w: 300, h: 200, fit: 'cover' })}
                alt=""
                className="w-full h-40 object-cover rounded group-hover:opacity-90 transition"
              />
            )}
            <h3 className="font-semibold mt-2 group-hover:text-blue-600">{article.headline}</h3>
            <time className="text-xs text-gray-500">
              {format(new Date(article.publish_date), 'MMM d, yyyy')}
            </time>
          </Link>
        ))}
      </div>
    </section>
  );
}
