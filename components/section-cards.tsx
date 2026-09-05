"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  TrendingUpIcon,
  FlameIcon,
} from "lucide-react";

type AnalyticsData = {
  date: string;
  minutes: number;
};

export function SectionCards() {
  const [data, setData] = useState<AnalyticsData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => res.json())
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

  const totalMinutes = data.reduce(
    (total, item) => total + item.minutes,
    0
  );

  const today = new Date().toISOString().split("T")[0];

  const todayMinutes =
    data.find((item) => item.date === today)?.minutes ?? 0;

  const averageMinutes =
    data.length > 0
      ? Math.round(totalMinutes / data.length)
      : 0;

  return (
    <div className="grid grid-cols-1 gap-4 px-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 lg:px-6">
      
      {/* Total Time */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Time</CardDescription>

          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {loading ? "..." : `${totalMinutes}m`}
          </CardTitle>

          <CardAction>
            <Badge variant="outline">
              <TrendingUpIcon />
              Focus
            </Badge>
          </CardAction>
        </CardHeader>

        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Total focus time
          </div>

          <div className="text-muted-foreground">
            All completed Pomodoros
          </div>
        </CardFooter>
      </Card>

      {/* Today's Time */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Today's Time</CardDescription>

          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {loading ? "..." : `${todayMinutes}m`}
          </CardTitle>

          <CardAction>
            <Badge variant="outline">
              Today
            </Badge>
          </CardAction>
        </CardHeader>

        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Focus today
          </div>

          <div className="text-muted-foreground">
            Completed focus sessions today
          </div>
        </CardFooter>
      </Card>

      {/* Average */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Average Time</CardDescription>

          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {loading ? "..." : `${averageMinutes}m`}
          </CardTitle>

          <CardAction>
            <Badge variant="outline">
              Average
            </Badge>
          </CardAction>
        </CardHeader>

        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Average daily focus
          </div>

          <div className="text-muted-foreground">
            Based on tracked days
          </div>
        </CardFooter>
      </Card>

      {/* Streak */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Current Streak</CardDescription>

          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {/* Get this from your User API */}
            0 days
          </CardTitle>

          <CardAction>
            <Badge variant="outline">
              <FlameIcon />
              Streak
            </Badge>
          </CardAction>
        </CardHeader>

        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Keep going!
          </div>

          <div className="text-muted-foreground">
            Consecutive days with completed sessions
          </div>
        </CardFooter>
      </Card>

    </div>
  );
}