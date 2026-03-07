import { Article } from '@/lib/directus/queries';
import ArticleCard from './ArticleCard';

interface TopStoriesProps {
  articles: Article[];
}

export default function TopStories({ articles }: TopStoriesProps) {
  const top = articles.slice(1, 4);
  if (!top.length) return null;

  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold mb-4">Top Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {top.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
