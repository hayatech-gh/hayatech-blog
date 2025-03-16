import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer>
      <div className="text-center text-gray-900">
        <nav className="m-2 mt-0">
          <Link
            href="/"
            className="group flex items-center justify-center gap-2 rounded-lg p-2 text-gray-700 transition-all duration-300 ease-in-out hover:text-blue-600"
          >
            <Image
              src="/images/HayaTech_logo.png"
              alt="HayaTech-Blog"
              width={128}
              height={128}
              className="h-6 w-6 group-hover:mix-blend-difference"
            />
            <span className="font-medium">HayaTech-Blog</span>
          </Link>
        </nav>
        <div>
          <small className="text-xs text-gray-500">©️2025 HayaTech-Blog</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
