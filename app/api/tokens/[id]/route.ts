import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(
  req: Request,
  { params }: Context
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

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
        { error: "User not found" },
        { status: 404 }
      );
    }

    const token = await prisma.apiToken.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!token) {
      return Response.json(
        { error: "API key not found" },
        { status: 404 }
      );
    }

    await prisma.apiToken.delete({
      where: {
        id: token.id,
      },
    });

    return Response.json({
      success: true,
      message: "API key deleted",
    });
  } catch (error) {
    console.error("DELETE_TOKEN_ERROR:", error);

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