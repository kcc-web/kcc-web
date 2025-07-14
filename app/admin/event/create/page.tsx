"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function CreateEventPage() {
  const supabase = createClient();
  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });

  const handleSubmit = async () => {
    const { error } = await supabase.from("event").insert([form]);
    if (error) alert("\u274c 作成失敗：" + error.message);
    else alert("\u2705 作成完了");
    setForm({ title: "", date: "", location: "", description: "" });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">イベント作成</h1>
      <input
        className="border p-2 w-full mb-2"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        placeholder="タイトル"
      />
      <input
        type="date"
        className="border p-2 w-full mb-2"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />
      <input
        className="border p-2 w-full mb-2"
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
        placeholder="場所"
      />
      <textarea
        className="border p-2 w-full mb-2"
        rows={3}
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        placeholder="詳細"
      />
      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        投稿する
      </button>
    </div>
  );
}