// app/page.tsx
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import type { ComponentProps } from "react";
import MovieForm from "@/components/MovieForm";

const DynamicMovieForm = dynamic<ComponentProps<typeof MovieForm>>(
  () => import("@/components/MovieForm"),
  {
    loading: () => <MovieFormSkeleton />,
    ssr: false,
  }
);

function MovieFormSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-32 w-full" /> 
      <Skeleton className="h-10 w-1/4" />
    </div>
  );
}

export default function Home() {
  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">添加电影</h1>
      <Suspense fallback={<MovieFormSkeleton />}>
        <DynamicMovieForm />
      </Suspense>
    </div>
  );
}
