import React, { useEffect, useState } from "react";

type LeaderboardUser = {
  rank: number;
  id: string;
  name: string | null;
  Streak: number;
  totalMinutes: number;
};

function Leaderboard() {
  const [users, setUsers] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
    return <div>Loading...</div>;
  }

  return (
    <div>
      {users.map((user:any) => (
        <div className="flex gap-5" key={user.id}>
          <span>#{user.rank}</span>
          <span>{user.name}</span>
          <span>{user.Streak}</span>
          <span>{user.totalMinutes} min</span>
        </div>
      ))}
    </div>
  );
}

export default Leaderboard;