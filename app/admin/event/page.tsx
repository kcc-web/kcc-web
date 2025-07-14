'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client'; // supabase clientの場所に応じて調整
// ✅ これを冒頭に追加しておく
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
  const [form, setForm] = useState<Partial<Event>>({});

  const fetchEvents = async () => {
    const { data, error } = await supabase.from('event').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error('イベント取得エラー:', error);
    } else {
      setEvents(data || []);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = async () => {
    if (!form.title) return;

    if (form.id) {
      await supabase.from('event').update(form).eq('id', form.id);
    } else {
      await supabase.from('event').insert(form);
    }

    setForm({});
    fetchEvents();
  };

  const handleDelete = async (id: string) => {
    await supabase.from('event').delete().eq('id', id);
    fetchEvents();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">イベント作成・編集</h1>

      <div className="bg-gray-100 p-4 rounded-lg mb-6 space-y-2">
        <input
          className="w-full p-2 border rounded"
          placeholder="イベント名"
          value={form.title || ''}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          className="w-full p-2 border rounded"
          type="date"
          value={form.date || ''}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="場所"
          value={form.location || ''}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <textarea
          className="w-full p-2 border rounded"
          placeholder="説明"
          value={form.description || ''}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleSubmit}
        >
          {form.id ? 'イベントを更新' : 'イベントを作成'}
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">イベント一覧</h2>
        {events.map((event) => (
          <div key={event.id} className="border p-4 mb-3 rounded">
            <div className="font-bold text-lg">{event.title}</div>
            <div className="text-sm text-gray-600">
              {event.date} @ {event.location}
            </div>
            <p className="text-sm">{event.description}</p>
            <div className="mt-2 space-x-4">
              <button
                className="text-blue-600 underline"
                onClick={() => setForm(event)}
              >
                編集
              </button>
              <button
                className="text-red-600 underline"
                onClick={() => handleDelete(event.id)}
              >
                削除
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}