import { getMdsData, getSortedMdsData } from '@/lib/mdData';
import { isNew } from '@/lib/utility/isNew';
import Layout from '@/components/common/layout/layout';
import Date from '@/components/common/date';
import Topics from '@/components/home/topics';
import LikesCounter from '@/components/home/likesCounter';
import Link from 'next/link';
import CategoryIcon from '@mui/icons-material/Category';
import TagIcon from '@mui/icons-material/Tag';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

const pageLimit = 10;

interface HomeProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function Home({ searchParams }: HomeProps) {
  const allMdsData = await getMdsData();
  const sortedMdData = await getSortedMdsData(allMdsData);

  /*
  *ページネーション
  page が存在すれば parseInt() で整数に変換（10進数指定）
  存在しなければ、デフォルト値として 1 を設定（最初のページ）
  totalBlogsで総記事数を取得
  totalPagesで総ページ数を計算 ex) 25articles => 25/10 = 2page
  paginatedBlogsで表示する記事を抽出 
  ex) currentPage=2 => start=(2-1)*10=10, end=2*10=20 => extract 10~19articles
  slice(start, end) を使用して、現在のページに対応する記事を抽出
  (currentPage - 1) * pageLimit で開始インデックスを算出
  currentPage * pageLimit で終了インデックスを算出
  */
  const params = new URLSearchParams(
    searchParams ? searchParams.toString() : '',
  );
  const pageParam = params.get('page');
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
  const totalBlogs = sortedMdData.length;
  const totalPages = Math.ceil(totalBlogs / pageLimit);
  const paginatedBlogs = sortedMdData.slice(
    (currentPage - 1) * pageLimit,
    currentPage * pageLimit,
  );

  return (
    <Layout>
      <article className="mx-auto p-4">
        {/* 記事一覧 */}
        <ul className="mx-auto grid gap-4 sm:grid-cols-1 md:grid-cols-2">
          {paginatedBlogs.map(({ id, title, emoji, date, topics, type }) => (
            <li
              key={id}
              className="group flex h-80 items-center justify-center overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:bg-slate-100"
            >
              <Link
                href={`/blogs/${id}`}
                className="flex h-full w-full flex-col"
              >
                <div
                  className={`${
                    type === 'idea'
                      ? 'bg-idea hover:bg-idea-light'
                      : 'bg-tech hover:bg-tech-light'
                  } relative flex h-32 items-center justify-center border-2 border-solid border-slate-300 transition-colors duration-300`}
                >
                  {isNew(date) && (
                    <span className="absolute left-0 top-0 rounded bg-red-600 px-2 py-1 text-sm text-white">
                      New !
                    </span>
                  )}
                  <span className="absolute bottom-0 right-0 flex items-center rounded px-2 py-1 text-white mix-blend-difference">
                    <ThumbUpAltIcon />
                    <LikesCounter blogId={id} />
                  </span>
                  <div className="text-8xl transition-transform duration-300 hover:scale-110 hover:transform">
                    {emoji}
                  </div>
                </div>
                <div className="bg-white transition-colors duration-300 group-hover:bg-slate-100">
                  <div className="p-2 transition-colors duration-300 group-hover:text-blue-600">
                    <h2 className="truncate-title">{title}</h2>
                  </div>
                  <ul className="mt-auto border border-b-0 border-l-0 border-r-0 border-slate-300 p-2">
                    <li className="my-2 flex items-center space-x-2">
                      <span>
                        <CategoryIcon />
                      </span>
                      <span>{type}</span>
                    </li>
                    <li className="my-2 flex items-center space-x-2">
                      <span>
                        <TagIcon />
                      </span>
                      <Topics topicList={topics} />
                    </li>
                    <li className="my-2 flex items-center space-x-2">
                      <span>
                        <HistoryEduIcon />
                      </span>
                      <span>
                        <Date dateString={date} />
                      </span>
                    </li>
                  </ul>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* ページネーション */}
        <div className="mt-8 flex justify-center space-x-4">
          {currentPage > 1 && (
            <Link
              href={`/?page=${currentPage - 1}`}
              className="rounded bg-white px-4 py-2 transition-colors duration-300 hover:bg-slate-200"
            >
              前へ
            </Link>
          )}
          <span className="rounded bg-white px-4 py-2 shadow-sm">
            {currentPage} / {totalPages}
          </span>
          {currentPage < totalPages && (
            <Link
              href={`/?page=${currentPage + 1}`}
              className="rounded bg-white px-4 py-2 shadow-sm transition-colors duration-300 hover:bg-slate-200"
            >
              次へ
            </Link>
          )}
        </div>
      </article>
    </Layout>
  );
}
