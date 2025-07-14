'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

type Event = {
  id: string;
  title: string;
  date: string;
  location?: string;
  description?: string;
  created_at?: string;
};

export default function EventsPage() {
  const supabase = createClient();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('event')
        .select('*')
        .order('date', { ascending: true });

      if (error) {
        console.error('イベント取得エラー:', error);
      } else {
        setEvents(data || []);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold">イベント一覧</h2>
      {events.length === 0 ? (
        <p className="text-gray-500">イベントはまだ登録されていません。</p>
      ) : (
        <ul className="space-y-4">
          {events.map((ev) => (
            <li key={ev.id} className="p-4 border rounded hover:shadow">
              <h3 className="text-xl font-semibold">{ev.title}</h3>
              <p className="text-gray-600">開催日：{ev.date}</p>
              {ev.location && <p className="text-gray-500 text-sm">場所：{ev.location}</p>}
              {ev.description && <p className="mt-1 text-sm">{ev.description}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


