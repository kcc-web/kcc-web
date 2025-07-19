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
        <header style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>KCC</h1>
            <Image
              src="/images/keio-coffee-logo.png"
              alt="KCCロゴ"
              width={32}
              height={32}
            />
            <nav style={{ marginLeft: "auto", display: "flex", gap: "1rem" }}>
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/events">Events</Link>
              <Link href="/cafes">Cafes</Link>
              <Link href="/sns">SNS</Link>
              <Link href="/mita2025">三田祭</Link>
            </nav>
          </div>
        </header>

        <main style={{ padding: "2rem", maxWidth: "960px", margin: "0 auto" }}>
          {children}
        </main>

        <footer
          style={{
            textAlign: "center",
            padding: "1rem",
            fontSize: "0.8rem",
            color: "#888",
          }}
        >
          © 2025 Keio Coffee Club. All rights reserved.
        </footer>
      </body>
    </html>
  );
}











