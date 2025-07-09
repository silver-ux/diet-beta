import { createClient } from "@/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) return NextResponse.json({ error: error.message });
  return NextResponse.json(user);
}
