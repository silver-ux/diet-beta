import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

// アカウント作成時のデータをアップロード
export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const body = await req.json();
  const { data, error } = await supabase.auth.signUp({
    email: body.email,
    password: body.password,
  });
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
