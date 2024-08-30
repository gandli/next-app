// app/visitor/analytics/page.tsx
import { visitors } from "@/db/schema";
import { db } from "@/db/db";
import { Bar, BarChart } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

// 优化：添加数据加载状态
const chartConfig = {
  id: {
    label: "id",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export default async function AnalyticsPage() {
  const allVisitors = await db.select().from(visitors).all();
  console.log(allVisitors)
  // 优化：处理数据为空的情况
  if (!allVisitors.length) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">访客数据分析</h1>
        <p>没有可用的访客数据。</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">访客数据分析</h1>
      {/* <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={allVisitors}>
          <Bar dataKey="id" fill="var(--color-id)" radius={4} />
        </BarChart>
      </ChartContainer> */}
    </div>
  );
}
