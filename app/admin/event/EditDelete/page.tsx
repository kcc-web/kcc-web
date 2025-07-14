"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

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
    const { data } = await supabase.from("event").select("*").order("date", { ascending: true });
    if (data) setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

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
      .update({
        title: form.title,
        date: form.date,
        location: form.location,
        description: form.description,
      })
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">イベント一覧（管理）</h1>

      {editTarget && (
        <div className="bg-yellow-50 p-4 rounded mb-6">
          <h2 className="font-semibold mb-2">編集中: {editTarget.title}</h2>
          <input className="border p-2 w-full mb-2" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input type="date" className="border p-2 w-full mb-2" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          <input className="border p-2 w-full mb-2" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          <textarea className="border p-2 w-full mb-2" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <button onClick={handleUpdate} className="bg-blue-600 text-white px-4 py-2 rounded">更新する</button>
        </div>
      )}

      <ul className="space-y-6">
        {events.map((event) => (
          <li key={event.id} className="border rounded p-4">
            <h3 className="text-lg font-semibold">{event.title}</h3>
            <p className="text-sm text-gray-600">{event.date} - {event.location}</p>
            <p className="mt-1">{event.description}</p>
            <div className="mt-2 space-x-2">
              <button onClick={() => handleEdit(event)} className="bg-orange-500 text-white px-3 py-1 rounded">編集</button>
              <button onClick={() => handleDelete(event.id)} className="bg-red-600 text-white px-3 py-1 rounded">削除</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

