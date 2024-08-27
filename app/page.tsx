// app/page.tsx
import { unstable_cache } from 'next/cache'
import * as schema from "@/db/schema";
import { db } from "@/db/db";

const getMovies = unstable_cache(
  async () => {
    return await db.select().from(schema.movies)
  },
  ['movies'],
  { revalidate: 3600, tags: ['movies'] }
)
export default async function Home() {
  const movies = await getMovies();

  return (
    <div className='h-screen m-10'>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Home</h1>
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}
