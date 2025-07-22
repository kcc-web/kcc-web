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

type EditableCafe = {
  title: string;
  author: string;
  content: string;
  tags: string;
  map_url?: string;
};

export default function AdminCafeListPage() {
  const supabase = createClient();
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<EditableCafe>({
    title: '',
    author: '',
    content: '',
    tags: '',
    map_url: '',
  });
  const [openId, setOpenId] = useState<string | null>(null);

  const fetchCafes = async () => {
    const { data, error } = await supabase
      .from('cafes')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setCafes(data);
    if (error) console.error('❌ エラー:', error.message);
  };

  useEffect(() => {
    fetchCafes();
  }, []);

  const handleEdit = (cafe: Cafe) => {
    setEditId(cafe.id);
    setEditData({
      title: cafe.title,
      author: cafe.author,
      content: cafe.content,
      tags: Array.isArray(cafe.tags) ? cafe.tags.join(', ') : '',
      map_url: cafe.map_url || '',
    });
  };

  const handleSave = async () => {
    if (!editId) return;

    const updated = {
      title: editData.title,
      author: editData.author,
      content: editData.content,
      tags: editData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      map_url: editData.map_url,
    };

    const { error } = await supabase.from('cafes').update(updated).eq('id', editId);
    if (error) alert('❌ 更新失敗: ' + error.message);
    else {
      alert('✅ 更新完了');
      setEditId(null);
      fetchCafes();
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('本当に削除しますか？')) {
      const { error } = await supabase.from('cafes').delete().eq('id', id);
      if (!error) {
        alert('✅ 削除完了');
        fetchCafes();
      } else {
        alert('❌ 削除失敗: ' + error.message);
      }
    }
  };

  const toggleOpen = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">投稿されたカフェ一覧</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cafes.map((cafe) => (
          <div key={cafe.id} className="border rounded p-4 shadow space-y-2">
            {editId === cafe.id ? (
              <>
                <p className="text-sm text-gray-500">元タイトル：{cafe.title}</p>
                <input
                  className="w-full border p-1"
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                />
                <p className="text-sm text-gray-500">元投稿者：{cafe.author}</p>
                <input
                  className="w-full border p-1"
                  value={editData.author}
                  onChange={(e) => setEditData({ ...editData, author: e.target.value })}
                />
                <p className="text-sm text-gray-500">元タグ：{Array.isArray(cafe.tags) ? cafe.tags.join(', ') : ''}</p>
                <input
                  className="w-full border p-1"
                  value={editData.tags}
                  onChange={(e) => setEditData({ ...editData, tags: e.target.value })}
                />
                <p className="text-sm text-gray-500">元本文：</p>
                <p className="text-xs text-gray-400 whitespace-pre-wrap">{cafe.content}</p>
                <textarea
                  className="w-full border p-1"
                  rows={4}
                  value={editData.content}
                  onChange={(e) => setEditData({ ...editData, content: e.target.value })}
                />
                <p className="text-sm text-gray-500">元Map URL：</p>
                <p className="text-xs text-gray-400">{cafe.map_url}</p>
                <input
                  className="w-full border p-1"
                  placeholder="Googleマップ埋め込みURL"
                  value={editData.map_url}
                  onChange={(e) => setEditData({ ...editData, map_url: e.target.value })}
                />
                <div className="flex gap-2 mt-2">
                  <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-1 rounded">保存</button>
                  <button onClick={() => setEditId(null)} className="bg-gray-300 px-4 py-1 rounded">キャンセル</button>
                </div>
              </>
            ) : (
              <>
                <button onClick={() => toggleOpen(cafe.id)} className="w-full text-left">
                  <h2 className="text-xl font-semibold">{cafe.title}</h2>
                  <p className="text-sm text-gray-500">投稿者: {cafe.author}</p>
                  <div className="text-sm text-gray-600">
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
                </button>

                {openId === cafe.id && (
                  <div className="mt-2 border-t pt-3 space-y-3 text-sm">
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
                <div className="flex gap-4 mt-2">
                  <button onClick={() => handleEdit(cafe)} className="text-blue-600 text-sm">編集</button>
                  <button onClick={() => handleDelete(cafe.id)} className="text-red-600 text-sm">削除</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}





