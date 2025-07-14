"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import BackToAdmin from "@/components/admin/BackToAdmin"; // ✅ 追加！

type Event = {
  id: string;
  title: string;
  date: string;
  location?: string;
  description?: string;
  created_at?: string;
};

export default function AdminEventPage() {
  const supabase = createClient();
  const [events, setEvents] = useState<Event[]>([]);
  const [editTarget, setEditTarget] = useState<Event | null>(null);

  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });

  const fetchEvents = async () => {
    const { data } = await supabase
      .from("event")
      .select("*")
      .order("date", { ascending: true });
    if (data) setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = async () => {
    const { error } = await supabase.from("event").insert([form]);
    if (error) alert("❌ 作成失敗：" + error.message);
    else alert("✅ 作成完了");

    setForm({ title: "", date: "", location: "", description: "" });
    fetchEvents();
  };

  const handleEdit = (event: Event) => {
    setEditTarget(event);
    setForm({
      title: event.title,
      date: event.date,
      location: event.location || "",
      description: event.description || "",
    });
  };

  const handleUpdate = async () => {
    if (!editTarget) return;

    const { error } = await supabase
      .from("event")
      .update(form)
      .eq("id", editTarget.id);

    if (error) alert("❌ 編集失敗：" + error.message);
    else alert("✅ 編集完了");

    setEditTarget(null);
    setForm({ title: "", date: "", location: "", description: "" });
    fetchEvents();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("本当に削除しますか？")) return;
    const { error } = await supabase.from("event").delete().eq("id", id);
    if (!error) fetchEvents();
  };

  return (
    <div className="p-6 space-y-10">
      <BackToAdmin /> {/* ✅ 管理ページへの戻るボタン */}

      {/* 作成 or 編集フォーム */}
      <div className="bg-gray-50 p-4 rounded">
        <h1 className="text-2xl font-bold mb-4">
          {editTarget ? "イベント編集" : "イベント作成"}
        </h1>
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
          onClick={editTarget ? handleUpdate : handleSubmit}
          className={`${
            editTarget ? "bg-blue-600" : "bg-green-600"
          } text-white px-4 py-2 rounded`}
        >
          {editTarget ? "更新する" : "投稿する"}
        </button>
        {editTarget && (
          <button
            className="ml-4 text-sm text-gray-600 underline"
            onClick={() => {
              setEditTarget(null);
              setForm({ title: "", date: "", location: "", description: "" });
            }}
          >
            キャンセル
          </button>
        )}
      </div>

      {/* 一覧 */}
      <div>
        <h2 className="text-xl font-bold mb-4">イベント一覧</h2>
        <ul className="space-y-6">
          {events.map((event) => (
            <li key={event.id} className="border rounded p-4">
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-600">
                {event.date} - {event.location}
              </p>
              <p className="mt-1">{event.description}</p>
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => handleEdit(event)}
                  className="bg-orange-500 text-white px-3 py-1 rounded"
                >
                  編集
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  削除
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}



