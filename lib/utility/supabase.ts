import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseApiKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY!;

if (!supabaseUrl || !supabaseApiKey) {
  throw new Error("Supabase URL and API KEY are required.");
}

export const supabase = createClient(supabaseUrl, supabaseApiKey);

/*
非nullアサーション演算子：
値がnullまたはundefinedではないとコンパイラに伝える
*/
