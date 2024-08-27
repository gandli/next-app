# 如何使用 Next.js、Bun 和 Drizzle ORM 初始化项目

本文将指导您如何从零开始设置一个使用 Next.js、Bun 和 Drizzle ORM 的项目，适用于现代的全栈开发场景。

## 1. 安装 Bun

首先，您需要安装 [Bun](https://bun.sh/docs/installation)。这是一个速度极快的 JavaScript 运行时，可以通过以下命令进行全局安装：

```bash
npm install -g bun
```

## 2. 创建 Next.js 项目

使用 Bun 初始化一个新的 Next.js 项目：

```bash
bunx create-next-app@latest
```

这将创建一个全新的 Next.js 应用程序。

## 3. 安装 Drizzle ORM 及相关依赖

接下来，安装 Drizzle ORM 和相关的开发依赖：

```bash
bun add drizzle-orm
bun add -D drizzle-kit@0.22.8
bun add -D @types/bun
bun add -D better-sqlite3
```

## 4. 创建项目文件

在项目中创建以下文件，以配置数据库和迁移机制：

```typescript
// db/db.ts
import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";

const sqlite = new Database("./db/sqlite.db");
export const db = drizzle(sqlite);
```

```typescript
// db/migrate.ts
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";

const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite);
await migrate(db, { migrationsFolder: "./db/migrations" });
```

```typescript
// db/schema.ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const movies = sqliteTable("movies", {
   id: integer("id").primaryKey(),
   title: text("name"),
   releaseYear: integer("release_year"),
});
```

```typescript
// db/seed.ts
import { db } from "./db";
import * as schema from "./schema";

await db.insert(schema.movies).values([
 {
   title: "The Matrix",
   releaseYear: 1999,
 },
 {
   title: "The Matrix Reloaded",
   releaseYear: 2003,
 },
 {
   title: "The Matrix Revolutions",
   releaseYear: 2003,
 },
]);

console.log("Seeding complete.");
```

```typescript
// drizzle.config.ts
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    dialect: "sqlite",
    schema: "./db/schema.ts",
    out: "./db/drizzle",
    dbCredentials: {
        url: "file:./db/sqlite.db"
    }
});
```

```javascript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    // 自定义 Webpack 配置以解决 bun:sqlite 的问题
    webpack: (config) => {
        config.externals.push('bun:sqlite');
        return config;
    },
};

export default nextConfig;
```

## 5. 更新 tsconfig.json 配置

在 `tsconfig.json` 中添加以下字段，以确保 TypeScript 支持 Bun：

```json
{
  "compilerOptions": {
    "types": ["bun", "bun-types"],
    "target": "es2017",
    ...
  },
  ...
}
```

## 6. 修改 package.json 脚本

更新 `package.json` 中的 `scripts` 部分，以使用 Bun 运行 Next.js 和 Drizzle ORM：

```json
{
  ...
  "scripts": {
    "dev": "bun --bun run next dev",
    "build": "bun --bun run next build",
    "start": "bun --bun run next start",
    "lint": "bun --bun run next lint",
    "db:push": "drizzle-kit push"
  },
  ...
}
```

## 7. 创建页面组件

在 `app/page.tsx` 文件中查询并展示数据库中的数据：

```typescript
// app/page.tsx
import * as schema from "@/db/schema";
import { db } from "@/db/db";

export default async function Home() {
  const result = await db.select().from(schema.movies);

  return (
    <>
      <h1>Home</h1>
      <ul>
        {result.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </>
  );
}
```

## 8. 执行项目命令

按顺序执行以下命令，以初始化和启动项目：

```bash
# 应用数据库迁移
bun run db:push

# 运行种子数据脚本
bun run ./db/seed.ts

# 启动开发服务器
bun run dev
```

启动服务器后，您可以在浏览器中访问 `http://localhost:3000` 查看运行效果。