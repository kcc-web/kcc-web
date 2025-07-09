// pages/index.js

import { useEffect, useState } from 'react';

export default function Home() {
  const [cafes, setCafes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/notion');
      const json = await res.json();
      setCafes(json.results);
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>カフェレポ一覧</h1>
      <ul>
        {cafes.map((cafe) => {
          const title = cafe.properties?.店名?.title?.[0]?.text?.content || '無題';
          const comment = cafe.properties?.コメント?.rich_text?.[0]?.text?.content || '';
          const tag = cafe.properties?.タグ?.multi_select?.map((t) => t.name).join(', ') || '';
          return (
            <li key={cafe.id} style={{ marginBottom: '1rem' }}>
              <strong>{title}</strong><br />
              コメント: {comment}<br />
              タグ: {tag}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
