"use client";

import { cn } from "@/lib/utils";
import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import ActionTooltip from "../action-tooltip";
import React from "react";
import { ModalType, useModal } from "@/hooks/use-modal-store";


interface ServerChannelProps{
    channel: Channel,
    server: Server,
    role?: MemberRole
}

const iconMap = {
    [ChannelType.TEXT] : Hash,
    [ChannelType.AUDIO] : Mic,
    [ChannelType.VIDEO] : Video
}

const ServerChannel = ({
    channel,
    server,
    role
}: ServerChannelProps) => {

    const params = useParams();
    const router = useRouter();
    const {onOpen} = useModal();
    const Icon = iconMap[channel.type];

    const onClick = () =>{
        router.push(`/servers/${params?.serverId}/channels/${channel.id}`)
    }

    // this need to fix
    const onAction = (e: React.MouseEvent, action: ModalType) => {
        e.stopPropagation();
        onOpen(action, { server })
    }

    return  (<button 
            className={cn(`group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1`,
            params?.channelId === channel.id && "bg-zinc-700/20 dark:bg-zinc-700")}
            onClick={onClick}>
                <Icon className="flex-shrink-0 w-5 h-5 text-zinc-500" />
                <p className={cn(`line-clamp-1 
                font-semibold 
                text-sm 
                text-zinc-500 
                hover:text-zinc-600 
                dark:text-zinc-400 
                dark:hover:text-zinc-300 
                transition`,
                params?.channelId === channel.id && "text-primary dark:text-zinc-200 dark:group-hover:text-white")}>
                    {channel.name}
                </p>
                {
                    channel.name !== "general" && role !== MemberRole.GUEST && (
                        <div className="ml-auto flex items-center space-x-2">
                            <ActionTooltip
                            label="Edit">
                                <Edit 
                                className="
                                hidden
                                h-4 
                                w-4 
                                group-hover:block
                                text-zinc-500 
                                hover:text-zinc-600 
                                dark:text-zinc-400 
                                dark:hover:text-zinc-300 
                                trnasition" />
                            </ActionTooltip>
                            <ActionTooltip
                            label="Delete">
                                <Trash 
                                className="
                                hidden
                                h-4 
                                w-4 
                                group-hover:block
                                text-zinc-500 
                                hover:text-zinc-600 
                                dark:text-zinc-400 
                                dark:hover:text-zinc-300 
                                trnasition" />
                            </ActionTooltip>
                        </div>
                    )
                }
                {
                    channel.name === "general" && 
                    <Lock
                    className="
                    ml-auto
                    h-4 
                    w-4 
                    text-zinc-500
                    dark:text-zinc-400
                    "
                    />
                }
            </button>);
};

export default ServerChannel;
