import ChatHeader from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { MediaRoom } from "@/components/media-room";
import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";


interface ChannelIdPageProps{
    params:{
        channelId: string,
        serverId: string
    }
}

const ChannelIdPage = async ({params}: ChannelIdPageProps) => {
    const profile = await currentProfile();
    if(!profile) return redirectToSignIn();

    // we are just checking 3 things
    //1. checcking if there is any currentUser
    //2. channel exists for the given channelId
    //3. are we member of the server which has the channel in it

    const channel = await db.channel.findUnique({
        where:{
            id: params.channelId
        }
    })

    const member = await db.member.findFirst({
        where:{
            serverId: params.serverId,
            profileId: profile.id
        }
    })

    if(!channel || !member){
        redirect('/')
    }

    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader 
            serverId={params.serverId}
            name={channel.name}
            type="channel"
            />
            { channel.type === ChannelType.TEXT &&
            (<>
                <ChatMessages 
                apiUrl="/api/messages"
                chatId={channel.id}   
                member={member}
                name={channel.name}
                paramKey="channelId"
                paramValue={channel.id}
                socketUrl="/api/socket/messages"
                socketQuery={{
                    channelId: channel.id,
                    serverId: channel.serverId
                }}
                type="channel"
                />
                <ChatInput
                name={channel.name}
                type="channel"
                apiUrl="/api/socket/messages"
                query={{
                channelId: channel.id,
                serverId: channel.serverId,
                }}
                />
            </>)}
            {
                channel.type === ChannelType.AUDIO && (
                    <MediaRoom 
                        audio={true}
                        chatId={channel.id}
                        video={false}
                    />
                )
            }
            {
                channel.type === ChannelType.VIDEO && (
                    <MediaRoom 
                        audio={false}
                        chatId={channel.id}
                        video={true}
                    />
                )
            }
        </div>
    )
}

export default ChannelIdPage