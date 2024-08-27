// app/page.tsx
import { unstable_cache } from 'next/cache'
import * as schema from "@/db/schema";
import { db } from "@/db/db";

const getMovies = unstable_cache(
  async () => {
    return await db.select().from(schema.movies)
  },
  ['movies'],
  { revalidate: 1, tags: ['movies'] }
)
export default async function Home() {
  const movies = await getMovies();

  return (
    <div className='h-screen m-10'>
      <h1>Home</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}
