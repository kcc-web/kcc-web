// app/page.tsx
import Image from "next/image";

export default function HomePage() {
  return (
    <div>
      {/* Hero セクション */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "300px",
          borderRadius: "16px",
          overflow: "hidden",
          marginBottom: "2rem",
        }}
      >
        <Image
          src="/images/keio-coffee-stand.png"
          alt="Keio Coffee Club"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(91, 57, 34, 0.5)",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
            ようこそ、慶應珈琲倶楽部へ
          </h1>
          <p style={{ fontSize: "1rem" }}>コーヒーでつながる慶應コミュニティ</p>
        </div>
      </section>

      <p style={{ fontSize: "1.1rem", color:"var(--brand-brown)" }}>
        慶應珈琲倶楽部（KCC）は、コーヒー好きな学生が集まり、
        学内外でイベントやカフェ体験を楽しむサークルです。
      </p>
    </div>
  );
}









