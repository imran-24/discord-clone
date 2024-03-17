import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";
import ServerHeader from "./server-header";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import ServerSection from "./server-section";
import ServerChannel from "./server-channel";
import { ServerMember } from "./server-member";

interface ServerSidebarProps{
    serverId: string
}

const ServerSidebar: React.FC<ServerSidebarProps> = async ({serverId}) => {
    const profile = await currentProfile();

    if(!profile) return redirectToSignIn();

    const server = await db.server.findUnique({
        where:{
            id: serverId,
            // members:{
            //     some:{
            //         profileId: profile.id
            //     }
            // }
        },
        include:{
            channels:{
                orderBy:{
                    createdAt: "asc"
                }
            },
            members:{
                include:{
                    profile: true
                },
                orderBy:{
                    role: "asc"
                }
            }
        },
    })

    if(!server) return redirect("/");

    const textChannels = server.channels.filter(channel => channel?.type === ChannelType.TEXT )
    const audioChannels = server.channels.filter(channel => channel?.type === ChannelType.AUDIO )
    const videoChannels = server.channels.filter(channel => channel?.type === ChannelType.VIDEO )
    const members = server.members.filter(member => member.profileId !== profile.id)

    const role = server.members.find(member => member.profileId === profile.id)?.role

    return (
        <div
            className="flex flex-col dark:bg-[#2B2D31] bg-[#F2F3F5] h-full">
            <ServerHeader 
            server={server}
            role={role}/>
            <ScrollArea className="flex-1 px-3">
                <div className="mt-2">
                </div>
                {/* <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2"  /> */}
                {
                    !!textChannels?.length 
                    && (
                        <div>
                            <ServerSection 
                            label="Text Channel"
                            sectionType="channels"
                            channelType={ChannelType.TEXT}
                            role={role}
                            />
                            <div className="space-y-[2px]">
                            {
                                textChannels.map(channel => (
                                    <ServerChannel
                                    channel={channel}
                                    server={server}
                                    key={channel.id}
                                    role={role}
                                    />
                                ))
                            }
                            </div>
                        </div>
                    )
                }
                {
                    !!audioChannels?.length &&
                    <div className="mb-2">
                        <ServerSection
                        label="Voice Channels"
                        sectionType="channels"
                        role={role}
                        channelType={ChannelType.AUDIO}
                        />
                        <div className="space-y-[2px]">
                        {
                            audioChannels.map(channel => (
                                <ServerChannel
                                channel={channel}
                                server={server}
                                key={channel.id}
                                role={role}
                                />
                            ))
                        }
                        </div>
                    </div>
                }
                {
                    !!videoChannels?.length &&
                    <div className="mb-2">
                        <ServerSection
                        label="Video Channels"
                        sectionType="channels"
                        role={role}
                        channelType={ChannelType.VIDEO}
                        />
                        <div className="space-y-[2px]">
                        {
                            videoChannels.map(channel => (
                                <ServerChannel
                                channel={channel}
                                server={server}
                                key={channel.id}
                                role={role}
                                />
                            ))
                        }
                        </div>
                    </div>
                }
                {
                    !!members?.length &&
                    <div className="mb-2">
                        <ServerSection
                        label="Manage members"
                        sectionType="members"
                        role={role}
                        />
                        <div className="space-y-[2px]">
                        {
                            members.map(member => (
                                <ServerMember
                                key={member?.id}
                                member={member}
                                server={server}
                                />
                            ))
                        }
                        </div>
                    </div>
                }
            </ScrollArea>
        </div>
    )
}

export default ServerSidebar