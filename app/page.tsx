// app/page.tsx
import  MovieForm from "@/components/MovieForm";

export default function Home() {
  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">添加</h1>
        <MovieForm />
    </div>
  );
}
