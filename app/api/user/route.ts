import{ authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

import { getServerSession } from "next-auth";


export async function POST(req:Request)
{
    try
    {
        const session=await getServerSession(authOptions)
      if (!session?.user?.email) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
    
  }
    const { name, email, image } = session.user;
    const user=await prisma.user.upsert({
        where:{
            email,

        },
        update:{
            name:name??""
            

        },
        create:{
            name:name??"",
            email,
           
        }
    })
     return Response.json(user, {
      status: 200,
    });



    }
    catch(error)
    {
        console.log(error)
        return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
    }
}
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return Response.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return Response.json(user);
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}