'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import { useRouter } from "next/navigation";
import { useState } from "react"

import { Check, Copy, RefreshCw } from "lucide-react"

import axios from 'axios'
import { Label } from "../ui/label"
import { useModal } from "@/hooks/use-modal-store";
import { useOrigin } from "@/hooks/use-origin";


const InviteModal = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [copied, setCopied] = useState(false)

    const router = useRouter();
    const {isOpen, onClose, onOpen, type, data} = useModal();
    const {server} = data;

    const origin = useOrigin();
    const isModalOpen = isOpen && type === "invite";

    const handleClose = () => {
        onClose();
    }

    const inviteUrl = `${origin}/invite/${server?.inviteCode}`
    
    const onCopy = ()=>{
        navigator.clipboard.writeText(inviteUrl)
        setCopied(true)
        setTimeout(()=>{
            setCopied(false)
        }, 1000)
    }



    const onNew = async()=>{
        try{
            setIsLoading(true)
            const res = await axios.patch(`/api/servers/${server?.id}/invite-code`)
            // just for updating the data
            onOpen("invite", {server: res.data})
        }catch(error){
            console.log(error)
        }finally{
            setIsLoading(false)
        }
    }

    return (
    <Dialog open={isModalOpen} onOpenChange={handleClose} >
        <DialogContent className="bg-white text-black p-0">
            <DialogHeader className="pt-8 px-6">
                <DialogTitle className="text-2xl font-bold text-center">Invite Modal</DialogTitle>
            </DialogHeader>
            <div className="p-6">
                <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                    Server invite link
                </Label>
                <div className="flex items-center mt-2 gap-x-2">
                        <Input 
                        disabled={isLoading}
                        className="
                        border-0
                        focus-visible:ring-0
                        focus-visible:ring-offset-0
                        text-black
                        bg-zinc-300/50
                        " 
                        readOnly
                        value={inviteUrl} />
                        <Button 
                        onClick={onCopy}
                        size="icon">
                        {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                        </Button>
                    </div>
                    <Button 
                    onClick={onNew}
                    variant="link"
                    size="sm"
                    className="text-xs text-zinc-500 mt-4">
                        Generate a new link
                        <RefreshCw className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            
        </DialogContent>
    </Dialog>

  )
}

export default InviteModal