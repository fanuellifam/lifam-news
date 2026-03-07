import { Article } from '@/lib/directus/queries';
import Link from 'next/link';
import DirectusImage from '@/components/ui/DirectusImage';
import { format } from 'date-fns';

interface HeroSectionProps {
  featured: Article[];
}

export default function HeroSection({ featured }: HeroSectionProps) {
  if (!featured.length) return null;
  const [primary, ...secondaries] = featured.slice(0, 3);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Lead story with overlay */}
      <div className="lg:col-span-2 relative group rounded-lg overflow-hidden">
        <Link href={`/article/${primary.slug}`}>
          <div className="aspect-video relative">
            {primary.featured_image && (
              <DirectusImage
                src={primary.featured_image}
                alt={primary.headline}
                width={800}
                height={450}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h2 className="text-2xl md:text-4xl font-bold mb-2">{primary.headline}</h2>
              <p className="text-sm md:text-base opacity-90 line-clamp-2">{primary.summary}</p>
              <time className="text-xs opacity-75 mt-2 block">
                {format(new Date(primary.publish_date), 'MMMM d, yyyy')}
              </time>
            </div>
          </div>
        </Link>
      </div>

      {/* Secondary stories as cards */}
      <div className="space-y-6">
        {secondaries.map((article) => (
          <Link key={article.id} href={`/article/${article.slug}`} className="block group">
            <div className="flex gap-4 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm hover:shadow-md transition">
              {article.featured_image && (
                <DirectusImage
                  src={article.featured_image}
                  alt=""
                  width={100}
                  height={100}
                  className="w-24 h-24 object-cover rounded"
                />
              )}
              <div>
                <h3 className="font-semibold group-hover:text-primary transition dark:text-white">
                  {article.headline}
                </h3>
                <time className="text-xs text-muted-foreground dark:text-gray-400">
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
