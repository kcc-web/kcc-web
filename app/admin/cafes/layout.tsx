// app/cafes/layout.tsx

export default function CafeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#fefcf9] px-4 py-6">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#4B3F35]">KCC Cafe Reports</h1>
        <p className="text-sm text-gray-500 mt-1">#カフェ巡り の記録をお届けします</p>
      </header>
      <main className="max-w-6xl mx-auto">{children}</main>
    </div>
  );
}
