import { db } from "./db";
import { movies, visitors } from "./schema";

// 电影种子数据
const movieSeedData = [
  { title: "The Matrix", releaseYear: 1999, poster: "/uploads/the-matrix.jpg" },
  {
    title: "The Matrix Reloaded",
    releaseYear: 2003,
    poster: "/uploads/the-matrix-reloaded.jpg",
  },
  {
    title: "The Matrix Revolutions",
    releaseYear: 2003,
    poster: "/uploads/the-matrix-revolutions.jpg",
  },
];

// 访客种子数据
const visitorSeedData = [
  {
    dateTime: "2024-08-30T10:00:00",
    visitorName: "张三",
    gender: "male",
    idCardNumber: "123456789012345678",
    contactInfo: "12345678901",
    visitReason: "业务洽谈",
    departureTime: "2024-08-30T12:00:00",
  },
  {
    dateTime: "2024-08-29T09:00:00",
    visitorName: "李四",
    gender: "female",
    idCardNumber: "234567890123456789",
    contactInfo: "23456789012",
    visitReason: "公司参观",
    departureTime: "2024-08-29T11:00:00",
  },
];

async function seed() {
  console.log("开始数据库种子填充...");
  try {
    // 插入电影数据
    await db.insert(movies).values(movieSeedData);
    console.log("电影数据种子填充完成。");

    // 插入访客数据
    await db.insert(visitors).values(visitorSeedData);
    console.log("访客数据种子填充完成。");
  } catch (error) {
    console.error("数据库种子填充失败:", error);
  }
}

seed();
