// app/visitor/analytics/page.tsx
"use client";

import { VisitorFormValues } from "@/db/schema"; // 使用你定义的访客数据类型
import { useEffect, useState, useMemo } from "react";
import { Bar, BarChart, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface VisitorsResponse {
  visitors: VisitorFormValues[];
}

const chartConfig = {
  count: {
    label: "来访人数",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export default function AnalyticsPage() {
  const [visitorsData, setVisitorsData] = useState<VisitorsResponse | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/visitor");
        if (!response.ok) {
          throw new Error("Failed to fetch visitors data");
        }
        const data: VisitorsResponse = await response.json();
        setVisitorsData(data);
      } catch (error) {
        console.error("Error fetching visitors data:", error);
      }
    }

    fetchData();
  }, []);

  const processedData = useMemo(() => {
    if (!visitorsData || !visitorsData.visitors) return [];

    // 在这里对 visitorsData.visitors 进行处理或汇总
    const dataByDate = visitorsData.visitors.reduce((acc, visitor) => {
      const date = new Date(visitor.dateTime).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date]++;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(dataByDate).map(([date, count]) => ({
      date,
      count,
    }));
  }, [visitorsData]);

  console.log(processedData);

  return (
    <div className="container mx-auto p-4">
      <h1>Visitor Analytics</h1>
      {processedData.length > 0 ? (
        <ChartContainer config={chartConfig}>
          <BarChart width={600} height={300} data={processedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<ChartTooltipContent />} />
            <Bar dataKey="count" fill={chartConfig.count.color} />
          </BarChart>
        </ChartContainer>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
