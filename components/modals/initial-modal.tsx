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
import { Input } from "@/components/ui/input"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

import * as z from "zod"
import {useForm} from 'react-hook-form' 
import { zodResolver } from "@hookform/resolvers/zod"

import axios from 'axios'
import FileUpload from "../file-upload"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Server name is required",
    }),
    imageUrl: z.string().min(2, {
        message: "Server image is required",
    }),
})


const InitialModal = () => {

    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();

    useEffect(()=>{
        setIsMounted(true)
    },[])

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        name: "",
        imageUrl: ""
        },
    })

    const isLoading = form.formState.isSubmitting

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try{
            await axios.post('/api/servers',values)
            form.reset()
            router.refresh()
            window.location.reload()
        }catch(error){
            console.log(error)
        }
        
    }

    if(!isMounted) return null

    return (
    <Dialog open >
        <DialogContent className="bg-white text-black p-0">
            <DialogHeader className="pt-8 px-6">
                <DialogTitle className="text-2xl font-bold text-center">Customize your server</DialogTitle>
                <DialogDescription className="text-zinc-500 text-sm text-center">
                    Give your server a personality with a name and an image. You can always cahnge it later.
                </DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="space-y-8 px-6">
                        <div className="flex items-center justify-center">
                            <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                <FormControl className="text-black">
                                    <FileUpload
                                    endPoint={"serverImage"}
                                    value={field.value}
                                    onChange={field.onChange}/>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        </div>
                        <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">Server Name</FormLabel>
                            <FormControl>
                                <Input 
                                placeholder="Enter server name" 
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

export default InitialModal