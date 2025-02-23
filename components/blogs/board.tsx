'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/utility/supabase';

interface BoardProps {
  blogId: string;
}

const Board = ({ blogId }: BoardProps) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('blog_id', blogId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('コメントの取得に失敗しました:', error);
      } else {
        setComments(data);
      }
    };

    fetchComments();

    // リアルタイムでコメントを更新
    const subscription = supabase
      .channel('realtime-comments')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'comments',
          filter: `blog_id=eq.${blogId}`,
        },
        (payload) => {
          setComments((prev) => [payload.new, ...prev]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [blogId]);

  return (
    <div className="mt-6">
      <p className="mb-4 text-2xl font-semibold text-gray-900">コメント欄</p>
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="rounded-lg border border-slate-400 bg-gray-50 p-4 shadow-sm"
            >
              <p className="break-words text-lg font-bold text-gray-800">
                <span className="text-xs text-gray-400">{comment.id}. </span>
                {comment.name}
              </p>
              <p className="mt-2 text-gray-800">{comment.content}</p>
              <p className="text-xs text-gray-400">
                {new Date(comment.created_at).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-400">コメントはまだありません</p>
        )}
      </div>
    </div>
  );
};

export default Board;
