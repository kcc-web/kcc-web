export default function EventsPage() {
  // 仮データ。のちほど JSON や Notion 連携で差し替えます。
  const events = [
    { id: 1, title: "ドリップ会 Vol.1", date: "2025-04-15" },
    { id: 2, title: "夏企画：BBQ×アイスコーヒー", date: "2025-07-05" },
    { id: 3, title: "三田祭出店", date: "2025-11-03" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">イベント一覧</h2>
      <ul className="space-y-4">
        {events.map(ev => (
          <li key={ev.id} className="p-4 border rounded hover:shadow">
            <h3 className="text-xl font-semibold">{ev.title}</h3>
            <p className="text-gray-600">開催日：{ev.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
