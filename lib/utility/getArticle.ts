//Markdownのメタデータを解析
import matter from 'gray-matter';

//指定されたURLからGitHubリポジトリのデータを取得
export async function fetchGithubRepo(url: string) {
  try {
    const res = await fetch(url, {
      headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` },
    });
    if (!res.ok) {
      throw `ステータスコードエラー：${res.status}`;
    } else {
      return res.json();
    }
  } catch (err) {
    console.log(`GitHubリポジトリのデータを取得でエラー：${err}`);
  }
}

//指定されたファイル名のMarkdown記事を取得し、記事の内容とメタデータを解析して返す
export async function fetchGithubMakeArticle(url: string, fileName: string) {
  try {
    const res = await fetch(url + fileName, {
      headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` },
    });
    if (!res.ok) {
      throw `ステータスコードエラー：${res.status}`;
    } else {
      const data = await res.json();
      const buffer = Buffer.from(data.content, 'base64');
      const fileContents = buffer.toString('utf-8');
      const matterResult = matter(fileContents);
      if (!matterResult.data.published) {
        return;
      }

      return {
        id: fileName.replace(/\.md$/, ''),
        ...(matterResult.data as {
          title: string;
          emoji: string;
          type: string;
          topics: string[];
          published: boolean;
          date: string;
        }),
        content: matterResult.content,
        from: 'Zenn',
      };
    }
  } catch (err) {
    console.log(`contentfetchデータの処理中にエラー：${err}`);
  }
}

/*
{
  "id": "sample",
  "title": "Reactの基本",
  "emoji": "🥺",
  "type": "tech",
  "topics": ["React", "JavaScript"],
  "published": true,
  "date": "2024-12-29",
  "content": "この記事ではReactの基本について解説します。",
  "from": "Zenn"
}
*/
