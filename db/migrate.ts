// db\migrate.ts
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";

// 定义数据库文件路径
const DB_PATH = "./db/sqlite.db";
// 定义迁移文件夹路径
const MIGRATIONS_FOLDER = "./db/migrations";

// 创建 SQLite 数据库连接
const sqlite = new Database(DB_PATH);
// 使用 drizzle 包装数据库连接
const db = drizzle(sqlite);

console.log("开始数据库迁移...");
// 执行数据库迁移
await migrate(db, { migrationsFolder: MIGRATIONS_FOLDER });
console.log("数据库迁移完成。");
