import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    console.log("SESSION:", session);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { duration } = await req.json();

    console.log("DURATION:", duration);

    if (!duration || duration <= 0) {
      return NextResponse.json(
        { error: "Invalid duration" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    console.log("USER:", user);

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    console.log("USER ID:", user.id);

    const pomodoro = await prisma.pomodoro.create({
      data: {
        userId: user.id,
        duration: Number(duration),
        completed: true,
      },
    });

    console.log("POMODORO CREATED:", pomodoro);

    return NextResponse.json(pomodoro, {
      status: 201,
    });
  } catch (error) {
    console.error("========== POMODORO ERROR ==========");
    console.error(error);
    console.error("====================================");

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : String(error),
      },
      { status: 500 }
    );
  }
}