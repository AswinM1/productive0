import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        Streak:true,
        pomodoros: {
          where: {
            completed: true,
          },
          select: {
            duration: true,
          },
        },
      },
    });

    const leaderboard = users.map((user) => ({
        id: user.id,
        name: user.name,
        Streak:user.Streak,
        totalMinutes: user.pomodoros.reduce(
          (total, pomodoro) => total + pomodoro.duration,
          0
        ),
      }))
      .sort((a, b) => b.totalMinutes - a.totalMinutes)
      .map((user, index) => ({
        rank: index + 1,
        ...user,
      }));

    return NextResponse.json(leaderboard);
    console.log(leaderboard)
  } catch (error) {
    console.error("LEADERBOARD_ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}