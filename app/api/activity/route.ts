// app/api/activity/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      userId,
      duration,
      language,
      startedAt,
      endedAt,
    } = body;

    const activity = await prisma.activity.create({
      data: {
        userId,
        duration,
        language,
        startedAt: new Date(startedAt),
        endedAt: new Date(endedAt),
      },
    });

    return NextResponse.json(activity);
  } catch (error) {
    console.error("ACTIVITY_ERROR:", error);

    return NextResponse.json(
      { error: "Failed to save activity" },
      { status: 500 }
    );
  }
}