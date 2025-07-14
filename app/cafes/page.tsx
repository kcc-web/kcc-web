'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

type Cafe = {
  id: string;
  title: string;
  body: string;
  author?: string;
  tags?: string[];
  photo_url?: string;
};

export default function CafeListPage() {
  const supabase = createClient();
  const [cafes, setCafes] = useState<Cafe[]>([]);

  useEffect(() => {
    const fetchCafes = async () => {
      const { data } = await supabase
        .from('cafes')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setCafes(data);
    };

    fetchCafes();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">カフェレポ一覧</h1>
      <ul className="space-y-6">
        {cafes.map((cafe) => (
          <li key={cafe.id} className="border rounded p-4 shadow-sm">
            <h2 className="text-xl font-semibold mb-1">{cafe.title}</h2>
            <p className="text-sm text-gray-600 mb-2">{cafe.author}</p>
            {cafe.photo_url && (
              <img
                src={cafe.photo_url}
                alt="カフェ写真"
                className="w-full max-w-md mb-3 rounded"
              />
            )}
            <p className="mb-2">{cafe.body}</p>
            {cafe.tags && cafe.tags.length > 0 && (
              <div className="text-sm text-blue-600">
                #{cafe.tags.join(' #')}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}


