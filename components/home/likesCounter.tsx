'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface LikesCounterProps {
  blogId: string;
}

const LikesCounter = ({ blogId }: LikesCounterProps) => {
  const [likes, setLikes] = useState<number>(0);

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

    fetchLikes();
  }, [blogId]);

  return <span className="ml-1 inline-block font-bold">{likes}</span>;
};

export default LikesCounter;
