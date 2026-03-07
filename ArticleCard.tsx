import { Article } from '@/lib/directus/queries';
import Link from 'next/link';
import { getAssetUrl } from '@/lib/directus/client';
import { format } from 'date-fns';

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <div className="group">
      <Link href={`/article/${article.slug}`}>
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
    </div>
  );
}
