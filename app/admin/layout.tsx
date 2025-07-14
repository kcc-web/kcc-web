export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <main className="max-w-5xl mx-auto p-6">{children}</main>
    </div>
  );
}

