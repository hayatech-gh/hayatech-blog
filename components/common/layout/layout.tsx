import Footer from './footer';
import About from './about';
import { blog } from '@/contents/blog';
import Link from 'next/link';
import Image from 'next/image';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="mx-auto grid grid-cols-1 gap-2 bg-white p-2 xl:grid-cols-4">
        <main className="col-span-1 rounded-xl bg-slate-100 xl:col-span-3">
          <div className="mx-auto mb-10 max-w-lg">
            <Link href="/">
              <div className="flex items-center justify-center gap-2 border-b-4 border-slate-300 transition duration-300 hover:opacity-50">
                <div>
                  <Image
                    src="/images/HayaTech_logo.png"
                    alt="HayaTech-Blog"
                    width={128}
                    height={128}
                    className="h-10 w-10"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-widest sm:text-3xl md:text-4xl">
                    {blog.title}
                  </h1>
                </div>
              </div>
            </Link>
            <p className="mt-4 text-center font-semibold md:text-lg">
              {blog.titleSub}
            </p>
          </div>

          {children}
        </main>
        <aside className="xl:col-span-1">
          <About />
        </aside>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
