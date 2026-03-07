'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderClientProps {
  categories: { slug: string; name: string }[];
}

export function HeaderClient({ categories }: HeaderClientProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop icons + mobile menu trigger */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" aria-label="Search">
          <Search className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile slide‑in menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden" onClick={() => setIsOpen(false)}>
          <div className="fixed right-0 top-0 h-full w-3/4 max-w-sm bg-background p-6 shadow-lg" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-end">
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="mt-8 flex flex-col space-y-4">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="text-lg font-medium hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
