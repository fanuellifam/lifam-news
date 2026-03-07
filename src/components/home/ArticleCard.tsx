import { Article } from '@/lib/directus/queries';
import Link from 'next/link';
import { getHeroUrl } from '@/lib/directus/queries';

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <div className="group">
      <Link href={`/article/${article.slug}`}>
        {article.hero_image && (
          <img
            src={getHeroUrl(article.hero_image, 300)}
            alt=""
            className="w-full h-40 object-cover rounded group-hover:opacity-90 transition"
          />
        )}
        <h3 className="font-semibold mt-2 group-hover:text-blue-600">{article.headline}</h3>
      </Link>
    </div>
  );
}
