"use client";

import { useState } from "react";
import { createClient } from "../../utils/supabase/client";

export default function AdminPage() {
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState(""); // カンマ区切りの入力用
  const [author, setAuthor] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

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

      console.log("✅ uploadData:", uploaded);
      console.error("❌ uploadError:", uploadError);

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

    // タグ文字列を配列に変換
    const tagsArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    // DB登録
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
    }

    setUploading(false);
  };

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
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "600px" }}>
        <input
          type="text"
          placeholder="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="本文"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          required
        />
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
        {previewUrl && (
          <img src={previewUrl} alt="プレビュー" style={{ maxWidth: "100%", height: "auto" }} />
        )}
        <button type="submit" disabled={uploading}>
          {uploading ? "投稿中..." : "投稿する"}
        </button>
      </form>
    </div>
  );
}








