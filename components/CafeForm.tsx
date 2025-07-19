"use client";

import { useState } from "react";
import { createClient } from "../utils/supabase/client";

export default function CafeForm() {
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    let photoUrl = "";

    // 写真アップロード処理
    if (photoFile) {
      const fileExt = photoFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `public/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("cafe-photos")
        .upload(filePath, photoFile);

      if (uploadError) {
        alert("写真のアップロードに失敗しました");
        setUploading(false);
        return;
      }

      const { data } = supabase.storage
        .from("cafe-photos")
        .getPublicUrl(filePath);
      photoUrl = data.publicUrl;
    }
 // カンマ区切りのタグを配列に変換
    const tagsArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);
    // DBへの登録
    const { error } = await supabase.from("cafes").insert({
      title,
      content,
      tags:tagsArray,
      photo_url: photoUrl,
      created_at: new Date().toISOString(),
      author: "admin", // 必要ならログインユーザーIDにする
    });

    if (error) {
      alert("投稿に失敗しました");
    } else {
      alert("投稿が完了しました！");
      setTitle("");
      setContent("");
      setTags("");
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
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "500px" }}>
      <h2>管理者用カフェ投稿フォーム</h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="タイトル"
        required
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="コメント（内容）"
        rows={4}
        required
      />

      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="タグ（例：#浅煎り, #空間おしゃれ）"
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        required
      />

      {previewUrl && (
        <img src={previewUrl} alt="プレビュー" style={{ maxWidth: "100%", height: "auto" }} />
      )}

      <button type="submit" disabled={uploading}>
        {uploading ? "投稿中..." : "投稿する"}
      </button>
    </form>
  );
}




