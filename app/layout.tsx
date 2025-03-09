/**************************************************
 * Head
 **************************************************/
import type { Metadata } from 'next';

const hayaTechBlog = 'HayaTech-Blog (はやてくぶろぐ)';

export const metadata: Metadata = {
  title: hayaTechBlog,
  description:
    'HayaTech-Blogでは、エンジニアのための情報共有コミュニティであるZENNに投稿している記事を取得して、エンジニア向けのブログとして公開しています。',
  keywords:
    'Next.js, React, TypeScript, JavaScript, Python, PHP, SQL, HTML, CSS, Web Development, Engineer, Blog, Idea, Tech',
  authors: [{ name: 'Hayate', url: 'https://hayatech-blog.vercel.app' }],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/images/HayaTech.png',
    apple: '/images/HayaTech.png',
    other: [
      {
        rel: 'android-chrome',
        url: '/images/HayaTech.png',
      },
    ],
  },
  metadataBase: new URL('https://hayatech-blog.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: hayaTechBlog,
    description:
      'HayaTech-Blogでは、エンジニアのための情報共有コミュニティであるZENNに投稿している記事を取得して、エンジニア向けのブログとして公開しています。',
    url: 'https://hayatech-blog.vercel.app',
    siteName: hayaTechBlog,
    images: [
      {
        url: 'https://hayatech-blog.vercel.app/images/HayaTech.png',
        width: 1200,
        height: 630,
        alt: hayaTechBlog,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: hayaTechBlog,
    images: ['https://hayatech-blog.vercel.app/images/HayaTech.png'],
  },
};

/**************************************************
 * Layout
 **************************************************/
import GoogleAnalytics from '@/components/common/layout/googleAnalytics';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import '@/styles/prism-custom.css';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ja">
      <head />
      <body>
        {children}
        <GoogleAnalytics />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
