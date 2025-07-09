export default function AboutPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">サークル紹介</h2>
      <p>
        慶應珈琲倶楽部（KCC）は、コーヒーを愛する慶應義塾大学生によるサークルです。<br/>
        ドリップ会・カフェ巡り・焙煎体験・三田祭の出店など、年間を通じて活動しています。
      </p>
      <h3 className="text-xl font-semibold">年間スケジュール</h3>
      <ul className="list-disc list-inside">
        <li>4～6月：新歓・ドリップ練習会</li>
        <li>7月：夏企画（BBQ×アイスコーヒー）</li>
        <li>9月：夏合宿・地方カフェ巡り</li>
        <li>11月：三田祭出店</li>
        <li>12～2月：オフシーズン勉強会</li>
      </ul>
    </div>
  );
}


