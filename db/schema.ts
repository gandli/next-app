// db/schema.ts

import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { z } from "zod";

// 定义数据库中的 movies 表
export const movies = sqliteTable("movies", {
    id: integer("id").primaryKey(),        // 自增的主键 ID
    title: text("name"),                   // 电影标题
    releaseYear: integer("release_year"),  // 电影的发行年份
});

// 定义与表结构对应的 Zod 验证架构
export const moviesSchema = z.object({
    title: z.string().min(1, "name is required"), // 确保 title 是非空字符串
    releaseYear: z.number().min(1888, "Release year must be a valid year after 1888"), // releaseYear 必须是 1888 年之后的有效年份
});

export type MovieFormValues = z.infer<typeof moviesSchema>;
