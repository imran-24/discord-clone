'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

import { useRouter, useParams } from "next/navigation";
import qs from 'query-string'

import * as z from "zod"
import {useForm} from 'react-hook-form' 
import { zodResolver } from "@hookform/resolvers/zod"

import axios from 'axios'
import { useModal } from "../../hooks/use-modal-store"
import { ChannelType } from "@prisma/client"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Server name is required",
    }).refine(name => name !== "general",{
        message: "Channel name can't be 'general'"
    }),
    type: z.nativeEnum(ChannelType)
})


const CreateChannelModal = () => {
    const {isOpen, onClose, type} = useModal();
    const router = useRouter();
    const params = useParams();
    const isModalOpen = isOpen && type === "createChannel";

    const handleClose = () => {
        form.reset();
        onClose();
    }

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        name: "",
        type: ChannelType.TEXT
        },
    })

    const isLoading = form.formState.isSubmitting

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try{
            // this is for passing the serverId
            const url = qs.stringifyUrl({
                url: `/api/channels`,
                query:{
                    serverId: params.serverId
                }
            })
            await axios.post(url ,values)
            form.reset()
            router.refresh()
            onClose();
        }catch(error){
            console.log(error)
        }
        
    }

    return (
    <Dialog open={isModalOpen} onOpenChange={handleClose} >
        <DialogContent className="bg-white text-black p-0">
            <DialogHeader className="pt-8 px-6">
                <DialogTitle className="text-2xl font-bold text-center">Create Channel</DialogTitle>
            </DialogHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="space-y-8 px-6">
                        <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">Channel Name</FormLabel>
                            <FormControl>
                                <Input 
                                placeholder="Enter channel name" 
                                className="
                                bg-zinc-300/50
                                placeholder:font-medium
                                border-0
                                font-semibold
                                focus:ring-0 
                                text-black
                                focus-visible:ring-offset-0
                                " {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">Channel Type</FormLabel>
                                    
                                    <Select 
                                    disabled={isLoading}
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}>
                                    <FormControl >
                                        <SelectTrigger className=" bg-zinc-300/50
                                        border-0
                                        font-semibold
                                        outline-none
                                        capitalize
                                        ring-offset-0
                                        focus-visible:border-0
                                        focus-visible:outline-none
                                        focus-visible:ring-0 text-black
                                        focus-visible:ring-offset-0">
                                            <SelectValue placeholder="Select a channel type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        
                                    {
                                        Object.values(ChannelType).map(type =>(
                                            <SelectItem 
                                            key={type} 
                                            value={type}
                                            className="capitalize">
                                                {type.toLowerCase()}
                                            </SelectItem>
                                        ))
                                    }   
                                        
                                    </SelectContent>
                                    
                                    </Select>
                                    
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                    </div>
                    <DialogFooter className="bg-gray-100 rounded px-6 py-4">
                        <Button type="submit" variant='primary'>Create</Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    </Dialog>

  )
}

export default CreateChannelModal