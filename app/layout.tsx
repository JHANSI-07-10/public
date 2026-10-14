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
  title: 'VPD Technologies Private Limited | Transforming Ideas into Intelligent Digital Solutions',
  description:
    'VPD Technologies Private Limited builds software products, enterprise applications, and digital solutions that help organizations modernize operations and support business growth from Kurnool, Andhra Pradesh.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'VPD Technologies Private Limited | Transforming Ideas into Intelligent Digital Solutions',
    description:
      'VPD Technologies Private Limited builds software products, enterprise applications, and digital solutions that help organizations modernize operations and support business growth.',
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
    <html lang="en" className={`dark ${inter.variable} ${jetBrainsMono.variable}`} suppressHydrationWarning>
      <body
        className="bg-[#0a0a0a] text-white selection:bg-[#c9a84c]/20 selection:text-[#c9a84c] antialiased min-h-screen"
        style={{ backgroundColor: '#0a0a0a', color: '#ffffff' }}
        suppressHydrationWarning
      >
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
