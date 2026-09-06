import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { hashToken } from "@/lib/utils";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    console.log("SESSION:", session);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
      },
    });

    console.log("USER:", user);

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const activities = await prisma.activity.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        startedAt: "desc",
      },
    });

    console.log("ACTIVITIES:", activities);

    return NextResponse.json(activities);
  } catch (error) {
    console.error("ACTIVITY_GET_ERROR:", error);

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

export async function POST(req: Request) {
  try {
    // -----------------------------------------
    // 1. Get Bearer token
    // -----------------------------------------

    const authHeader = req.headers.get("Authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          error: "Missing or invalid authorization header",
        },
        { status: 401 }
      );
    }

    // Remove "Bearer "
    const token = authHeader.substring(7);

    if (!token) {
      return NextResponse.json(
        {
          error: "Missing API token",
        },
        { status: 401 }
      );
    }

    console.log("🔑 API token received");

    // -----------------------------------------
    // 2. Hash token
    // -----------------------------------------

    const tokenHash = hashToken(token);

    // -----------------------------------------
    // 3. Find API token
    // -----------------------------------------

    const owner = await prisma.apiToken.findUnique({
      where: {
        tokenHash,
      },
    });

    if (!owner) {
      console.log("❌ Invalid API token");

      return NextResponse.json(
        {
          error: "Invalid API token",
        },
        { status: 401 }
      );
    }

    // -----------------------------------------
    // 4. Check revoked
    // -----------------------------------------

    
    console.log(
      "✅ Token belongs to user:",
      owner.userId
    );

    // -----------------------------------------
    // 5. Read activity
    // -----------------------------------------

    const data = await req.json();
    console.log(data)

    console.log(
      "📥 RECEIVED ACTIVITY:",
      data
    );

    // -----------------------------------------
    // 6. Create activity
    // -----------------------------------------

    const createdActivity =
      await prisma.activity.create({
        data: {
          userId: owner.userId,

          duration: data.duration,

          language: data.language ?? null,

          startedAt: new Date(
            data.startedAt
          ),

          endedAt: new Date(
            data.endedAt
          ),

          projectId:
            data.projectId ?? null,
        },
      });

    console.log(
      "✅ ACTIVITY CREATED:",
      createdActivity
    );

    // -----------------------------------------
    // 7. Update token last used
    // -----------------------------------------

    await prisma.apiToken.update({
      where: {
        id: owner.id,
      },

      data: {
        lastUsedAt: new Date(),
      },
    });

    // -----------------------------------------
    // 8. Return activity
    // -----------------------------------------

    return NextResponse.json(
      createdActivity,
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "❌ ACTIVITY_POST_ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : String(error),
      },
      {
        status: 500,
      }
    );
  }
}