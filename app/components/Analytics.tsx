"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

type AnalyticsData = {
  date: string;
  minutes: number;
};

const chartConfig = {
  minutes: {
    label: "Focus time",
  },
} satisfies ChartConfig;

export default function Analytics() {
  const [data, setData] = useState<AnalyticsData[]>([]);

  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="w-full">
      <ChartContainer
        config={chartConfig}
        className="h-[400px] w-full"
      >
        <BarChart
          data={data}
          margin={{
            left: 12,
            right: 12,
            top: 12,
            bottom: 12,
          }}
        >
          <CartesianGrid vertical={false} />

          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => {
              const date = new Date(value);

              return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
            }}
          />
          <YAxis
            dataKey="minutes"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value:any) => {
              const date = new Date(value);

              return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
            }}
          />

          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent />}
          />

          <Bar
            dataKey="minutes"
            radius={4}
            barSize={30}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}