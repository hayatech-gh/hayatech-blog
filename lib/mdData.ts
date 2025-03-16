import { ArticleResponse } from '../types/response';
import { Article } from '../types/article';
import { fetchGithubMakeArticle } from './utility/getArticle';
import { fetchGithubRepo } from './utility/getArticle';

export async function getMdsData(): Promise<Article[]> {
  const zennArticles: ArticleResponse[] = await fetchGithubRepo(
    'https://api.github.com/repos/hayatech-gh/zenn-content/contents/articles',
  );

  if (!zennArticles || !Array.isArray(zennArticles)) {
    console.error('Failed to fetch Zenn articles. Response:', zennArticles);
    return []; // 空配列を返す
  }

  const datas = await Promise.all(
    zennArticles.map(async (article: ArticleResponse) => {
      try {
        return await fetchGithubMakeArticle(
          'https://api.github.com/repos/hayatech-gh/zenn-content/contents/articles/',
          article.name,
        );
      } catch (error) {
        console.error(
          `Failed to fetch article: ${article.name}, error:`,
          error,
        );
        return null;
      }
    }),
  );

  // null や undefined を除外
  return datas.filter(Boolean) as Article[];
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
export function getMdData(articles: Article[], id: string): Article {
  const foundArticle = articles.find((article) => article.id === id);
  if (!foundArticle) {
    throw new Error(`Article with ID ${id} not found`);
  }
  return foundArticle;
}

/*
[Remarkプラグイン]
remarkParse：Markdownをmdast（Markdown 抽象構文木）に変換
remarkMath：数式記法（LaTeX）を解析
remarkDirective：::: を使ったカスタムディレクティブを解析
remarkGfm：GitHub Flavored Markdownの拡張を有効化
remarkRehype：mdast（Markdown 抽象構文木）をhast（HTML 抽象構文木）に変換
rehypeRaw：Markdown 内のrawHTMLを安全に処理
rehypeKatex：remarkMathで処理された数式をKaTeXを使ってレンダリング
rehypeHighlight：コードブロックのシンタックスハイライトを適用
rehypeStringify：hast（HTML 抽象構文木）を HTML の文字列に変換
*/

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMath from 'remark-math';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import type { Plugin } from 'unified';
import { Node } from 'unist';
import { visit } from 'unist-util-visit';

export async function getHtmlContent(article: Article) {
  const unifiedContent = await unified()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkDirective)
    .use(customDirectives)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeKatex)
    .use(rehypeHighlight)
    .use(rehypeStringify as unknown as Plugin)
    .process(transformZennMd(article.content));

  const contentHtml = unifiedContent.toString();
  return {
    ...article,
    content: contentHtml,
  };
}

interface ContainerDirectiveNode extends Node {
  type: 'containerDirective';
  name: string;
}

interface Data {
  hName?: string;
  hProperties?: Record<string, unknown>;
}

// カスタムブロック（:::message など）を変換
function customDirectives() {
  return (tree: Node) => {
    visit(tree, (node) => {
      if (node.type === 'containerDirective') {
        const containerNode = node as ContainerDirectiveNode;
        const tagName = containerNode.name === 'message' ? 'div' : 'section';

        // node.dataの型をDataにキャスト
        const data = (node.data as Data) || (node.data = {} as Data);
        data.hName = tagName;
        data.hProperties = { className: `md-${containerNode.name}` };
      }
    });
  };
}

// Zenn Markdown の独自記法を変換
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
