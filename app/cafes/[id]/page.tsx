'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
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

export default function CafeDetailPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const supabase = createClient();
  const [cafe, setCafe] = useState<Cafe | null>(null);

  useEffect(() => {
    const fetchCafe = async () => {
      const { data, error } = await supabase
        .from('cafes')
        .select('*')
        .eq('id', id)
        .single();

      if (!error) setCafe(data);
      else console.error('Cafe fetch error:', error.message);
    };

    if (id) fetchCafe();
  }, [id]);

  if (!cafe) {
    return <p className="p-6 text-center">Loading...</p>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{cafe.title}</h1>
      <p className="text-sm text-gray-500 mb-2">投稿者: {cafe.author}</p>
      <div className="text-sm text-gray-600 flex flex-wrap gap-1 mb-4">
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
      {cafe.photo_url && (
        <img
          src={cafe.photo_url}
          alt="カフェ写真"
          className="w-full max-h-80 object-cover rounded mb-4"
        />
      )}
      <p className="whitespace-pre-wrap mb-4 text-sm text-gray-700">{cafe.content}</p>
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
  );
}
