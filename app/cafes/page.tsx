'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Link from'next/link';
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

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">KCC Cafe Reports</h1>
      <p className="text-center text-sm text-gray-500 mb-8">#カフェ巡り の記録をお届けします</p>
      {/* スマホでは1列、画面幅が広い場合は2列で表示 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
        {cafes.map((cafe) => (
          <div
          key={cafe.id}
          className="border rounded-2xl shadow bg-white p-4 hover:shadow-md transition"
          >
          <Link href={`/cafes/${cafe.id}`} className="block">
              <h2 className="text-xl font-semibold mb-2">{cafe.title}</h2>
              {cafe.photo_url && (
                <img
                  src={cafe.photo_url}
                  alt="カフェ写真"
                  className="w-full h-32 object-cover rounded mb-2"
                />
              )}
              <p className="text-sm text-gray-500 mb-1">投稿者: {cafe.author}</p>
              <div className="text-sm text-gray-600 flex flex-wrap gap-1">
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
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}



