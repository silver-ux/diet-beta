import { createClient } from "@/supabase/server";
import { NextRequest } from "next/server";

// ログインデータをアップロード
export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
}
