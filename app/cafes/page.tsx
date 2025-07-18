'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

type Cafe = {
  id: string;
  title: string;
  author: string;
  content: string;
  tags: string[] | null;
  photo_url?: string;
  map_url?: string;
  created_at?: string;
};

export default function CafeListPage() {
  const supabase = createClient();
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleOpen = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  useEffect(() => {
    const fetchCafes = async () => {
      const { data, error } = await supabase.from('cafes').select('*').order('created_at', { ascending: false });
      if (data) setCafes(data);
      if (error) console.error(error.message);
    };

    fetchCafes();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">カフェレポート一覧</h1>
      <div className="space-y-4">
        {cafes.map((cafe) => (
          <div key={cafe.id} className="border rounded-lg p-4 shadow hover:bg-gray-50 transition">
            <button onClick={() => toggleOpen(cafe.id)} className="text-left w-full space-y-2">
              <h2 className="text-xl font-semibold">{cafe.title}</h2>
              <p className="text-sm text-gray-500">投稿者: {cafe.author}</p>
              <div className="text-sm text-gray-700">
                {Array.isArray(cafe.tags) &&
                  cafe.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 mr-1 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
              </div>
              <p className="text-sm text-gray-600 mt-2 whitespace-pre-wrap">
                {cafe.content.length > 80 ? `${cafe.content.slice(0, 80)}...` : cafe.content}
              </p>
            </button>

            {openId === cafe.id && (
              <div className="mt-4 border-t pt-3 space-y-3 text-sm bg-gray-50 rounded-b-lg">
                <p className="whitespace-pre-wrap">{cafe.content}</p>
                {cafe.photo_url && (
                  <img
                    src={cafe.photo_url}
                    alt="カフェ写真"
                    className="w-full max-w-md rounded"
                  />
                )}
                {cafe.map_url?.includes('/embed?pb=') ? (
                  <iframe
                    src={cafe.map_url}
                    width="100%"
                    height="300"
                    className="rounded"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  />
                ) : cafe.map_url ? (
                  <a
                    href={cafe.map_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Googleマップで開く
                  </a>
                ) : null}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}







