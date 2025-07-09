import { createClient } from "@/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
  const supabase = await createClient();
  // ここでログアウト処理（例：Supabaseなど）
  const { error } = await supabase.auth.signOut();
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  // メッセージを返す（仮に成功したとする）
  return NextResponse.json({
    message: "ログアウトしました",
  });
}
