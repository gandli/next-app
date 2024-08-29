// db\seed.ts

import { db } from "./db";
import { movies } from "./schema";

const seedData = [
  { title: "The Matrix", releaseYear: 1999 },
  { title: "The Matrix Reloaded", releaseYear: 2003 },
  { title: "The Matrix Revolutions", releaseYear: 2003 },
];

async function seed() {
  console.log("开始数据库种子填充...");
  try {
    await db.insert(movies).values(seedData);
    console.log("数据库种子填充完成。");
  } catch (error) {
    console.error("数据库种子填充失败:", error);
  }
}

seed();