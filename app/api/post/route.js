import { createClient } from "@supabase/supabase-js";

console.log("✅ SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("✅ SUPABASE_ANON_KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  console.log("📩 API受信");

  try {
    const body = await req.json();
    const { title, content, tags, photo_url, location } = body;

    console.log("📝 受け取ったデータ:", {
      title, content, tags, photo_url, location
    });

    const { data, error } = await supabase
      .from("cafes")
      .insert([{
        title,
        content,
        tags,
        photo_url,
        author: "admin",     // ← 手動で設定
        location             // ← { lat: ..., lng: ... } でもOK
        // created_at は Supabase側で now() 自動設定
      }]);

    if (error) {
      console.error("🚨 Supabase Insert Error:", error);
      return new Response(
        JSON.stringify({ message: "DB insert error", error }),
        { status: 500 }
      );
    }

    console.log("✅ 投稿成功:", data);
    return new Response(
      JSON.stringify({ message: "Success", data }),
      { status: 200 }
    );

  } catch (err) {
    console.error("❗ Unexpected Error:", err);
    return new Response(
      JSON.stringify({ message: "Unexpected error", error: err.message }),
      { status: 500 }
    );
  }
}




