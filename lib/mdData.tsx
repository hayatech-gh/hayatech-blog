import { ArticleResponse } from '../types/response';
import { Article } from '../types/article';
import { fetchGithubMakeArticle } from './utility/getArticle';
import { fetchGithubRepo } from './utility/getArticle';

export async function getMdsData() {
  // GitHub APIを使用して記事一覧を取得
  const zennArticles: ArticleResponse[] = await fetchGithubRepo(
    'https://api.github.com/repos/hayatech-gh/zenn-content/contents/articles',
  );

  // API呼び出しが失敗した場合またはzennArticlesが配列型でない場合のエラー処理
  if (!zennArticles || !Array.isArray(zennArticles)) {
    console.error('Failed to fetch Zenn articles. Response:', zennArticles);
    return []; // 空配列を返して配列操作（mapやfilter）でのエラー防止
  }

  // 各記事の詳細データを取得
  const datas = await Promise.all(
    zennArticles.map(async (article: ArticleResponse) => {
      try {
        return await fetchGithubMakeArticle(
          'https://api.github.com/repos/hayatech-gh/zenn-content/contents/articles/',
          article.name,
        );
      } catch (error) {
        console.error(`Failed to fetch article: ${article.name}`, error);
        return null; // 失敗時に null を返す
      }
    }),
  );

  // 無効なデータを除外し、有効なデータのみ返す
  const validDatas = (datas || []).filter(Boolean);
  return validDatas;
}

//渡された記事データを日付順に並び替え
export async function getSortedMdsData(articles: Article[]) {
  //a.dateとb.dateを比較し、新しい日付の記事が先頭に来るようにソートして返す
  return articles.sort((a, b) => {
    if (a.date === b.date) {
      return 0;
    }
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

//全ての記事IDを取得し、Next.jsのgetStaticPathsで利用できる形式に変換
export function getAllMdIds(articles: Article[]) {
  //記事データから各記事のidを抽出し、{ params: { id } }形式の配列を返す
  return articles.map((article: Article) => {
    return {
      params: {
        id: article.id,
      },
    };
  });
}

//指定された記事IDに対応する記事データを取得
export function getMdData(articles: Article[], id: string) {
  //記事データからidが一致する記事をフィルタリングして返す
  return articles.filter((article: Article) => {
    if (article.id === id) {
      return article;
    }
  });
}

/*
[Remarkプラグイン]
remark-math: 数式を解析
remark-html-katex: 数式をHTML形式に変換
remark-prism: シンタックスハイライトを適用
remark-gfm: GitHub Flavored Markdownの拡張を有効化
remark-html: HTML文字列に変換
*/

import { remark } from 'remark';
import remarkHtml from 'remark-html';
import htmlKatex from 'remark-html-katex';
import gfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import rehypeHighlight from 'rehype-highlight';
import math from 'remark-math';
import { Node } from 'unist';
import { visit } from 'unist-util-visit';

export async function getHtmlContent(article: Article) {
  const processedContent = await remark()
    .use(math)
    .use(htmlKatex)
    .use(remarkDirective)
    .use(customDirectives) // カスタムブロックをHTMLに変換する処理
    .use(gfm)
    .use(remarkHtml, { sanitize: false })
    .use(rehypeHighlight)
    .process(transformZennMd(article.content));

  const contentHtml = processedContent.toString();
  return {
    ...article,
    content: contentHtml,
  };
}

// カスタムブロック（:::message など）を変換する関数
function customDirectives() {
  return (tree: Node) => {
    visit(tree, (node) => {
      if (node.type === 'containerDirective') {
        const data = node.data || (node.data = {});
        const tagName = node.name === 'message' ? 'div' : 'section';

        data.hName = tagName;
        data.hProperties = { className: `md-${node.name}` };
      }
    });
  };
}

// Zenn Markdown の独自記法を変換する
function transformZennMd(markdown: string): string {
  return markdown
    .replace(
      /!\[(.*?)\]\((.*?) =(\d+)x\)/g,
      (_, alt, imgUrl, width) =>
        `<a href="${imgUrl}" target="_blank" rel="noopener noreferrer"><img src="${imgUrl}" alt="${alt}" width="${width}" /></a>`,
    )
    .replace(
      /\[(.*?)\]\((.*?)\)/g,
      (_, text, linkUrl) =>
        `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${text}</a>`,
    );
}
