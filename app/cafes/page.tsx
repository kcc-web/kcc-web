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
      <h1 className="text-2xl font-bold mb-4">カフェレポ一覧</h1>
      <ul className="space-y-4">
        {cafes.map((cafe) => (
          <li key={cafe.id} className="border rounded p-4 shadow-sm">
            <h2 className="text-xl font-semibold">{cafe.title}</h2>
            <p className="text-gray-500 text-sm">{cafe.author}</p>
            <p className="mt-2">{cafe.body}</p>
            {cafe.tags && (
              <div className="mt-2 text-sm text-blue-600">
                #{cafe.tags.join(' #')}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

