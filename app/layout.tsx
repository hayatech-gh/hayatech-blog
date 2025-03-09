/**************************************************
 * Head
 **************************************************/
import type { Metadata } from 'next';

const hayaTechBlog = 'HayaTech-Blog';

export const metadata: Metadata = {
  title: 'HayaTech-Blog(はやてくぶろぐ)',
  description:
    'HayaTech-Blogでは、エンジニアのための情報共有コミュニティであるに投稿している記事を取得して、エンジニア向けのブログとして公開しています。',
  keywords:
    'Next.js, React, TypeScript, JavaScript, Python, HTML, CSS, Web Development, Engineer, Blog, Idea, Tech',
  authors: [{ name: 'Hayate', url: 'https://hayatech-blog.vercel.app/' }],
  icons: {
    icon: './favicon.ico',
  },
  openGraph: {
    title: 'HayaTech-Blog(はやてくぶろぐ)',
    description:
      'HayaTech-Blogでは、エンジニアのための情報共有コミュニティであるに投稿している記事を取得して、エンジニア向けのブログとして公開しています。',
    url: 'https://hayatech-blog.vercel.app',
    siteName: 'HayaTech-Blog(はやてくぶろぐ)',
    images: [
      {
        url: `https://og-image.vercel.app/${encodeURI(
          hayaTechBlog,
        )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`,
        alt: 'HayaTech-Blog(はやてくぶろぐ)',
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
