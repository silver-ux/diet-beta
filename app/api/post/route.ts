import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

// データを取得
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();

  if (userErr) return NextResponse.json({ error: userErr.message });

  const { data, error } = await supabase
    .from("body_data")
    .select("*")
    .order("created_at", { ascending: true })
    .eq("user_id", user!.id);

  if (error) return NextResponse.json({ error: error.message });
  return NextResponse.json(data);
}

// データをアップロード
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { weight } = await req.json(); // JSONをパース
    const {
      data: { user },
      error: userErr,
    } = await supabase.auth.getUser();
    if (userErr)
      return NextResponse.json({ error: userErr.message }, { status: 400 });

    // console.log("受け取ったデータ:", weight, user);

    if (!weight) {
      return NextResponse.json({ error: "数値が必要です" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("body_data")
      .insert({ weight, user_id: user!.id })
      .select()
      .single();
    if (error)
      return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ data, message: `${weight}を追加しました！` });
  } catch (error) {
    return NextResponse.json(
      { error: `サーバーエラー, ${error}` },
      { status: 500 }
    );
  }
}
