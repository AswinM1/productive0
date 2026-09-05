import { prisma } from "@/lib/prisma"

export async function GET(req:Request)
{
    try
    {
        const data=await prisma.pomodoro.findMany({
            where:{
                completed:true
            },
            select:{
                duration:true,
                createdAt:true
            },
            orderBy:{
                createdAt:"asc"
            }
        })
        const map=new Map<String,number>()
        data.forEach((val)=>{
            const date=val.createdAt.toISOString().split("T")[0];
            map.set(date,(map.get(date)||0)+val.duration)

            
        })
        const res=Array.from(map.entries()).map(([date,minutes])=>
        ({date,minutes}))

        return Response.json(res)


    }
    catch(Error)
    {
        return Response.json(Error)
    }
}