"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import { SectionCards } from "@/components/section-cards";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type AnalyticsData = {
  date: string;
  minutes: number;
};

const chartConfig = {
  minutes: {
    label: "Focus time",
  },
} satisfies ChartConfig;

export default function Page() {
  const [data, setData] = useState<AnalyticsData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch analytics");
        }

        return res.json();
      })
      .then((result) => {
        setData(result);
      })
      .catch((error) => {
        console.error("Analytics error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  /*
   * Convert API data into:
   *
   * {
   *   "2026-09-05": 60,
   *   "2026-09-06": 120
   * }
   */
  const focusByDate = useMemo(() => {
    const result: Record<string, number> = {};

    data.forEach((item) => {
      result[item.date] = item.minutes;
    });

    return result;
  }, [data]);

  /*
   * Generate the last 365 days
   */
  const heatmapDays = useMemo(() => {
    const days: {
      date: string;
      minutes: number;
    }[] = [];

    const today = new Date();

    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);

      date.setDate(today.getDate() - i);

      const dateString = date.toISOString().split("T")[0];

      days.push({
        date: dateString,
        minutes: focusByDate[dateString] ?? 0,
      });
    }

    return days;
  }, [focusByDate]);

  /*
   * Determine heatmap intensity
   */
  const getHeatmapClass = (minutes: number) => {
    if (minutes === 0) {
      return "bg-muted";
    }

    if (minutes < 30) {
      return "bg-[#3B60C5] /25";
    }

    if (minutes < 60) {
      return "bg-[#3B60C5]/40";
    }

    if (minutes < 120) {
      return "bg-[#3B60C5] /60";
    }

    return "bg-[#3B60C5] ";
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

          {/* =========================
              STAT CARDS
          ========================== */}

          <SectionCards />

          {/* =========================
              BAR CHART
          ========================== */}

          <div className="px-4 lg:px-6">
            <Card>
              <CardHeader>
                <CardTitle>Time tracked</CardTitle>

                <CardDescription>
                  Daily focus time
                </CardDescription>
              </CardHeader>

              <CardContent>
                {loading ? (
                  <div className="flex h-[400px] items-center justify-center">
                    <p className="text-sm text-muted-foreground">
                      Loading analytics...
                    </p>
                  </div>
                ) : (
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

                          return date.toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                            }
                          );
                        }}
                      />

                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) =>
                          `${value}m`
                        }
                      />

                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent />}
                      />

                      <Bar
                        dataKey="minutes"
                        fill="#3B60C5"
                        radius={4}
                        barSize={30}
                      />
                    </BarChart>
                  </ChartContainer>
                )}
              </CardContent>
            </Card>
          </div>

          {/* =========================
              HEATMAP
          ========================== */}

          <div className="px-4 lg:px-6">
            <Card>
              <CardHeader>
                <CardTitle>Focus activity</CardTitle>

                <CardDescription>
                  Your focus activity over the last year
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="w-full overflow-x-auto">
                  <div className="min-w-[850px]">

                    {/* Month labels */}
                    <div className="mb-2 ml-8 flex justify-between text-xs text-muted-foreground">
                      <span>Jan</span>
                      <span>Feb</span>
                      <span>Mar</span>
                      <span>Apr</span>
                      <span>May</span>
                      <span>Jun</span>
                      <span>Jul</span>
                      <span>Aug</span>
                      <span>Sep</span>
                      <span>Oct</span>
                      <span>Nov</span>
                      <span>Dec</span>
                    </div>

                    <div className="flex gap-2">

                      {/* Weekday labels */}
                      <div className="flex w-6 flex-col justify-between py-1 text-[10px] text-muted-foreground">
                        <span>Mon</span>
                        <span>Wed</span>
                        <span>Fri</span>
                      </div>

                      {/* Heatmap */}
                      <div className="grid grid-flow-col grid-rows-7 gap-1">
                        {heatmapDays.map((day) => (
                          <div
                            key={day.date}
                            title={`${day.date}: ${day.minutes} minutes`}
                            className={`h-3 w-3 rounded-[3px] ${getHeatmapClass(
                              day.minutes
                            )}`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="mt-4 flex items-center justify-end gap-2 text-xs text-muted-foreground">
                      <span>Less</span>

                      <div className="h-3 w-3 rounded-[3px] bg-muted" />

                      <div className="h-3 w-3 rounded-[3px] bg-[#3B60C5]/20" />

                      <div className="h-3 w-3 rounded-[3px] bg-[#3B60C5]/40 " />

                      <div className="h-3 w-3 rounded-[3px] bg-[#3B60C5]/60 " />

                      <div className="h-3 w-3 rounded-[3px] bg-[#3B60C5]" />

                      <span>More</span>
                    </div>

                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}