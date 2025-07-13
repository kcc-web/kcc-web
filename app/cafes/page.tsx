"use client";

console.log("✅ Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("✅ Supabase KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.slice(0, 10) + "...");

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type Cafe = {
  id: number;
  title: string;
  tags: string[];
  content: string;
  photo_url?: string;
  author?: string;
};

export default function CafesPage() {
  console.log("🔁 コンポーネント描画"); // ← ここ追加！

  const supabase = createClient();
  console.log("🧪 Supabase client:", supabase); // ← ここも！

  const [cafes, setCafes] = useState<Cafe[]>([]);

  useEffect(() => {
    console.log("✅ useEffect 呼ばれた"); // ← ここ！

    const fetchCafes = async () => {
      console.log("📡 fetchCafes 実行中");
      const { data, error } = await supabase.from("cafes").select("*").order("created_at", { ascending: false });

      console.log("📦 data:", data);
      console.log("⚠️ error:", error);

      if (error) {
        console.error("❌ データ取得失敗:", error);
      } else {
        setCafes(data);
      }
    };
    fetchCafes();
  }, []);

  return (
    <div className="space-y-6 px-4 py-8">
      <h2 className="text-2xl font-bold">カフェレポート</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cafes.map((cafe) => (
          <li key={cafe.id} className="p-4 border rounded space-y-2">
            {cafe.photo_url && (
              <img src={cafe.photo_url} alt={cafe.title} className="w-full h-48 object-cover rounded" />
            )}
            <h3 className="text-xl font-semibold">{cafe.title}</h3>
            <p className="text-sm text-gray-500">タグ：{Array.isArray(cafe.tags) ? cafe.tags.join(", ") : cafe.tags}</p>
            <p className="text-sm text-gray-600">投稿者：{cafe.author || "不明"}</p>
            <p className="mt-2">{cafe.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}


