// db\db.ts

import { drizzle } from "drizzle-orm/bun-sqlite"; // 导入 drizzle ORM
import { Database } from "bun:sqlite"; // 导入 SQLite 数据库模块

// 定义数据库文件的路径
const DB_PATH = "./db/sqlite.db";

// 创建一个新的 SQLite 数据库实例
export const sqlite = new Database(DB_PATH);
// 使用 drizzle 包装数据库实例以提供 ORM 功能
export const db = drizzle(sqlite);