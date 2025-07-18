// app/admin/page.tsx
"use client";

import Link from "next/link";
import { Calendar, FileText, PencilLine } from "lucide-react";

const adminLinks = [
  {
    title: "イベント管理",
    href: "/admin/event",
    icon: <Calendar size={32} color="#1e40af" />,
    description: "イベントの作成・編集・削除",
  },
  {
    title: "カフェレポ作成",
    href: "/admin/posts/create",
    icon: <PencilLine size={32} color="#16a34a" />,
    description: "新しいカフェレポートを投稿",
  },
  {
    title: "カフェレポ一覧",
    href: "/admin/cafes",
    icon: <FileText size={32} color="#7c3aed" />,
    description: "投稿済みのカフェレポートを管理",
  },
];

export default function AdminDashboard() {
  return (
    <div style={{ padding: "2rem", background: "#f9f9f9", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center", marginBottom: "2rem", color: "#333" }}>
        管理ダッシュボード
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1.5rem",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {adminLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "1.2rem",
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              transition: "all 0.2s ease-in-out",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = "0 6px 14px rgba(0,0,0,0.1)";
              e.currentTarget.style.backgroundColor = "#fefefe";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
              e.currentTarget.style.backgroundColor = "#fff";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              {link.icon}
              <h2 style={{ fontSize: "1.1rem", fontWeight: "bold", margin: 0 }}>{link.title}</h2>
            </div>
            <p style={{ fontSize: "0.9rem", color: "#666", marginLeft: "2.3rem" }}>{link.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}


