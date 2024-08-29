// app/page.tsx
"use client";
import { MovieForm } from "@/components/MovieForm";
import { useRouter } from "next/navigation"; // 从 next/navigation 导入 useRouter
import { MovieFormValues } from "@/db/schema"; // 导入 MovieFormValues 类型

export default function Home() {
  const router = useRouter();

  const handleFormSubmit = async (data: MovieFormValues) => {
    try {
      const response = await fetch("/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("电影添加成功");
        router.push("/success");
      } else {
        console.error("添加电影失败");
      }
    } catch (error) {
      console.error("添加电影失败:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">添加电影</h1>
      <MovieForm onSubmit={handleFormSubmit} />
    </div>
  );
}
