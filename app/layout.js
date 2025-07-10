"use client";

import "./globals.css";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Events", href: "/events" },
    { label: "Cafes", href: "/cafes" },
    { label: "SNS", href: "/sns" },
    { label: "三田祭", href: "/mita2025" },
  ];

  return (
    <html lang="ja">
      <body
        className={`${inter.className} bg-gray-50 text-gray-800 overflow-x-hidden`}
      >
        {/* ヘッダー */}
        <header className="sticky top-0 bg-white shadow-md z-30">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 py-4 flex items-center justify-between">
            {/* ロゴ */}
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold">KCC</h1>
              <Image
                src="/images/keio-coffee-logo.png"   // ← ここを本物のロゴPNGに！
                alt="KCC ロゴ"
                width={32}
                height={32}
                className="rounded-full"
              />
            </div>

            {/* デスクトップ用ナビ（幅640px以上） */}
            <nav className="hidden sm:flex gap-6">
              {links.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="hover:text-purple-600 transition"
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* モバイル用ハンバーガー（幅640px未満） */}
            <button
              className="sm:hidden p-2"
              onClick={() => setOpen((o) => !o)}
              aria-label="メニューを開く"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* モバイルドロワー */}
          {open && (
            <div className="sm:hidden bg-white border-t shadow-inner">
              {links.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="block px-6 py-3 hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* メイン */}
        <main className="container mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12">
          {children}
        </main>

        {/* フッター */}
        <footer className="bg-white border-t">
          <div className="container mx-auto px-4 sm:px-6 py-4 text-center text-sm text-gray-500">
            © 2025 Keio Coffee Club. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}


