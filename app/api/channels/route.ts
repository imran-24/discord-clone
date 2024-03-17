import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try{
        const profile = await currentProfile();
        const { name, type } = await req.json();
        const {searchParams} = new URL(req.url);
        const serverId = searchParams.get("serverId");

        if (!profile) return new NextResponse("Unauthorized", { status: 401 });
        if (!serverId)
          return new NextResponse("Server id missing", { status: 400 });
        if (name === "general")
          return new NextResponse("Channel name can't be general", {
            status: 403,
        });

//      If I am adding new value that doesn't exist in that model table 
//      Then I am going to use update or else patch

        const server = await db.server.update({
            where:{
                id: serverId,
                members:{
                    // first checking if i am a member or not 
                    // then checking what's my role is 
                    some:{
                        profileId: profile.id,
                        role:{
                            in:[MemberRole.ADMIN, MemberRole.MODERATOR]
                        }
                    }
                }
            },
            data:{
                channels:{
                    create:{
                        name,
                        type,
                        profileId: profile.id
                    }
                }
            }
        })
        return NextResponse.json(server);
    }catch(error){
        console.log("[CHANNEL_CREATE_POST], error");
        return new NextResponse("Internal server", { status: 500 });
    }
}