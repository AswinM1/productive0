import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import {
  generateToken,
  hashToken,
  previewToken,
} from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return Response.json(
        {
          error: "Unauthorized: no logged-in user",
        },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => ({}));

    const name = body.name ?? "VS Code";

    console.log("User email:", session.user.email);

    // Find the actual Prisma User
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        email: true,
      },
    });

    console.log("Database user:", user);

    if (!user) {
      return Response.json(
        {
          error: "User not found in database",
          email: session.user.email,
        },
        { status: 404 }
      );
    }

    // Generate raw token
    const token = generateToken();

    console.log("Generated token successfully");

    // Create token in database
    const apiToken = await prisma.apiToken.create({
      data: {
        userId: user.id,
        tokenHash: hashToken(token),
        tokenPreview: previewToken(token),
      },
    });

    console.log("Token created:", apiToken.id);

    // Return raw token ONLY ONCE
    return Response.json({
      token,
    });
  } catch (error) {
    console.error("================================");
    console.error("TOKEN_ERROR");
    console.error("================================");
    console.error(error);

    if (error instanceof Error) {
      console.error("MESSAGE:", error.message);
      console.error("STACK:", error.stack);
    }

    return Response.json(
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

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return Response.json(
        {
          error: "Unauthorized: no logged-in user",
        },
        { status: 401 }
      );
    }

    console.log("GET token request from:", session.user.email);

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return Response.json(
        {
          error: "User not found in database",
        },
        { status: 404 }
      );
    }

    const tokens = await prisma.apiToken.findMany({
      where: {
        userId: user.id,
        revokedAt: null,
      },
      select: {
        id: true,
        name: true,
        tokenPreview: true,
        createdAt: true,
        lastUsedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json({
      tokens,
    });
  } catch (error) {
    console.error("================================");
    console.error("GET_TOKEN_ERROR");
    console.error("================================");
    console.error(error);

    if (error instanceof Error) {
      console.error("MESSAGE:", error.message);
      console.error("STACK:", error.stack);
    }

    return Response.json(
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