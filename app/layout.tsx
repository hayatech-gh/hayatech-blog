/**************************************************
 * Head
 **************************************************/
import type { Metadata } from 'next';

const hayaTechBlog = 'HayaTech-Blog';

export const metadata: Metadata = {
  title: hayaTechBlog,
  description:
    'HayaTech-Blogでは、エンジニアのための情報共有コミュニティであるZENNに投稿している記事を取得して、エンジニア向けのブログとして公開しています。',
  verification: { google: 'cNMPZcujlVSd4RRmrb1ARAxCMpTVxc7-DepsQRTKztY' },
  keywords:
    'Next.js, React, TypeScript, JavaScript, Python, PHP, SQL, HTML, CSS, Web Development, Engineer, Blog, Idea, Tech',
  authors: [{ name: 'Hayate', url: 'https://hayatech-blog.vercel.app' }],
  icons: {
    icon: [
      { rel: 'icon', url: '/favicon.ico' },
      { rel: 'apple-touch-icon', url: '/images/HayaTech.png' },
      { rel: 'android-chrome', url: '/images/HayaTech.png' },
    ],
    apple: [
      {
        rel: 'apple-touch-icon',
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
        url: `https://og-image.vercel.app/${encodeURI(
          hayaTechBlog,
        )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`,
        alt: 'HayaTech-Blog',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: hayaTechBlog,
  },
};

/**************************************************
 * Layout
 **************************************************/
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import '@/styles/md-html.css';

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
