import "./globals.css";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "KCC Web",
  description: "Keio Coffee Club 公式サイト",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        {/* ✅ これを追加 */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
       <header className="site-header">
          <div className="container" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>KCC</h1>
            <Image
              src="/images/keio-coffee-logo.png"
              alt="KCCロゴ"
              width={32}
              height={32}
            />
            <nav>
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/events">Events</Link>
              <Link href="/cafes">Cafes</Link>
              <Link href="/sns">SNS</Link>
              <Link href="/mita2025">三田祭</Link>
            </nav>
          </div>
        </header>

        <main className="site-main container">{children}</main>

         <footer className="site-footer">
          © 2025 Keio Coffee Club. All rights reserved.
        </footer>
      </body>
    </html>
  );
}











