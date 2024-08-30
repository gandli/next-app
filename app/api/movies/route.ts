// app/api/movies/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { movies,moviesSchema } from "@/db/schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = moviesSchema.parse(body);

    await db.insert(movies).values(data).run();

    return NextResponse.json(
      { message: "Movie added successfully" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "未知错误" }, { status: 500 });
  }
}
