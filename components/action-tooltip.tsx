'use client'

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface ActionTooltipProps{
    label: string,
    side?: "top" | "right" | "left" | "bottom" | undefined,
    align?: "start" | "center" | "end",
    children: React.ReactNode
}

const ActionTooltip: React.FC<ActionTooltipProps> = ({
    label, 
    side, 
    children,
    align
}) => {
    return (
    <TooltipProvider>
        <Tooltip delayDuration={50}>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent side={side} align={align}>
                <p className="text-sm font-semibold capitalize">{label}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>

  )
}

export default ActionTooltip