import Link from 'next/link';
import { Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">Lifam News</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          <Link href="/category/world" className="text-sm font-medium hover:text-primary">World</Link>
          <Link href="/category/politics" className="text-sm font-medium hover:text-primary">Politics</Link>
          <Link href="/business" className="text-sm font-medium hover:text-primary">Business</Link>
          <Link href="/category/technology" className="text-sm font-medium hover:text-primary">Tech</Link>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
