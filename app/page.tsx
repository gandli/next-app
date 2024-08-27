// app/page.tsx
"use client";
import { MovieForm } from "@/components/MovieForm";
import { useRouter } from "next/navigation";  // 从 next/navigation 导入 useRouter
import { MovieFormValues } from "@/db/schema";  // 导入 MovieFormValues 类型

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
        console.log("Movie added successfully");
        router.push("/success");
      } else {
        console.error("Failed to add movie");
      }
    } catch (error) {
      console.error("Failed to add movie:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Add a Movie</h1>
      <MovieForm onSubmit={handleFormSubmit} />
    </div>
  );
}
