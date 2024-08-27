// app/page.tsx

import * as schema from "@/db/schema";
import { db } from "@/db/db";

export default async function Home() {
  const result = await db.select().from(schema.movies);

  return (
    <>
      <h1>Home</h1>
      <ul>
        {result.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </>
  );
}
