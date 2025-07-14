"use client";

import Link from "next/link";
import { Calendar, FileText, PencilLine } from "lucide-react";

const adminLinks = [
  {
    title: "イベント管理",
    href: "/admin/event",
    icon: <Calendar className="w-6 h-6 text-blue-600" />, 
    description: "イベントの作成・編集・削除",
  },
  {
    title: "カフェレポ作成",
    href: "/admin/posts/create",
    icon: <PencilLine className="w-6 h-6 text-green-600" />, 
    description: "新しいカフェレポートを投稿",
  },
  {
    title: "カフェレポ一覧",
    href: "/admin/posts/list",
    icon: <FileText className="w-6 h-6 text-purple-600" />, 
    description: "投稿済みのカフェレポートを管理",
  },
];

export default function AdminDashboard() {
  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">管理ダッシュボード</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {adminLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="border rounded-2xl p-6 hover:shadow-2xl transition-all duration-200 bg-white hover:bg-gray-50 group"
          >
            <div className="flex items-center mb-3 space-x-3">
              <div className="p-2 bg-gray-100 rounded-full group-hover:bg-gray-200">
                {link.icon}
              </div>
              <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">
                {link.title}
              </h2>
            </div>
            <p className="text-sm text-gray-600 group-hover:text-gray-800">{link.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
