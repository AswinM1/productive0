"use client";

import React, { useEffect, useState } from "react";
import { Flame, Clock, Trophy } from "lucide-react";

type LeaderboardUser = {
  rank: number;
  id: string;
  name: string | null;
  language:string|null
  Streak: number;
  totalMinutes: number;
};

function formatDuration(value: number) {
  const hours = Math.floor(value / 3600);
  const minutes = Math.floor((value % 3600) / 60);
  const seconds = value % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }

  return `${seconds}s`;
}

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
      <div className="flex min-h-[300px] items-center justify-center text-sm text-neutral-400">
        Loading leaderboard...
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-md bg-neutral-900 text-white">
            <Trophy className="size-4" />
          </div>

          <div>
            <h1 className="text-xl font-semibold tracking-tight text-neutral-900">
              Leaderboard
            </h1>

            <p className="mt-0.5 text-sm text-neutral-500">
              See who's putting in the work.
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      {users.length > 0 && (
        <div className="overflow-hidden rounded-md  border-neutral-200 bg-white">
          {/* Table header */}
         <div className="grid grid-cols-[70px_1fr_120px_100px_130px] items-center border-b border-neutral-200 bg-neutral-50 px-5 py-3 text-[11px] font-medium uppercase tracking-wider text-neutral-400">
  <span>Rank</span>
  <span>User</span>
  <span>Language</span>
  <span>Streak</span>
  <span>Focus time</span>
</div>

          {/* Users */}
          <div>
            {users.map((user, index) => {
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
                  className={`
                    grid
                    grid-cols-[60px_1fr_120px_130px]
                    items-center
                    gap-4
                    px-5
                    py-4
                    ${
                      index !== users.length - 1
                        ? "border-b border-neutral-100"
                        : ""
                    }
                    hover:bg-neutral-50
                  `}
                >
                  {/* Rank */}
                  <div className="flex items-center">
                    {user.rank <= 3 ? (
                      <span
                        className={`
                          flex size-7 items-center justify-center
                          rounded-md
                          text-xs
                          font-semibold
                          ${
                            user.rank === 1
                              ? "bg-neutral-900 text-white"
                              : "bg-neutral-100 text-neutral-600"
                          }
                        `}
                      >
                        {user.rank}
                      </span>
                    ) : (
                      <span className="pl-2 text-sm text-neutral-400">
                        {user.rank}
                      </span>
                    )}
                  </div>

                  {/* User */}
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-[11px] font-medium text-neutral-600">
                      {initials}
                    </div>

                    <span className="truncate text-sm font-medium text-neutral-800">
                      {name}
                    </span>
                  </div>

                  {/* Streak */}
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <Flame className="size-4 text-orange-500" />

                    <span>{user.Streak} days</span>
                  </div>

                  {/* Focus time */}
                  <div className="flex items-center gap-2 text-sm text-neutral-500">
                    <Clock className="size-4" />

                    <span>
                      {formatDuration(user.totalMinutes)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty state */}
      {users.length === 0 && (
        <div className="rounded-md border border-dashed border-neutral-200 bg-white py-16 text-center">
          <Trophy className="mx-auto mb-3 size-7 text-neutral-300" />

          <p className="text-sm font-medium text-neutral-700">
            No leaderboard data yet
          </p>

          <p className="mt-1 text-sm text-neutral-400">
            Start studying to get on the leaderboard.
          </p>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;