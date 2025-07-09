// app/page.js
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* ─── Hero セクション ─── */}
      <section className="relative h-96 w-full rounded-2xl overflow-hidden shadow-lg">
        <Image
          src="/images/keio-coffee-stand.png"  // public/images/keio-coffee-stand.png を指す
          alt="Keio Coffee Club"
          fill                                // コンテナいっぱいに拡大
          className="object-cover"
          priority
        />
        {/* キャッチコピーを重ねたい場合はコメントを外して調整 */}
        <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-5xl font-extrabold">
            Keio Coffee Club
          </h1>
        </div>
      </section>
    </div>
  );
}






