import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BackToAdmin() {
  return (
    <div className="mb-6">
      <Link href="/admin">
        <Button variant="outline" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          管理ダッシュボードへ戻る
        </Button>
      </Link>
    </div>
  );
}

