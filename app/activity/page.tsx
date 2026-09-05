"use client";

import { useEffect, useState } from "react";

type Activity = {
  id: string;
  duration: number;
  language: string | null;
  startedAt: string;
  endedAt: string;
  createdAt: string;
};

export default function ActivityPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getActivities() {
      try {
        const response = await fetch("/api/activity");

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to load activities");
        }

        setActivities(data);
      } catch (error) {
        console.error(error);

        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    }

    getActivities();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        Loading activities...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">
          Activity
        </h1>

        <p className="text-sm text-muted-foreground">
          Your VS Code coding activity
        </p>
      </div>

      <div className="rounded-xl border">
        <div className="grid grid-cols-4 border-b p-4 text-sm font-medium">
          <span>Language</span>
          <span>Duration</span>
          <span>Started</span>
          <span>Ended</span>
        </div>

        {activities.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No activity recorded yet.
          </div>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="grid grid-cols-4 border-b p-4 text-sm last:border-0"
            >
              <span>
                {activity.language || "Unknown"}
              </span>

              <span>
                {activity.duration} min
              </span>

              <span>
                {new Date(
                  activity.startedAt
                ).toLocaleString()}
              </span>

              <span>
                {new Date(
                  activity.endedAt
                ).toLocaleString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}