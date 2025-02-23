import Footer from './footer';
import About from './about';
import { blog } from '@/contents/blog';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="mx-auto grid grid-cols-1 gap-2 bg-white p-2 xl:grid-cols-4">
        <main className="col-span-1 rounded-xl bg-slate-100 xl:col-span-3">
          <Link href="/">
            <div className="mx-auto mb-10 max-w-lg">
              <h1 className="border-b-4 border-slate-300 pb-4 text-center text-2xl font-bold tracking-widest sm:text-3xl md:text-4xl">
                {blog.title}
              </h1>
              <p className="mt-4 text-center font-semibold md:text-lg">
                {blog.titleSub}
              </p>
            </div>
          </Link>
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
