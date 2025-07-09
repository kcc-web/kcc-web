export default function Mita2025Page() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">三田祭 2025 特設ページ</h2>

      {/* メニュー */}
      <section>
        <h3 className="font-semibold">メニュー</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <li className="p-3 border rounded">
            <h4 className="font-medium">氷温アイスコーヒー</h4>
            <p>¥300</p>
          </li>
          <li className="p-3 border rounded">
            <h4 className="font-medium">ハンドドリップ（浅煎り）</h4>
            <p>¥200</p>
          </li>
        </ul>
      </section>

      {/* バリスタ紹介 */}
      <section>
        <h3 className="font-semibold">バリスタ紹介</h3>
        <ul className="flex gap-6">
          <li className="text-center">
            <img src="/barista1.jpg" alt="バリスタA" className="w-24 h-24 rounded-full mx-auto" />
            <p>バリスタA<br/><span className="text-sm">おすすめ豆：エチオピア</span></p>
          </li>
          <li className="text-center">
            <img src="/barista2.jpg" alt="バリスタB" className="w-24 h-24 rounded-full mx-auto" />
            <p>バリスタB<br/><span className="text-sm">おすすめ豆：コロンビア</span></p>
          </li>
        </ul>
      </section>

      {/* 出店情報 */}
      <section>
        <h3 className="font-semibold">出店情報</h3>
        <p>日時：11/3 10:00〜17:00</p>
        <iframe
          src="https://www.google.com/maps/embed?pb=..." 
          width="100%" height="240" allowFullScreen=""
          loading="lazy"
          className="border rounded"
        />
      </section>
    </div>
  );
}
