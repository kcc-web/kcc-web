// app/admin/layout.tsx
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav className="flex gap-4 px-6 py-4 bg-gray-100 shadow-sm">
        <Link href="/admin/event" className="text-blue-600 hover:underline">イベント作成・編集</Link>
        <Link href="/admin/posts" className="text-blue-600 hover:underline">カフェレポ作成</Link>
        <Link href="/admin/cafes" className="text-blue-600 hover:underline">カフェレポ一覧</Link>
      </nav>
      <main className="p-6">{children}</main>
    </div>
  );
}
