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

  const fetchCafes = async () => {
    const { data, error } = await supabase
      .from('cafes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error('❌ エラー:', error.message);
    else setCafes(data || []);
  };

  useEffect(() => {
    fetchCafes();
  }, []);

  const toggleOpen = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">KCC Cafe Reports</h1>
      <p className="text-center text-sm text-gray-500 mb-8">#カフェ巡り の記録をお届けします</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-6">
        {cafes.map((cafe) => (
          <div
          key={cafe.id}
          className="border rounded-2xl shadow bg-white p-4 hover:shadow-md transition cursor-pointer"
          onClick={() => toggleOpen(cafe.id)}
          >
            <h2 className="text-xl font-semibold mb-1">{cafe.title}</h2>
            <p className="text-sm text-gray-500 mb-1">投稿者: {cafe.author}</p>
            <div className="text-sm text-gray-600 flex flex-wrap gap-1 mb-2">
              {Array.isArray(cafe.tags) &&
                cafe.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
            </div>

            {openId === cafe.id && (
              <div className="mt-3 text-sm text-gray-700 whitespace-pre-wrap">
                {cafe.photo_url && (
                  <img
                    src={cafe.photo_url}
                    alt="カフェ写真"
                    className="w-full h-40 object-cover rounded mb-2"
                  />
                )}
                <p>{cafe.content}</p>
                {cafe.map_url?.includes('/embed?pb=') ? (
                  <iframe
                    src={cafe.map_url}
                    width="100%"
                    height="300"
                    className="rounded mt-4"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  />
                ) : cafe.map_url ? (
                  <a
                    href={cafe.map_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline block mt-4"
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



