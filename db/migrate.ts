// db\migrate.ts

import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";

const DB_PATH = "./db/sqlite.db";
const MIGRATIONS_FOLDER = "./db/migrations";

const sqlite = new Database(DB_PATH);
const db = drizzle(sqlite);

console.log("开始数据库迁移...");
await migrate(db, { migrationsFolder: MIGRATIONS_FOLDER });
console.log("数据库迁移完成。");