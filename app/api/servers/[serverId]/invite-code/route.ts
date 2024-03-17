import { NextResponse } from "next/server";
import {currentProfile} from '@/lib/current-profile';
import { redirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";


export async function PATCH(req: Request, {params}: {params: {serverId: string} }) {

    try{
        const profile = await currentProfile();
        if(!profile) return redirectToSignIn();
        
        const server = await db.server.update({
            where:{
                id: params.serverId,
                profileId: profile.id
            }, 
            data:{
                inviteCode: uuidv4()
            }
        })

        return NextResponse.json(server);
        
    }catch(error){
        console.log("[INVITE-CODE_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }


}