import { getFeaturedArticles } from '@/lib/directus/queries';
import HeroSection from '@/components/home/HeroSection';
import TopStories from '@/components/home/TopStories';
import BreakingBar from '@/components/home/BreakingBar';
import CategorySection from '@/components/home/CategorySection';
import TrendingSidebar from '@/components/home/TrendingSidebar';

export default async function Home() {
  const featured = await getFeaturedArticles(); // up to 5 featured

  return (
    <>
      {/* Breaking News Ticker */}
      <BreakingBar />

      <div className="container mx-auto px-4 py-6">
        {/* Hero + Top Stories Grid */}
        <HeroSection featured={featured} />

        {/* Main content: 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Left column (wider) */}
          <div className="lg:col-span-2">
            <CategorySection slug="world" title="World" />
            <CategorySection slug="politics" title="Politics" />
            <CategorySection slug="technology" title="Technology" />
            <CategorySection slug="africa" title="Africa" />
            <CategorySection slug="investigations" title="Investigations" />
          </div>

          {/* Right column (sidebar) */}
          <div className="lg:col-span-1">
            <TrendingSidebar />
          </div>
        </div>
      </div>
    </>
  );
}
