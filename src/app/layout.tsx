import type { Metadata, Viewport } from 'next';
import { Inter, Merriweather } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Header } from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import BackToTop from '@/components/ui/BackToTop';
import './globals.css';

// -----------------------------------------------------------------------------
// Fonts
// -----------------------------------------------------------------------------
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const merriweather = Merriweather({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-merriweather',
  display: 'swap',
});

// -----------------------------------------------------------------------------
// Viewport (for responsive design)
// -----------------------------------------------------------------------------
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' },
  ],
};

// -----------------------------------------------------------------------------
// Metadata (SEO, Open Graph, Icons)
// -----------------------------------------------------------------------------
export const metadata: Metadata = {
  metadataBase: new URL('https://lifamin.site'),
  title: {
    default: 'Lifam News - Trusted, Independent, Global',
    template: '%s | Lifam News',
  },
  description: 'Breaking news, investigations, and analysis from Africa and the world.',
  keywords: ['news', 'africa', 'investigations', 'politics', 'technology'],
  authors: [{ name: 'Lifam Inc' }],
  creator: 'Lifam Inc',
  publisher: 'Lifam News',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Lifam News',
    description: 'Breaking news, investigations, and analysis from Africa and the world.',
    url: 'https://lifamin.site',
    siteName: 'Lifam News',
    images: [
      {
        url: '/og-image.jpg', // replace with your actual OG image
        width: 1200,
        height: 630,
        alt: 'Lifam News',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lifam News',
    description: 'Breaking news, investigations, and analysis from Africa and the world.',
    images: ['/og-image.jpg'], // replace
    site: '@lifamnews', // replace with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#b91c1c',
      },
    ],
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://lifamin.site',
    types: {
      'application/rss+xml': 'https://lifamin.site/feed.xml',
    },
  },
};

// -----------------------------------------------------------------------------
// Root Layout
// -----------------------------------------------------------------------------
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${merriweather.variable} font-sans antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded z-50"
        >
          Skip to content
        </a>

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
            <BackToTop />
          </div>
        </ThemeProvider>

        {/* Optional: Analytics – uncomment and add your IDs when ready */}
        {/* <Analytics /> */}
        {/* {process.env.NODE_ENV === 'production' && (
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
          />
        )} */}
      </body>
    </html>
  );
}
