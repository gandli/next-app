// app/api/visitor/route.ts

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { visitors, visitorsSchema } from "@/db/schema";

// 定义 POST 请求处理函数
export async function POST(req: NextRequest) {
  try {
    // 解析请求体中的 JSON 数据
    const json = await req.json();

    // 使用 Zod 验证数据结构
    const result = visitorsSchema.safeParse(json);

    if (!result.success) {
      // 如果验证失败，返回 400 错误和错误信息
      return NextResponse.json(
        { error: "Invalid data", issues: result.error.format() },
        { status: 400 }
      );
    }

    // 插入数据到数据库
    const visitor = await db.insert(visitors).values(result.data).returning();

    // 返回成功响应和插入的数据
    return NextResponse.json({ success: true, visitor });
  } catch (error) {
    console.error("Error processing visitor form submission:", error);
    // 如果发生错误，返回 500 错误
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
