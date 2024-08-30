// db\schema.ts

import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { z } from "zod";

// 定义数据库中的 movies 表
export const movies = sqliteTable("movies", {
  id: integer("id").primaryKey({ autoIncrement: true }), // 自增的主键 ID
  title: text("title").notNull(), // 标题
  releaseYear: integer("release_year").notNull(), // 的发行年份
});

//定义与表结构对应的 Zod 验证架构
export const moviesSchema = z.object({
  title: z.string().min(1, "标题不能为空"), // 确保 title 是非空字符串
  releaseYear: z.number().int().min(1888, "发行年份必须是1888年之后的有效年份"), // releaseYear 必须是 1888 年之后的有效年份
});

// 从验证架构中推断出表单值的类型
export type MovieFormValues = z.infer<typeof moviesSchema>;

// 定义数据库中的 visitors 表
export const visitors = sqliteTable("visitors", {
  id: integer("id").primaryKey({ autoIncrement: true }), // 自增的主键 ID
  dateTime: text("date_time").notNull(), // 日期时间
  visitorName: text("visitor_name").notNull(), // 访客姓名
  gender: text("gender").notNull(), // 性别
  idCardNumber: text("id_card_number").notNull(), // 身份证号码
  contactInfo: text("contact_info").notNull(), // 联系方式
  visitReason: text("visit_reason").notNull(), // 来访事由
  departureTime: text("departure_time").notNull(), // 离开时间
});

// 定义与 visitors 表结构对应的 Zod 验证架构
export const visitorsSchema = z.object({
  dateTime: z.string().min(1, "请填写日期时间"),
  visitorName: z.string().min(1, "请填写访客姓名"),
  gender: z.enum(["男性", "女性"]),
  idCardNumber: z.string().regex(/^\d{15}|\d{18}$/, "身份证号码格式不正确"),
  contactInfo: z.string().min(1, "请填写联系方式"),
  visitReason: z.string().min(1, "请填写来访事由"),
  departureTime: z.string().min(1, "请填写离开时间"),
});

// 从验证架构中推断出访客登记表单值的类型
export type VisitorFormValues = z.infer<typeof visitorsSchema>;
