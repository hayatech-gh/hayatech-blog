'use client';

import { useState } from 'react';
import { supabase } from '@/lib/utility/supabase';

interface CommentProps {
  blogId: string;
}

const Comment = ({ blogId }: CommentProps) => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");

  const handleSubmit = async () => {
    // setError("");
    if (!content.trim()) {
      alert('コメントを入力してください。');
      // setError("コメントを入力してください。");
      return;
    }

    setLoading(true);
    // setError("");
    try {
      const { error } = await supabase.from('comments').insert([
        {
          name: name.trim() || 'No Name', // 空の場合は「名無し」
          content: content.trim(),
          blog_id: blogId,
        },
      ]);
      if (error) {
        // エラー解析
        if (error.message.includes('violates check constraint')) {
          if (error.message.includes('name')) {
            throw new Error('名前は50文字以下で入力してください。');
          } else if (error.message.includes('content')) {
            throw new Error('コメントは400文字以下で入力してください。');
          }
        }
        throw error;
      }

      alert('コメントが送信されました！');
      setName('');
      setContent('');
    } catch (error) {
      // setError(error.message || 'エラーが発生しました。');
      alert('エラーが発生しました: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p className="mb-4 text-2xl font-semibold text-gray-900">コメント投稿</p>
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="名前 (空欄の場合「No Name」になります)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-slate-400 p-3 focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="コメントを入力してください"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded-lg border border-slate-400 p-3 focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          // disabled={loading || content.length === 0}
          className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:cursor-pointer hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? '送信中...' : '送信'}
        </button>
        <small>
          ※コメントは、不特定多数の方が閲覧します。内容には責任を持って投稿してください。不適切な内容と判断した場合、予告なくコメントを削除することがあります。また、適切であっても運営の都合上削除することがありますので、予めご了承ください。
        </small>
      </div>
    </div>
  );
};

export default Comment;
