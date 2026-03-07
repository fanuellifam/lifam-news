import { getBreakingNews } from '@/lib/directus/queries';
import Link from 'next/link';

export default async function BreakingBar() {
  const breaking = await getBreakingNews();
  if (!breaking.length) return null;

  return (
    <div className="bg-red-600 text-white py-2 overflow-hidden">
      <div className="container mx-auto px-4 flex items-center">
        <span className="font-bold uppercase mr-4 bg-white text-red-600 px-2 py-1 text-sm rounded">
          BREAKING
        </span>
        <div className="flex-1 whitespace-nowrap overflow-x-auto scrollbar-hide">
          <div className="inline-flex space-x-8 animate-marquee">
            {breaking.map((item) => (
              <Link key={item.id} href={`/article/${item.slug}`} className="hover:underline">
                {item.headline}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
