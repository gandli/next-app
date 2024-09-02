"use client";

import * as React from "react";
import { VisitorFormValues } from "@/db/schema"; // 使用你定义的访客数据类型
import { useEffect, useState, useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface VisitorsResponse {
  visitors: VisitorFormValues[];
}

interface ChartData {
  date: string;
  [key: string]: number;
}

const chartConfig = {
  证件: {
    label: "证件",
    color: "hsl(var(--chart-1))",
  },
  案件: {
    label: "案件",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function AnalyticsPage() {
  const [visitors, setVisitors] = useState<VisitorFormValues[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("证件");

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const response = await fetch("/api/visitor");
        const data: VisitorsResponse = await response.json();
        setVisitors(data.visitors);
      } catch (error) {
        console.error("Error fetching visitors:", error);
      }
    };

    fetchVisitors();
  }, []);

  useEffect(() => {
    if (visitors.length > 0) {
      const processedData = visitors.reduce((acc, visitor) => {
        const date = new Date(visitor.dateTime).toLocaleDateString();
        const reason = visitor.visitReason;

        if (!acc[date]) {
          acc[date] = { date, 证件: 0, 案件: 0 };
        }
        acc[date][reason] = (acc[date][reason] || 0) + 1; 
        return acc;
      }, {} as Record<string, ChartData>);

      // 按日期升序排序
      const sortedData = Object.values(processedData).sort((a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      setChartData(sortedData);
    }
  }, [visitors]);

  const total = useMemo(() => {
    return chartData.reduce(
      (acc, data) => {
        acc["证件"] += data["证件"];
        acc["案件"] += data["案件"];
        return acc;
      },
      { 证件: 0, 案件: 0 }
    );
  }, [chartData]);

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <CardTitle>访客分析</CardTitle>
            <CardDescription>
              显示最近 全年 访客总数
            </CardDescription>
          </div>
          <div className="flex">
            {["证件", "案件"].map((key) => {
              const chart = key as keyof typeof chartConfig;
              return (
                <button
                  key={chart}
                  data-active={activeChart === chart}
                  className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                  onClick={() => setActiveChart(chart)}
                >
                  <span className="text-xs text-muted-foreground">
                    {chartConfig[chart].label}
                  </span>
                  <span className="text-lg font-bold leading-none sm:text-3xl">
                    {total[key].toLocaleString()}
                  </span>
                </button>
              );
            })}
          </div>
        </CardHeader>
        <CardContent className="px-2 sm:p-6">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("zh-CN", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <Tooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="views"
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("zh-CN", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      });
                    }}
                  />
                }
              />
              <Bar dataKey={activeChart} fill={chartConfig[activeChart].color} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
