import { Article } from '@/lib/directus/queries';
import Link from 'next/link';
import { getAssetUrl } from '@/lib/directus/client';
import { format } from 'date-fns';

interface HeroSectionProps {
  featured: Article[];
}

export default function HeroSection({ featured }: HeroSectionProps) {
  if (!featured.length) return null;
  const [primary, ...secondaries] = featured.slice(0, 3);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Lead story */}
      <div className="lg:col-span-2 relative group">
        <Link href={`/article/${primary.slug}`}>
          <div className="aspect-video overflow-hidden rounded-lg bg-gray-100">
            {primary.featured_image && (
              <img
                src={getAssetUrl(primary.featured_image, { w: 800, h: 450, fit: 'cover' })}
                alt={primary.headline}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            )}
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold mt-3 group-hover:text-blue-600 transition">
            {primary.headline}
          </h2>
          <p className="text-gray-600 mt-1">{primary.summary}</p>
          <time className="text-sm text-gray-500">
            {format(new Date(primary.publish_date), 'MMM d, yyyy')}
          </time>
        </Link>
      </div>

      {/* Secondary stories */}
      <div className="space-y-6">
        {secondaries.map((article) => (
          <Link key={article.id} href={`/article/${article.slug}`} className="block group">
            <div className="flex gap-4">
              {article.featured_image && (
                <img
                  src={getAssetUrl(article.featured_image, { w: 150, h: 150, fit: 'cover' })}
                  alt=""
                  className="w-24 h-24 object-cover rounded"
                />
              )}
              <div>
                <h3 className="font-semibold group-hover:text-blue-600">{article.headline}</h3>
                <time className="text-sm text-gray-500">
                  {format(new Date(article.publish_date), 'MMM d, yyyy')}
                </time>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
