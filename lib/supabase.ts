import { createClient } from '@supabase/supabase-js';

/*
Supabase環境変数
Next.jsサーバー側 NEXT_PUBLIC_:不要
Next.jsクライアント側 NEXT_PUBLIC_:必要
*/
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseApiKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY!;

if (!supabaseUrl || !supabaseApiKey) {
  throw new Error('Supabase URL and API KEY are required.');
}

export const supabase = createClient(supabaseUrl, supabaseApiKey);
