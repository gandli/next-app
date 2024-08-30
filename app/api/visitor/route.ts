// app/api/visitor/route.ts

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { visitors, visitorsSchema } from "@/db/schema";
import { eq } from "drizzle-orm/expressions";

// POST: 创建新访客
export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const result = visitorsSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        { error: "无效数据", issues: result.error.format() },
        { status: 400 }
      );
    }

    const visitor = await db.insert(visitors).values(result.data).returning();

    return NextResponse.json({ success: true, visitor });
  } catch (error) {
    console.error("处理访客表单提交时出错:", error);
    return NextResponse.json({ error: "内部服务器错误" }, { status: 500 });
  }
}

// GET: 获取所有访客或通过ID获取单个访客
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      // 通过ID获取单个访客
      const visitor = await db
        .select()
        .from(visitors)
        .where(eq(visitors.id, Number(id)))
        .get();

      if (!visitor) {
        return NextResponse.json({ error: "访客未找到" }, { status: 404 });
      }

      return NextResponse.json({ success: true, visitor });
    } else {
      // 获取所有访客记录
      const allVisitors = await db.select().from(visitors).all();

      return NextResponse.json({ success: true, visitors: allVisitors });
    }
  } catch (error) {
    console.error("获取访客时出错:", error);
    return NextResponse.json({ error: "内部服务器错误" }, { status: 500 });
  }
}

// PUT: 通过ID更新访客
export async function PUT(req: NextRequest) {
  try {
    const json = await req.json();
    const { id, ...data } = json;

    if (!id) {
      return NextResponse.json({ error: "缺少访客ID" }, { status: 400 });
    }

    const result = visitorsSchema.safeParse(data);
    if (!result.success) {
      return NextResponse.json(
        { error: "无效数据", issues: result.error.format() },
        { status: 400 }
      );
    }

    const updatedVisitor = await db
      .update(visitors)
      .set(result.data)
      .where(eq(visitors.id, Number(id)))
      .returning();

    return NextResponse.json({ success: true, visitor: updatedVisitor });
  } catch (error) {
    console.error("更新访客时出错:", error);
    return NextResponse.json({ error: "内部服务器错误" }, { status: 500 });
  }
}

// DELETE: 通过ID删除访客
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "缺少访客ID" }, { status: 400 });
    }

    await db.delete(visitors).where(eq(visitors.id, Number(id)));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("删除访客时出错:", error);
    return NextResponse.json({ error: "内部服务器错误" }, { status: 500 });
  }
}
