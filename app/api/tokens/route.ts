// app/api/tokens/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { generateToken, hashToken, previewToken } from "@/lib/utils";
import { email } from "zod";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { name } = await req.json().catch(() => ({ name: undefined }));
  const user=await prisma.user.findUnique({
    where:{
        email:session.user.email
    },
    select:{
        id:true
    }


  })
   if (!user) {
    return new Response("User not found", { status: 404 });
  }

  const token = generateToken();

  await prisma.apiToken.create({
    data: {
      userId:user.id,
      name,
      tokenHash: hashToken(token),
      tokenPreview: previewToken(token),
    },
  });

  // Return the raw token ONCE. It is never retrievable again.
  return Response.json({ token });
}


export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user=await prisma.user.findUnique({
    where:{
        email:session.user.email
    },
    select:{
        id:true

    }

  })
  if(!user)return new Response("User not found", { status: 404 });
  
  const tokens = await prisma.apiToken.findMany({
    where: { userId:user.id, revokedAt: null },
    select: { id: true, name: true, tokenPreview: true, createdAt: true, lastUsedAt: true },
    orderBy: { createdAt: "desc" },
  });

  return Response.json({ tokens });
}