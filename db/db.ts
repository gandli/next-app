// db\db.ts

import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";

const DB_PATH = "./db/sqlite.db";

export const sqlite = new Database(DB_PATH);
export const db = drizzle(sqlite);