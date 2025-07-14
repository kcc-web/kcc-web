"use client";

import { useState, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";

// 投稿型定義（オプション含む）
type Cafe = {
  id: number;
  title: string;
  content: string;
  tags: string[];
  author?: string;
  photo_url?: string;
  created_at?: string;
};

export default function AdminPage() {
  const supabase = createClient();

  // 投稿用のstate
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState(""); // カンマ区切り入力
  const [author, setAuthor] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // 一覧取得用state
  const [cafes, setCafes] = useState<Cafe[]>([]);

  // 投稿一覧の取得
  const fetchCafes = async () => {
    const { data, error } = await supabase
      .from("cafes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("❌ 投稿一覧取得失敗:", error);
    } else {
      setCafes(data);
    }
  };

  useEffect(() => {
    fetchCafes();
  }, []);

  // 投稿削除
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("この投稿を削除しますか？");
    if (!confirmDelete) return;

    const { error } = await supabase.from("cafes").delete().eq("id", id);
    if (error) {
      alert("❌ 削除に失敗しました");
    } else {
      alert("✅ 削除されました");
      fetchCafes();
    }
  };

  // 投稿処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    let photoUrl = "";

    // 画像アップロード
    if (photoFile) {
      const fileExt = photoFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `admin/assets/${fileName}`;

      const { data: uploaded, error: uploadError } = await supabase.storage
        .from("cafe-photos")
        .upload(filePath, photoFile);

      if (uploadError) {
        alert("❌ 写真のアップロードに失敗しました");
        setUploading(false);
        return;
      }

      const { data: urlData } = supabase
        .storage
        .from("cafe-photos")
        .getPublicUrl(filePath);

      photoUrl = urlData.publicUrl;
    }

    // タグ配列へ変換
    const tagsArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const { error } = await supabase.from("cafes").insert({
      title,
      content,
      tags: tagsArray,
      photo_url: photoUrl,
      created_at: new Date().toISOString(),
      author,
    });

    if (error) {
      alert("❌ 投稿失敗：" + error.message);
    } else {
      alert("✅ 投稿が完了しました！");
      setTitle("");
      setContent("");
      setTags("");
      setAuthor("");
      setPhotoFile(null);
      setPreviewUrl(null);
      fetchCafes(); // 投稿後に一覧更新
    }

    setUploading(false);
  };

  // ファイル変更時のプレビュー
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPhotoFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>カフェレポート投稿ページ</h1>

      {/* 投稿フォーム */}
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "600px" }}
      >
        <input type="text" placeholder="タイトル" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="本文" value={content} onChange={(e) => setContent(e.target.value)} rows={5} required />
        <input
          type="text"
          placeholder="タグ（カンマ区切りで複数OK）"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <input
          type="text"
          placeholder="投稿者名"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <input type="file" accept="image/*" onChange={handleFileChange} required />
        {previewUrl && <img src={previewUrl} alt="プレビュー" style={{ maxWidth: "100%", height: "auto" }} />}
        <button type="submit" disabled={uploading}>
          {uploading ? "投稿中..." : "投稿する"}
        </button>
      </form>

      {/* 投稿一覧 */}
      <h2 style={{ fontSize: "1.25rem", marginTop: "3rem" }}>投稿一覧</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {cafes.map((cafe) => (
          <li
            key={cafe.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <h3>{cafe.title}</h3>
            <p>
              <strong>投稿者：</strong>
              {cafe.author || "不明"}　
              <strong>日時：</strong>
              {cafe.created_at?.slice(0, 16).replace("T", " ")}
            </p>
            <p>
              <strong>タグ：</strong>
              {Array.isArray(cafe.tags) ? cafe.tags.join(", ") : cafe.tags}
            </p>
            <p>{cafe.content}</p>
            {cafe.photo_url && (
              <img
                src={cafe.photo_url}
                alt="写真"
                style={{ width: "100%", maxWidth: "300px", borderRadius: "8px", marginTop: "0.5rem" }}
              />
            )}
            <button
              onClick={() => handleDelete(cafe.id)}
              style={{
                marginTop: "0.5rem",
                padding: "0.4rem 0.8rem",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}









