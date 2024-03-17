'use client'

import { Plus } from "lucide-react";
import ActionTooltip from "../action-tooltip";
import { useModal } from "@/hooks/use-modal-store";


const NavigationAction =  () => {
    const {onOpen} = useModal();

    return (
        <div>
            <ActionTooltip 
            side="right"
            align="center"
            label="Add a server">
                <button 
                onClick={()=> onOpen('createServer')}
                className="group flex items-center">
                    <div className="
                    flex items-center justify-center
                    h-[48px] w-[48px] rounded-[24px]
                    bg-background dark:bg-neutral-700
                    group-hover:rounded-[16px] group-hover:bg-emerald-500
                    transition-all
                    mx-3
                    ">
                        <Plus size={25} className="group-hover:text-white transition text-emerald-500"/>
                    </div>
                </button>
            </ActionTooltip>
        </div>
    )
}

export default NavigationAction