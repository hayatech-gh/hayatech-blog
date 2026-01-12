import { SiJavascript } from 'react-icons/si';
import { SiTypescript } from 'react-icons/si';
import { SiReact } from 'react-icons/si';
import { SiNextdotjs } from 'react-icons/si';
import { SiJquery } from 'react-icons/si';
import { SiPhp } from 'react-icons/si';
import { SiLaravel } from 'react-icons/si';
import { SiPython } from 'react-icons/si';
import { TbSql } from 'react-icons/tb';
import { PiMicrosoftExcelLogoLight } from 'react-icons/pi';
import { BiSolidFileHtml } from 'react-icons/bi';
import { BiSolidFileCss } from 'react-icons/bi';

export const about = {
  title: 'About',
  titleSub: 'HayaTech-Blogについてご紹介します！',
  headingBlog: 'HayaTech-Blogについて',
  descriptionBlog: (
    <>
      HayaTech-Blogでは、エンジニアのための情報共有コミュニティである
      <span className="mx-1 text-blue-400">
        <a href="https://zenn.dev/hayatech" target="_blank">
          ZENN
        </a>
      </span>
      に投稿している記事を取得して、エンジニア向けのブログとして公開しています。仕事やプライベートで
      Next.js や TypeScript、TailwindCSS
      などを習得した知見を活かしたいと思いましたので、それらを活用した個人開発の一環として、ブログサイトを作りました。これからもブログ記事の追加やサイトのアップデートを継続的に行っていく予定です。どうぞご愛読ください！
    </>
  ),
  headingUpdate: '今後のアップデート',
  updates: ['Blog：', 'Blog：', 'Blog：', 'Blog：', '記事：', '共通：'],
  headingAuthor: '著作者について',
  name: 'HayaTech',
  githubID: 'hayatech-gh',
  githubURL: 'https://github.com/hayatech-gh',
  descriptionAuthor:
    'はじめまして、HayaTechです。大学卒業後、新卒でWeb制作の現場に入り、現在はWeb系の開発を中心に取り組んでいます。エンジニア歴は約3年半。このブログでは、日々の開発で学んだことや気づきをアウトプットしながら、技術力の向上を目指していきます。',
  headingCareer: '経歴',
  careers: [
    '青山学院大学 社会情報学部 社会情報学科 学士卒',
    'Webクリエイター＆Webエンジニア 3.5年',
  ],
  headingDevLang: '使用言語',
  skills: [
    <>
      <span className="flex items-center justify-center">
        <SiJavascript className="mr-1 shrink-0" />
        <span>JavaScript</span>
      </span>
    </>,
    <>
      <span className="flex items-center justify-center">
        <SiTypescript className="mr-1 shrink-0" />
        <span>TypeScript</span>
      </span>
    </>,
    <>
      <span className="flex items-center justify-center">
        <SiReact className="mr-1" />
        <span>React</span>
      </span>
    </>,
    <>
      <span className="flex items-center justify-center">
        <SiNextdotjs className="mr-1" />
        <span>Next.js</span>
      </span>
    </>,
    <>
      <span className="flex items-center justify-center">
        <SiJquery className="mr-1" />
        <span>jQuery</span>
      </span>
    </>,
    <>
      <span className="flex items-center justify-center">
        <SiPhp className="mr-1" />
        <span>PHP</span>
      </span>
    </>,
    <>
      <span className="flex items-center justify-center">
        <SiLaravel className="mr-1" />
        <span>Laravel</span>
      </span>
    </>,
    <>
      <span className="flex items-center justify-center">
        <SiPython className="mr-1" />
        <span>Python</span>
      </span>
    </>,
    <>
      <span className="flex items-center justify-center">
        <PiMicrosoftExcelLogoLight className="mr-1" />
        <span>VBA</span>
      </span>
    </>,
    <>
      <span className="flex items-center justify-center">
        <TbSql className="mr-1" />
        <span>SQL</span>
      </span>
    </>,
    <>
      <span className="flex items-center justify-center">
        <BiSolidFileHtml className="mr-1" />
        <span>HTML</span>
      </span>
    </>,
    <>
      <span className="flex items-center justify-center">
        <BiSolidFileCss className="mr-1" />
        <span>CSS</span>
      </span>
    </>,
  ],
  footnotes: '※仕事またはプライベートでの経験６ヶ月以上を記載',
  headingCertification: '資格',
  certification: {
    it: {
      heading: 'IT',
      contents: [
        'Python3エンジニア認定実践試験 ※2026年内取得予定',
        '応用情報技術者試験 ※2026年4月取得予定',
        'AWS SAA-C03 ※2026年2月取得予定',
        'Python3エンジニア認定基礎試験',
        'LPIC-1（Exam 101, Exam 102）',
        'WEBクリエイター能力認定試験 エキスパート',
        'ITパスポート試験',
      ],
    },
    design: {
      heading: 'デザイン',
      contents: [
        'Photoshopクリエイター能力認定試験 エキスパート',
        'Illustratorクリエイター能力認定試験 エキスパート',
      ],
    },
    other: {
      heading: 'その他',
      contents: [
        'TOEIC® Listening & Reading 735点',
        'PROGOS English Speaking CEFR Levels B1',
      ],
    },
  },
};
