// app/page.js
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* ─── Hero セクション ─── */}
      <section 
      　className="
      　　relative w-full rounded-2xl overflow-hidden shadow-lg 
+         h-48 sm:h-64 md:h-80 lg:h-96
+       "
　　　　>
        <Image
          src="/images/keio-coffee-stand.png"  // public/images/keio-coffee-stand.png を指す
          alt="Keio Coffee Club"
          fill                                // コンテナいっぱいに拡大
          className="object-cover"
          priority
        />
        {/* キャッチコピーを重ねたい場合はコメントを外して調整 */}
        <div className="absolute inset-0 bg-black/25 flex flex-col items-center justify-center p-4">
+         <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-2">
+           ようこそ、慶應珈琲倶楽部へ
+         </h1>
+         <p className="text-sm sm:text-base md:text-lg text-white">
+           コーヒーでつながる慶應コミュニティ
+         </p>
+       </div>
      </section>
    </div>
  );
}






