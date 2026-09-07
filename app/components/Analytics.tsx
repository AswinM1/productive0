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
        /*
         * API is assumed to return duration in seconds.
         * Convert seconds -> minutes here so the rest
         * of the page consistently works with minutes.
         */
        const convertedData: AnalyticsData[] = result.map(
          (item: { date: string; minutes: number }) => ({
            date: item.date,
            minutes: Math.round(item.minutes / 60),
          })
        );

        setData(convertedData);
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
   * Generate the last 365 days.
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
   * Heatmap intensity.
   */
  const getHeatmapClass = (minutes: number) => {
    if (minutes === 0) {
      return "bg-neutral-100";
    }

    if (minutes < 30) {
      return "bg-blue-200";
    }

    if (minutes < 60) {
      return "bg-blue-300";
    }

    if (minutes < 120) {
      return "bg-blue-500";
    }

    return "bg-blue-600";
  };

  return (
    <div className="flex flex-1 flex-col bg-white">
      <div className="@container/main flex flex-1 flex-col">
        <div className="flex flex-col gap-6 py-6">
          {/* =========================
              STAT CARDS
          ========================== */}

          <SectionCards />

          {/* =========================
              BAR CHART
          ========================== */}

          <div className="px-4 lg:px-6">
            <Card className="border-neutral-200 shadow-none">
              <CardHeader className="border-b border-neutral-100">
                <CardTitle className="text-base font-semibold">
                  Time tracked
                </CardTitle>

                <CardDescription>
                  Daily focus time
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-6">
                {loading ? (
                  <div className="flex h-[360px] items-center justify-center">
                    <p className="text-sm text-neutral-400">
                      Loading analytics...
                    </p>
                  </div>
                ) : data.length === 0 ? (
                  <div className="flex h-[360px] items-center justify-center">
                    <p className="text-sm text-neutral-400">
                      No focus activity yet.
                    </p>
                  </div>
                ) : (
                  <ChartContainer
                    config={chartConfig}
                    className="h-[360px] w-full"
                  >
                    <BarChart
                      data={data}
                      margin={{
                        left: 8,
                        right: 8,
                        top: 12,
                        bottom: 12,
                      }}
                    >
                      <CartesianGrid
                        vertical={false}
                        className="stroke-neutral-100"
                      />

                      <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={10}
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
                        className="text-xs"
                      />

                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={10}
                        tickFormatter={(value) => `${value}m`}
                        className="text-xs"
                      />

                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent />}
                      />

                      <Bar
                        dataKey="minutes"
                        fill="#3B60C5"
                        radius={3}
                        barSize={26}
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
            <Card className="border-neutral-200 shadow-none">
              <CardHeader className="border-b border-neutral-100">
                <CardTitle className="text-base font-semibold">
                  Focus activity
                </CardTitle>

                <CardDescription>
                  Your focus activity over the last year
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-6">
                <div className="w-full overflow-x-auto">
                  <div className="min-w-[850px]">
                    {/* Month labels */}
                    <div className="mb-3 ml-8 flex justify-between text-[11px] text-neutral-400">
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
                      <div className="flex w-6 flex-col justify-between py-0.5 text-[10px] text-neutral-400">
                        <span>Mon</span>
                        <span>Wed</span>
                        <span>Fri</span>
                      </div>

                      {/* Heatmap */}
                      <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
                        {heatmapDays.map((day) => (
                          <div
                            key={day.date}
                            title={`${day.date}: ${day.minutes} minutes`}
                            className={`h-3 w-3 rounded-[2px] ${getHeatmapClass(
                              day.minutes
                            )}`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="mt-5 flex items-center justify-end gap-1.5 text-[11px] text-neutral-400">
                      <span className="mr-1">Less</span>

                      <div className="h-3 w-3 rounded-[2px] bg-neutral-100" />
                      <div className="h-3 w-3 rounded-[2px] bg-blue-200" />
                      <div className="h-3 w-3 rounded-[2px] bg-blue-300" />
                      <div className="h-3 w-3 rounded-[2px] bg-blue-500" />
                      <div className="h-3 w-3 rounded-[2px] bg-blue-600" />

                      <span className="ml-1">More</span>
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