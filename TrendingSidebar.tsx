import { getMostRead } from '@/lib/directus/queries';
import Link from 'next/link';

export default async function TrendingSidebar() {
  const trending = await getMostRead(5);

  return (
    <aside className="bg-gray-50 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Most Read</h2>
      <ol className="list-decimal list-inside space-y-3">
        {trending.map((article) => (
          <li key={article.id}>
            <Link href={`/article/${article.slug}`} className="hover:text-blue-600">
              {article.headline}
            </Link>
          </li>
        ))}
      </ol>
    </aside>
  );
}
