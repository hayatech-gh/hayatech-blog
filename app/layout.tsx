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
    icon: './favicon.ico',
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
        url: 'https://og-image.vercel.app/images/HayaTech.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg',
        alt: hayaTechBlog,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: hayaTechBlog,
    images: [
      'https://og-image.vercel.app/images/HayaTech.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg',
    ],
  },
};

/**************************************************
 * Layout
 **************************************************/
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
