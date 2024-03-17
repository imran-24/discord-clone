'use client'

import { useModal } from "@/hooks/use-modal-store"
import { ServerWithMembersWithProfile } from "@/types"
import { MemberRole } from "@prisma/client"
import { ChevronDown, PlusCircle, Settings, Trash, User, UserPlus, Users } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ServerheaderProps{
    server: ServerWithMembersWithProfile,
    role?: MemberRole
}
const ServerHeader = ({server, role}: ServerheaderProps) => {
    const isAdmin = role === MemberRole.ADMIN
    const isModerator = isAdmin || role === MemberRole.MODERATOR

    const {onOpen} = useModal();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
            className="focus-visible:outline-none"
            asChild>
                <button className="
                flex 
                items-center 
                h-12 
                w-full 
                px-3 
                font-semibold
                border-b-2
                border-neutral-200 
                dark:border-neutral-800 
                transition 
                hover:bg-zinc-700/10 
                dark:hover:bg-zinc-700/50
                ">
                    {server.name}
                    <ChevronDown className="h-5 w-5 ml-auto" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="
                w-56 text-xs font-medium text-primary space-y-[2px]
                ">
            {   isModerator && 
                <DropdownMenuItem 
                onClick={() => {onOpen("invite", {server})}}
                className="
                text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer
                ">
                    Invite People
                    <UserPlus className="h-5 w-5 ml-auto" />
                </DropdownMenuItem>
            }
            {
                isAdmin && 
                <DropdownMenuItem 
                className="px-3 py-2 text-sm cursor-pointer">
                    Server Settings
                    <Settings className="h-5 -w-5 ml-auto" />
                </DropdownMenuItem>
            }
            {
                isAdmin && 
                <DropdownMenuItem 
                className="px-3 py-2 text-sm cursor-pointer">
                    Manage Members
                    <Users className="h-5 -w-5 ml-auto" />
                </DropdownMenuItem>
            }
            {
                isModerator && 
                <DropdownMenuItem 
                onClick={()=> onOpen("createChannel", {server})}
                className="px-3 py-2 text-sm cursor-pointer">
                    Create Channel
                    <PlusCircle className="h-5 -w-5 ml-auto" />
                </DropdownMenuItem>
            }
            {
                isModerator && 
                <DropdownMenuSeparator />
            }
            {
                isAdmin && 
                <DropdownMenuItem 
                className="text-rose-500 px-3 py-2 text-sm cursor-pointer">
                    Delete Server
                    <Trash className="h-5 -w-5 ml-auto" />
                </DropdownMenuItem>
            }
            {
                !isAdmin && 
                <DropdownMenuItem 
                className="text-rose-500 px-3 py-2 text-sm cursor-pointer">
                    Leave Server
                    <Settings className="h-5 -w-5 ml-auto" />
                </DropdownMenuItem>
            }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ServerHeader