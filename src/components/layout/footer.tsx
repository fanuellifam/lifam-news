import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold mb-4">Sections</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/world">World</Link></li>
              <li><Link href="/africa">Africa</Link></li>
              <li><Link href="/investigations">Investigations</Link></li>
              <li><Link href="/opinion">Opinion</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">Multimedia</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/video">Video</Link></li>
              <li><Link href="/podcasts">Podcasts</Link></li>
              <li><Link href="/live">Live TV</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about">About Lifam</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/advertise">Advertise</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/terms">Terms of Service</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/corrections">Corrections</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Lifam Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
