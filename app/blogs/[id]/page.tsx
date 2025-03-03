// app/blogs/[id]/page.tsx
import Layout from '@/components/common/layout/layout';
import { getMdsData, getHtmlContent, getMdData } from '@/lib/mdData';
import Date from '@/components/common/date';
import Social from '@/components/blogs/social';
import Topics from '@/components/home/topics';
import CategoryIcon from '@mui/icons-material/Category';
import TagIcon from '@mui/icons-material/Tag';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import Like from '@/components/blogs/like';
import Comment from '@/components/blogs/comment';
import Board from '@/components/blogs/board';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type BlogProps = {
  params: Promise<{ id: string }>;
};

export default async function Blog({ params }: BlogProps) {
  const { id } = await params;
  const allBlogsData = await getMdsData();

  let blogData;
  try {
    blogData = getMdData(allBlogsData, id);
  } catch (error) {
    console.error(error);
    return notFound();
  }

  const convertedBlogData = await getHtmlContent(blogData);

  return (
    <Layout>
      <article className="mx-auto p-4">
        {/* ブログヘッダー */}
        <div
          className={`${
            convertedBlogData.type === 'idea' ? 'bg-idea' : 'bg-tech'
          } flex h-32 items-center justify-center rounded-lg border-2 border-solid border-slate-300`}
        >
          <div className="text-8xl">{convertedBlogData.emoji}</div>
        </div>
        <ul className="flex flex-wrap justify-start space-x-0 p-2 sm:space-x-4">
          <li className="flex items-center space-x-2">
            <span>
              <CategoryIcon />
            </span>
            <span>{convertedBlogData.type}</span>
          </li>
          <li className="flex items-center space-x-2">
            <span>
              <TagIcon />
            </span>
            <Topics topicList={convertedBlogData.topics} />
          </li>
          <li className="flex items-center space-x-2">
            <span>
              <HistoryEduIcon />
            </span>
            <span>
              <Date dateString={convertedBlogData.date} />
            </span>
          </li>
        </ul>

        {/* マークダウン形式の記事をHTMLに変換して表示 */}
        <div className="md-html">
          <div
            dangerouslySetInnerHTML={{ __html: convertedBlogData.content }}
          />
        </div>

        {/* 共有・お気に入り */}
        <div className="flex justify-between p-4">
          <Social
            title={convertedBlogData.title}
            id={convertedBlogData.id}
            topics={convertedBlogData.topics}
          />
          <Like blogId={id} />
        </div>

        {/* コメント投稿・掲示板 */}
        <div className="container mx-auto rounded-lg bg-white p-6 shadow-lg">
          <Comment blogId={id} />
          <Board blogId={id} />
        </div>
      </article>
    </Layout>
  );
}

//ページのメタデータを動的に生成(headの設定)
export async function generateMetadata({
  params,
}: BlogProps): Promise<Metadata> {
  const { id } = await params;
  const allBlogsData = await getMdsData();
  const blogData = getMdData(allBlogsData, id);
  if (!blogData) {
    throw new Error(`Blog not found for id: ${id}`);
  }
  const convertedBlogData = await getHtmlContent(blogData);

  const hayaTechBlog = 'HayaTech-Blog(はやてくぶろぐ)';

  return {
    title: `${convertedBlogData.title} ${hayaTechBlog}`,
    robots: 'noindex',
  };
}

/*
SSGでビルド時に事前レンダリング
*/
export const generateStaticParams = async (): Promise<
  Array<{ params: { id: string } }>
> => {
  const allBlogsData = await getMdsData();
  return allBlogsData.map((blog) => ({
    params: { id: blog.id },
  }));
};
