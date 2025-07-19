'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { uploadCafePhoto } from '@/utils/supabase/uploadCafePhoto'; // ← 共通関数を使う
import BackToAdmin from "@/components/admin/BackToAdmin";

export default function CafePostCreatePage() {
  const supabase = createClient();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [author, setAuthor] = useState('');
  const [mapUrl, setMapUrl] = useState('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPhotoFile(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    let photoUrl = '';
    if (photoFile) {
      const url = await uploadCafePhoto(photoFile); // ← ここで変換＆アップロード
      if (!url) {
        setUploading(false);
        return;
      }
      photoUrl = url;
      console.log("✅ 投稿に使う画像URL:", photoUrl);
    }

    const tagsArray = tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    const { error } = await supabase.from('cafes').insert({
      title,
      content,
      tags: tagsArray,
      photo_url: photoUrl,
      author,
      map_url: mapUrl,
      created_at: new Date().toISOString(),
    });

    if (error) alert('❌ 投稿失敗：' + error.message);
    else alert('✅ 投稿完了！');

    setTitle('');
    setContent('');
    setTags('');
    setAuthor('');
    setMapUrl('');
    setPhotoFile(null);
    setPreviewUrl(null);
    setUploading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <BackToAdmin />
      <h1 className="text-2xl font-bold mb-4">カフェレポート作成</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2"
          placeholder="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full border p-2"
          placeholder="本文"
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          className="w-full border p-2"
          placeholder="タグ（カンマ区切り）"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <input
          className="w-full border p-2"
          placeholder="投稿者名"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <input
          className="w-full border p-2"
          placeholder="Googleマップの共有リンク（例：https://maps.app.goo.gl/...）"
          value={mapUrl}
          onChange={(e) => setMapUrl(e.target.value)}
        />
        <span className="text-xs text-gray-500">
          Googleマップで「共有 → リンクをコピー」したURLを貼ってください
        </span>
        <input
          className="w-full"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        {previewUrl && <img src={previewUrl} alt="preview" className="w-full max-w-sm" />}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={uploading}>
          {uploading ? '投稿中...' : '投稿する'}
        </button>
      </form>
    </div>
  );
}











