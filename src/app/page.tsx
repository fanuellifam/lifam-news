import getFeaturedArticles from '@/lib/directus/queries';
import HeroSection from '@/components/home/HeroSection';
import CategorySection from '@/components/home/CategorySection';
import TrendingSidebar from '@/components/home/TrendingSidebar';
import BreakingBar from '@/components/home/BreakingBar';

export default async function Home() {
  const featured = await getFeaturedArticles();

  return (
    <>
      <BreakingBar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroSection featured={featured} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mt-12">
          <div className="lg:col-span-2 space-y-12">
            <CategorySection slug="world" title="World" />
            <CategorySection slug="politics" title="Politics" />
            <CategorySection slug="technology" title="Technology" />
            <CategorySection slug="africa" title="Africa" />
            <CategorySection slug="investigations" title="Investigations" />
          </div>
          <aside className="lg:col-span-1">
            <TrendingSidebar />
          </aside>
        </div>
      </div>
    </>
  );
}
