"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type Cafe = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  author?: string;
  photo_url?: string;
  created_at?: string;
};

export default function AdminCafeListPage() {
  const supabase = createClient();

  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [editTarget, setEditTarget] = useState<Cafe | null>(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const [form, setForm] = useState({
    title: "",
    content: "",
    tags: "",
    author: "",
  });

  const fetchCafes = async () => {
    const { data } = await supabase.from("cafes").select("*").order("created_at", { ascending: false });
    if (data) setCafes(data);
  };

  useEffect(() => {
    fetchCafes();
  }, []);

  const handleEdit = (cafe: Cafe) => {
    setEditTarget(cafe);
    setForm({
      title: cafe.title,
      content: cafe.content,
      tags: Array.isArray(cafe.tags) ? cafe.tags.join(", ") : "",
      author: cafe.author || "",
    });
    setPreviewUrl(cafe.photo_url || null);
    setPhotoFile(null);
  };

  const handleUpdate = async () => {
    if (!editTarget) return;
    setUploading(true);

    let photoUrl = previewUrl || "";

    if (photoFile) {
      const ext = photoFile.name.split(".").pop();
      const fileName = `${Date.now()}.${ext}`;
      const filePath = `admin/assets/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("cafe-photos")
        .upload(filePath, photoFile);

      if (uploadError) {
        alert("❌ 写真アップロード失敗");
        setUploading(false);
        return;
      }

      const { data } = supabase.storage
        .from("cafe-photos")
        .getPublicUrl(filePath);

      photoUrl = data.publicUrl;
    }

    const tagsArray = form.tags.split(",").map((t) => t.trim()).filter(Boolean);

    const { error } = await supabase
      .from("cafes")
      .update({
        title: form.title,
        content: form.content,
        tags: tagsArray,
        author: form.author,
        photo_url: photoUrl,
      })
      .eq("id", editTarget.id);

    if (error) alert("❌ 編集失敗：" + error.message);
    else alert("✅ 編集完了");

    setEditTarget(null);
    setPhotoFile(null);
    setPreviewUrl(null);
    setForm({ title: "", content: "", tags: "", author: "" });
    fetchCafes();
    setUploading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("本当に削除しますか？")) return;
    const { error } = await supabase.from("cafes").delete().eq("id", id);
    if (!error) fetchCafes();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">カフェレポート一覧（管理）</h1>

      {editTarget && (
        <div className="bg-yellow-50 p-4 rounded mb-6">
          <h2 className="font-semibold mb-2">編集中: {editTarget.title}</h2>
          <input className="border p-2 w-full mb-2" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <textarea className="border p-2 w-full mb-2" rows={4} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
          <input className="border p-2 w-full mb-2" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
          <input className="border p-2 w-full mb-2" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
          <input type="file" onChange={(e) => {
            const file = e.target.files?.[0] || null;
            setPhotoFile(file);
            setPreviewUrl(file ? URL.createObjectURL(file) : null);
          }} />
          {previewUrl && <img src={previewUrl} className="mt-2 max-w-xs" />}
          <button onClick={handleUpdate} className="mt-2 bg-blue-600 text-white px-4 py-2 rounded" disabled={uploading}>
            {uploading ? "更新中..." : "更新する"}
          </button>
        </div>
      )}

      <ul className="space-y-6">
        {cafes.map((cafe) => (
          <li key={cafe.id} className="border rounded p-4">
            <h3 className="text-lg font-semibold">{cafe.title}</h3>
            <p className="text-sm text-gray-600">{cafe.author} - {cafe.created_at?.slice(0, 10)}</p>
            <p className="mt-1">{cafe.content}</p>
            {cafe.photo_url && <img src={cafe.photo_url} className="mt-2 max-w-xs" />}
            <div className="mt-2 space-x-2">
              <button onClick={() => handleEdit(cafe)} className="bg-orange-500 text-white px-3 py-1 rounded">編集</button>
              <button onClick={() => handleDelete(cafe.id)} className="bg-red-600 text-white px-3 py-1 rounded">削除</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}


