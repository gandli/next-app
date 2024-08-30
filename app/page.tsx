// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <Link href="/visitor/form">添加访客</Link>
    </div>
  );
}
