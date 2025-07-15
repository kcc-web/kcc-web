"use client";

import "./globals.css";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
      <body className={`${inter.className} relative text-gray-800 overflow-x-hidden`}>
        {/* 背景画像 */}
        <div className="absolute inset-0 -z-10 bg-[url('/images/bg-coffee.png')] bg-cover bg-center"></div>

        {/* ヘッダー */}
        <header className="relative z-[100] bg-white shadow-md border">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 py-4 flex items-center justify-between">
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
            <button
              className="sm:hidden p-2"
              onClick={() => setOpen((o) => !o)}
              aria-label="メニューを開く"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
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
        <main className="relative z-10 container mx-auto ...">
          {children}
        </main>

        {/* フッター */}
        <footer className="relative z-40 bg-white/80 backdrop-blur border-t mt-12">
          <div className="container mx-auto px-4 sm:px-6 py-4 text-center text-sm text-gray-500">
            © 2025 Keio Coffee Club. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}




