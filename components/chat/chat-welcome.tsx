'use client'

import { Hash } from "lucide-react"

interface ChatWelcomeProps{
    type: "channel" | "conversation",
    name: string
}
const ChatWelcome = ({
    type,
    name
}: ChatWelcomeProps) => {
  return (
    <div className="px-4 space-y-2 mb-4">
        {type === "channel" &&
        <div className="
        h-[75px] w-[75px]
        flex items-center justify-center rounded-full bg-zinc-500 dark:bg-zinc-700 
        ">
            <Hash className="text-white h-12 w-12" /> 
        </div>}
        <p className="text-xl md:text-3xl font-bold">
            {type === "channel" ? "Welcome to #" : ""}{name}
        </p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {type === "channel"
            ? `This is the start of the #${name} channel`
            : `This is the start of your conversation with ${name}`}
        </p>
    </div>
  )
}

export default ChatWelcome