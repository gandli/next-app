"use server";

import { MovieFormValues } from "@/db/schema";
import { db } from "@/db/db";
import { movies } from "@/db/schema";

export async function addMovie(data: MovieFormValues) {
  try {
    await db.insert(movies).values(data).run();
    return { success: true, message: "电影添加成功" };
  } catch (error) {
    console.error("添加电影失败:", error);
    return { success: false, message: "添加电影失败" };
  }
}