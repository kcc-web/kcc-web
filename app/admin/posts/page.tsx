// app/admin/posts/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import heic2any from 'heic2any';

export default function CafePostCreatePage() {
  const supabase = createClient();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [author, setAuthor] = useState('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPhotoFile(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  };

  async function handleUploadImage(file: File): Promise<string | null> {
    let uploadFile = file;

    if (file.type === 'image/heic' || file.name.toLowerCase().endsWith('.heic')) {
      try {
        const convertedBlob = await heic2any({
          blob: file,
          toType: 'image/jpeg',
          quality: 0.9,
        });
        uploadFile = new File([convertedBlob as BlobPart], file.name.replace(/\.heic$/, '.jpg'), {
          type: 'image/jpeg',
        });
      } catch (err) {
        alert('HEIC画像の変換に失敗しました');
        return null;
      }
    }

    const ext = uploadFile.name.split('.').pop();
    const fileName = `${Date.now()}.${ext}`;
    const filePath = `admin/assets/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('cafe-photos')
      .upload(filePath, uploadFile);

    if (uploadError) {
      alert('❌ 画像アップロード失敗');
      return null;
    }

    const { data } = supabase.storage.from('cafe-photos').getPublicUrl(filePath);
    return data.publicUrl;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    let photoUrl = '';
    if (photoFile) {
      const url = await handleUploadImage(photoFile);
      if (!url) {
        setUploading(false);
        return;
      }
      photoUrl = url;
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
      created_at: new Date().toISOString(),
    });

    if (error) alert('❌ 投稿失敗：' + error.message);
    else alert('✅ 投稿完了！');

    setTitle('');
    setContent('');
    setTags('');
    setAuthor('');
    setPhotoFile(null);
    setPreviewUrl(null);
    setUploading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
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









