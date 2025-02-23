import { FaXTwitter } from 'react-icons/fa6';
import { FaFacebookSquare } from 'react-icons/fa';
import { FaLine } from 'react-icons/fa';
import MailShare from '../blogs/mailShare';

const websiteName = 'HayaTech-Blog';
const websiteUrl = 'https://hayatech-blog.vercel.app/';

interface SocialProps {
  title: string;
  id: string;
  topics: string[];
}

const Social = ({ title, id, topics }: SocialProps) => {
  return (
    <>
      <div className="flex max-w-sm flex-wrap justify-between">
        {/* X（旧ツイッター）で共有 */}
        <button className="mb-1 mr-1 flex h-12 w-12 items-center justify-center rounded-lg bg-white p-3 shadow-lg transition duration-300 hover:bg-slate-100 sm:mb-0 md:h-14 md:w-14">
          <a
            href={`https://x.com/share?text=${encodeURIComponent(`${websiteName} ${title}`)}&hashtags=${topics}&url=${websiteUrl}blogs/${id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaXTwitter size={25} />
          </a>
        </button>
        {/* Facebookで共有 */}
        <button className="mb-1 mr-1 flex h-12 w-12 items-center justify-center rounded-lg bg-white p-3 shadow-lg transition duration-300 hover:bg-slate-100 sm:mb-0 md:h-14 md:w-14">
          <a
            href={`http://www.facebook.com/share.php?u=${websiteUrl}blogs/${id}`}
          >
            <FaFacebookSquare size={25} />
          </a>
        </button>
        {/* Lineで共有 */}
        <button className="mb-1 mr-1 flex h-12 w-12 items-center justify-center rounded-lg bg-white p-3 shadow-lg transition duration-300 hover:bg-slate-100 sm:mb-0 md:h-14 md:w-14">
          <a
            href={`https://social-plugins.line.me/lineit/share?url=${websiteUrl}blogs/${id}`}
            target="_blank"
          >
            <FaLine size={25} />
          </a>
        </button>
        {/* メールで共有 */}
        <MailShare
          title={title}
          id={id}
          websiteName={websiteName}
          websiteUrl={websiteUrl}
        />
      </div>
    </>
  );
};

export default Social;
