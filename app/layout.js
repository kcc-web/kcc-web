// app/layout.js
import "./globals.css";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "KCC - 慶應珈琲倶楽部",
  description: "コーヒーを通じて、出会いと表現を。KCC公式サイト",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-gray-50 text-gray-800`}>
        {/* ヘッダー */}
        <header className="sticky top-0 bg-white shadow-md z-20">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            {/* ロゴとタイトル */}
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold">KCC</h1>
              <Image
                src="/images/keio-coffee-logo.png" 
                alt="KCC ロゴ"
                width={32}
                height={32}
                className="rounded-full"
              />
            </div>
            {/* ナビゲーション */}
            <nav className="flex gap-6">
              <Link href="/" className="hover:text-purple-600 transition">
                Home
              </Link>
              <Link href="/about" className="hover:text-purple-600 transition">
                About
              </Link>
              <Link href="/events" className="hover:text-purple-600 transition">
                Events
              </Link>
              <Link href="/cafes" className="hover:text-purple-600 transition">
                Cafes
              </Link>
              <Link href="/sns" className="hover:text-purple-600 transition">
                SNS
              </Link>
              <Link
                href="/mita2025"
                className="hover:text-purple-600 transition"
              >
                三田祭
              </Link>
            </nav>
          </div>
        </header>

        {/* メインコンテンツ */}
        <main className="container mx-auto px-6 py-12">{children}</main>

        {/* フッター */}
        <footer className="bg-white border-t">
          <div className="container mx-auto px-6 py-4 text-center text-sm text-gray-500">
            © 2025 Keio Coffee Club. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}


