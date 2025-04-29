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
      <div className="mx-auto bg-slate-100">
        <div className="mx-auto grid grid-cols-1 gap-2 p-2 xl:grid-cols-4">
          <div className="col-span-1 rounded-xl bg-slate-100 xl:col-span-3">
            <header className="mx-auto my-10 max-w-lg">
              <Link href="/">
                <div className="group flex items-center justify-center gap-2">
                  <div>
                    <Image
                      src="/images/HayaTech_logo.png"
                      alt="HayaTech-Blog"
                      width={128}
                      height={128}
                      className="h-10 w-10 transition-all duration-300 group-hover:opacity-50 group-hover:mix-blend-difference"
                    />
                  </div>
                  <div>
                    <h1 className="text-2xl tracking-widest transition-all duration-300 group-hover:opacity-50 sm:text-3xl md:text-4xl">
                      {blog.title}
                    </h1>
                  </div>
                </div>
              </Link>

              <div className="w-full rounded-lg border-t-4 border-slate-300"></div>

              <p className="mt-4 text-center font-semibold md:text-lg">
                {blog.titleSub}
              </p>
            </header>

            <main>{children}</main>
          </div>
          <aside className="xl:col-span-1">
            <About />
          </aside>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
