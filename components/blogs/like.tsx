'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/utility/supabase';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

interface LikeProps {
  blogId: string;
}

const Like = ({ blogId }: LikeProps) => {
  const [likes, setLikes] = useState<number>(0);
  // const [likes, setLikes] = useState<number>(0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false); // アニメーション状態

  useEffect(() => {
    // Supabaseからいいね数を取得
    const fetchLikes = async () => {
      const { data, error } = await supabase
        .from('likes')
        .select('count')
        .eq('blog_id', blogId)
        .single();

      if (error) {
        console.error('Error fetching likes:', error);
        return;
      }

      setLikes(data?.count || 0);
    };

    // ローカルストレージから「いいね」状態を確認
    const checkLikedStatus = () => {
      const likedBlogs = JSON.parse(localStorage.getItem('likedBlogs') || '{}');
      setHasLiked(Boolean(likedBlogs[blogId])); // 現在のblogIdに対する状態を確認
    };

    fetchLikes();
    checkLikedStatus();
  }, [blogId]);

  const handleLike = async () => {
    if (hasLiked) return; // すでに「いいね」済みなら処理しない

    // ローカルストレージを更新
    const likedBlogs = JSON.parse(localStorage.getItem('likedBlogs') || '{}');
    likedBlogs[blogId] = true; // 現在のblogIdに対する「いいね」状態を保存
    localStorage.setItem('likedBlogs', JSON.stringify(likedBlogs));

    // Supabaseの「いいね」数を更新
    const { error } = await supabase
      .from('likes')
      .upsert({ blog_id: blogId, count: likes + 1 }, { onConflict: 'blog_id' });

    if (error) {
      console.error('Error updating likes:', error);
      return;
    }

    setLikes(likes + 1); // UIの表示を更新
    setHasLiked(true);

    // アニメーションフラグを有効にする
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500); // アニメーション終了後にリセット
  };
  return (
    <div className="flex items-center">
      <button
        onClick={handleLike}
        className={`flex transform items-center justify-center rounded-full px-6 py-3 font-bold text-white transition duration-200 focus:outline-none ${
          hasLiked
            ? 'cursor-not-allowed bg-gray-300'
            : 'bg-red-500 hover:scale-110 hover:bg-red-600'
        }`}
        disabled={hasLiked}
      >
        {hasLiked ? (
          <ThumbUpAltIcon className="text-white" />
        ) : (
          <ThumbUpOffAltIcon className="text-white" />
        )}
        <span
          className={`ml-3 text-lg font-bold ${
            isAnimating ? 'animate-ping' : ''
          }`}
        >
          {likes}
        </span>
      </button>
    </div>
  );
};

export default Like;
