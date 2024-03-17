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

import qs from 'query-string';
import axios from 'axios'
import FileUpload from "../file-upload"
import { useModal } from "@/hooks/use-modal-store"

const formSchema = z.object({
    fileUrl: z.string().min(2, {
        message: "Attachment is required",
    }),
})


const MessageFileModal = () => {
    const {isOpen, onClose, type, data} = useModal();
    const {apiUrl, query} = data;
    const router = useRouter();

    const isModalOpen = isOpen && type === "messageFile";

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        fileUrl: ""
        },
    })

    const isLoading = form.formState.isSubmitting

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try{
            const url = qs.stringifyUrl({
                url: apiUrl || "",
                query,
            })
            await axios.post(url, {
                ...values,
                content: values.fileUrl})
            form.reset()
            router.refresh()
            handleClose()
        }catch(error){
            console.log(error)
        }
        
    }

    const handleClose = () => {
        form.reset();
        onClose();
    }
    return (
    <Dialog open={isModalOpen} onOpenChange={handleClose} >
        <DialogContent className="bg-white text-black p-0">
            <DialogHeader className="pt-8 px-6">
                <DialogTitle className="text-2xl font-bold text-center">Add an attachment</DialogTitle>
                <DialogDescription className="text-zinc-500 text-sm text-center">
                    Send a file as a message
                </DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="space-y-8 px-6">
                        <div className="flex items-center justify-center">
                            <FormField
                            control={form.control}
                            name="fileUrl"
                            render={({ field }) => (
                                <FormItem>
                                <FormControl className="text-black">
                                    <FileUpload
                                    endPoint={"messageFile"}
                                    value={field.value}
                                    onChange={field.onChange}/>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        </div>
                    </div>
                    <DialogFooter className="bg-gray-100 rounded px-6 py-4">
                        <Button type="submit" variant='primary'>Send</Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    </Dialog>

  )
}

export default MessageFileModal