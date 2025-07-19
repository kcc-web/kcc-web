'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
//イベントの型
type Event = {
  id: string;
  title: string;
  date: string;　// YYYY-MM-DD
  location?: string;
  description?: string;
  created_at?: string;
};
//月の表示を”YYYY-MM"から　”2025年7月”に変換する
const formatMonth = (ym: string) => {
  const [y, m] = ym.split('-');
  return `${y}年${parseInt(m)}月`;
};
export default function EventsPage() {
  const supabase = createClient();
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string>('');

    // イベントを取得
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

  useEffect(() => {


    fetchEvents();
  }, []);


    // 直近2週間のイベントを抽出
  const today = new Date();
  const limit = new Date();
  limit.setDate(today.getDate() + 14);
  const upcomingEvents = events.filter((ev) => {
    const d = new Date(ev.date);
    return d >= new Date(today.toDateString()) && d <= limit;
  });

  // 月選択肢を生成
  const monthOptions = Array.from(
    new Set(events.map((ev) => ev.date.slice(0, 7)))
  ).sort();

  const monthEvents = selectedMonth
    ? events.filter((ev) => ev.date.startsWith(selectedMonth))
    : [];

  return (
    <div className="space-y-8 p-6">
      {/* 直近2週間のイベント表示 */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">直近2週間のイベント</h2>
          <button
            onClick={fetchEvents}
            className="text-sm text-blue-600 underline"
          >
            更新
          </button>
        </div>
        {upcomingEvents.length === 0 ? (
          <p className="text-gray-500">今後2週間のイベントはありません。</p>
        ) : (
          <ul className="space-y-2">
            {upcomingEvents.map((ev) => (
              <li key={ev.id}>
                <button
                  className="w-full text-left p-2 border rounded hover:bg-gray-50"
                  onClick={() =>
                    setSelectedEvent(selectedEvent === ev.id ? null : ev.id)
                  }
                >
                  <span className="font-semibold mr-2">{ev.date}</span>
                  {ev.title}
                </button>
                {selectedEvent === ev.id && (
                  <div className="mt-2 p-2 bg-gray-50 rounded text-sm space-y-1">
                    {ev.location && <p>場所: {ev.location}</p>}
                    {ev.description && (
                      <p className="whitespace-pre-wrap">{ev.description}</p>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* 月別イベント表示 */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">イベント内容</h2>
        <select
          className="border p-2 rounded"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">月を選択</option>
          {monthOptions.map((m) => (
            <option key={m} value={m}>
              {formatMonth(m)}
            </option>
          ))}
       </select>
        {selectedMonth && (
          <div>
            {monthEvents.length === 0 ? (
              <p className="text-gray-500">この月のイベントはありません。</p>
            ) : (
              <ul className="space-y-2 mt-2">
                {monthEvents.map((ev) => (
                  <li key={ev.id}>
                    <button
                      className="w-full text-left p-2 border rounded hover:bg-gray-50"
                      onClick={() =>
                        setSelectedEvent(selectedEvent === ev.id ? null : ev.id)
                      }
                    >
                      <span className="font-semibold mr-2">{ev.date}</span>
                      {ev.title}
                    </button>
                    {selectedEvent === ev.id && (
                      <div className="mt-2 p-2 bg-gray-50 rounded text-sm space-y-1">
                        {ev.location && <p>場所: {ev.location}</p>}
                        {ev.description && (
                          <p className="whitespace-pre-wrap">{ev.description}</p>
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </section>

      {/* カレンダー */}
      <section>
        <h2 className="text-xl font-bold mb-2">カレンダー</h2>
        <Calendar events={events} />
      </section>

    </div>
  );
}
// --- カレンダーコンポーネント ---
function Calendar({ events }: { events: Event[] }) {
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const changeMonth = (offset: number) => {
    setMonth(new Date(month.getFullYear(), month.getMonth() + offset, 1));
  };

  const monthEvents = events.filter((ev) => {
    const d = new Date(ev.date);
    return d.getFullYear() === month.getFullYear() && d.getMonth() === month.getMonth();
  });

  const eventsByDay: Record<number, Event[]> = {};
  monthEvents.forEach((ev) => {
    const day = new Date(ev.date).getDate();
    eventsByDay[day] = eventsByDay[day] || [];
    eventsByDay[day].push(ev);
  });

  const startDay = month.getDay();
  const daysInMonth = new Date(
    month.getFullYear(),
    month.getMonth() + 1,
    0
  ).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <button
          onClick={() => changeMonth(-1)}
          className="px-2 text-xl"
        >
          &lt;
        </button>
        <span className="font-semibold">
          {month.getFullYear()}年{month.getMonth() + 1}月
        </span>
        <button
          onClick={() => changeMonth(1)}
          className="px-2 text-xl"
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-px text-xs">
        {['日', '月', '火', '水', '木', '金', '土'].map((d) => (
          <div
            key={d}
            className="text-center font-semibold bg-gray-100 p-1"
          >
            {d}
          </div>
        ))}
        {cells.map((day, i) => (
          <div key={i} className="border min-h-[60px] p-1 align-top">
            {day && (
              <div>
                <div className="text-gray-500">{day}</div>
                {eventsByDay[day]?.map((ev) => (
                  <div key={ev.id} className="truncate text-xs">
                    {ev.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


