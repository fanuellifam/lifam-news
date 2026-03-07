import Link from 'next/link';
import { getAllCategories } from '@/lib/directus/queries';
import { HeaderClient } from './HeaderClient';

export async function Header() {
  const categories = await getAllCategories();

  // Split categories into visible (first 5) and the rest for a dropdown
  const visibleCategories = categories.slice(0, 5);
  const moreCategories = categories.slice(5);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">Lifam News</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {visibleCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="text-sm font-medium hover:text-primary transition"
            >
              {cat.name}
            </Link>
          ))}

          {moreCategories.length > 0 && (
            <div className="relative group">
              <button className="text-sm font-medium hover:text-primary transition flex items-center gap-1">
                More <span className="text-xs">▼</span>
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md bg-background border shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  {moreCategories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      className="block px-4 py-2 text-sm hover:bg-muted"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Right side actions (search + mobile menu) */}
        <HeaderClient categories={categories} />
      </div>
    </header>
  );
}
