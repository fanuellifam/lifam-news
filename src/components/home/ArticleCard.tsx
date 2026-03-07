import { Article } from '@/lib/directus/queries';
import Link from 'next/link';
import DirectusImage from '@/components/ui/DirectusImage';
import { format } from 'date-fns';

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/article/${article.slug}`} className="group block">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-xl">
        {article.featured_image && (
          <DirectusImage
            src={article.featured_image}
            alt=""
            width={400}
            height={250}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-4">
          <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition dark:text-white">
            {article.headline}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1 dark:text-gray-400">
            {article.summary}
          </p>
          <time className="text-xs text-muted-foreground mt-2 block dark:text-gray-400">
            {format(new Date(article.publish_date), 'MMM d, yyyy')}
          </time>
        </div>
      </div>
    </Link>
  );
}
