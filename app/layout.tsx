import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import '../src/index.css';
import { SiteChrome } from '../src/components/SiteChrome';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'VPD Technologies | Digital Engineering',
  description:
    'VPD Technologies engineers high-performance web ecosystems, scalable SaaS platforms, and enterprise Java solutions for industry leaders.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'VPD Technologies | Digital Engineering',
    description:
      'VPD Technologies engineers high-performance web ecosystems, scalable SaaS platforms, and enterprise Java solutions for industry leaders.',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#c9a84c',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
<<<<<<< Updated upstream
    <html lang="en" className={`dark ${inter.variable} ${jetBrainsMono.variable}`}>
      <body className="bg-[#0a0a0a] text-white selection:bg-[#c9a84c]/20 selection:text-[#c9a84c] antialiased">
=======
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="bg-[#0a0a0a] text-white selection:bg-[#c9a84c]/20 selection:text-[#c9a84c] antialiased"
        suppressHydrationWarning
      >
>>>>>>> Stashed changes
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
