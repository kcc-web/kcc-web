export default function CafesPage() {
  // これも仮データ。後で外部データに置き換えます。
  const cafes = [
    { id: 1, name: "Nozy Coffee", tag: "浅煎り", review: "豆の香りが豊か！" },
    { id: 2, name: "珈琲屋うず", tag: "深煎り", review: "濃厚なチョコのような味わい。" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">カフェレポート</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cafes.map(cafe => (
          <li key={cafe.id} className="p-4 border rounded">
            <h3 className="text-xl font-semibold">{cafe.name}</h3>
            <p className="text-sm text-gray-500">タグ：{cafe.tag}</p>
            <p className="mt-2">{cafe.review}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
