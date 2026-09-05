"use client";

import React, { useEffect, useState } from "react";
import { Flame, Clock, Trophy } from "lucide-react";

type LeaderboardUser = {
  rank: number;
  id: string;
  name: string | null;
  Streak: number;
  totalMinutes: number;
};

function Leaderboard() {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getLeader() {
      try {
        const response = await fetch("/api/leaderboard");

        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard");
        }

        const data: LeaderboardUser[] = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Leaderboard error:", error);
      } finally {
        setLoading(false);
      }
    }

    getLeader();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
        Loading leaderboard...
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
            <Trophy className="size-5 text-primary" />
          </div>

          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              Leaderboard
            </h1>
            <p className="text-sm text-muted-foreground">
              See who's putting in the work.
            </p>
          </div>
        </div>
      </div>

      {/* Column labels */}
      <div className="mb-2 grid grid-cols-[50px_1fr_100px_110px] items-center gap-4 px-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        <span>Rank</span>
        <span>User</span>
        <span>Streak</span>
        <span>Duration</span>
      </div>

      {/* Users */}
      <div className="space-y-2">
        {users.map((user) => {
          const name = user.name || "Anonymous";
          const initials = name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

          return (
            <div
              key={user.id}
              className="grid grid-cols-[50px_1fr_100px_110px] items-center gap-4 rounded-xl border bg-card px-4 py-3 transition-colors hover:bg-accent/50"
            >
              {/* Rank */}
              <div className="flex items-center">
                {user.rank <= 3 ? (
                  <div
                    className={`flex size-8 items-center justify-center rounded-lg text-sm font-bold ${
                      user.rank === 1
                        ? "bg-yellow-500/15 text-yellow-600"
                        : user.rank === 2
                          ? "bg-slate-500/15 text-slate-500"
                          : "bg-orange-500/15 text-orange-600"
                    }`}
                  >
                    {user.rank}
                  </div>
                ) : (
                  <span className="pl-2 text-sm font-medium text-muted-foreground">
                    {user.rank}
                  </span>
                )}
              </div>

              {/* User */}
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                  {initials}
                </div>

                <span className="truncate text-sm font-medium">
                  {name}
                </span>
              </div>

              {/* Streak */}
              <div className="flex items-center gap-1.5 text-sm">
                <Flame className="size-4 text-orange-500" />
                <span className="font-medium">{user.Streak}</span>
              </div>

              {/* Study time */}
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="size-4" />
                <span>{user.totalMinutes} sec</span>
              </div>
            </div>
          );
        })}
      </div>

      {users.length === 0 && (
        <div className="rounded-xl border border-dashed py-12 text-center">
          <Trophy className="mx-auto mb-3 size-8 text-muted-foreground" />
          <p className="text-sm font-medium">No leaderboard data yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Start studying to get on the leaderboard.
          </p>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;

