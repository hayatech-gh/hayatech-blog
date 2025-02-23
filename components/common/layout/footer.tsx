import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer>
      <div className="text-center text-gray-900">
        <nav className="mb-2">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 p-2 text-gray-700 transition-all duration-300 hover:bg-slate-100 hover:text-blue-600"
          >
            {/* <FaHome className="text-lg" /> */}
            <Image
              src="/images/HayaTech_logo.png"
              alt="HayaTech_logo"
              width={128}
              height={128}
              className="h-6 w-6 mix-blend-difference"
            />
            <span className="font-medium">Home</span>
          </Link>
        </nav>
        <div>
          <small className="text-sm text-gray-500">©️2025 HayaTech-Blog</small>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
