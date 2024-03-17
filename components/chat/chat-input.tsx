'use client'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus, Smile } from "lucide-react";

import qs from 'query-string';
import axios from "axios";
import { useModal } from "@/hooks/use-modal-store";
import { EmojiPicker } from "../emoji-picker";

interface ChatInputProps{
    apiUrl: string,
    name: string,
    query?: Record<string, any>,
    type: "conversation" | "channel"
}


const formSchema = z.object({
    content: z.string().min(1),
});

const ChatInput = ({
    apiUrl,
    name,
    type,
    query
}:  ChatInputProps) => {

    const {onOpen, isOpen} = useModal();
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          content: "",
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
          const url = qs.stringifyUrl({
            url: apiUrl,
            query,
          });
          
          await axios.post(url, values);
    
          form.reset();
          router.refresh();
        } catch (error) {
          console.log(error);
        }
      }

    return (
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6">
                    <button
                    type="button"
                    onClick={() => onOpen("messageFile", {
                        apiUrl,
                        query
                    })}
                    className="absolute left-8 top-7 h-[24px] w-[24px] bg-zinc-500 hover:bg-zinc-600 dark:bg-zinc-400 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center">
                        <Plus className="text-white dark:text-[#313338]" /> 
                    </button>
                    <Input 
                    disabled={isLoading}
                    className="
                    px-14
                    py-6
                    bg-zinc-200/90
                    dark:bg-zinc-700/75
                    border-none
                    border-0
                    focus-visible:ring-0
                    focus-visible:ring-offset-0
                    text-zinc-600
                    dark:text-zinc-200
                    "
                    placeholder={`Message ${type === "conversation" ? name : "#" + name}`} 
                    {...field} />
                    
                    <div 
                    className="absolute top-7 right-8">
                      <EmojiPicker
                      onChange={(emoji: string) => field.onChange(`${field.value} ${emoji}`)}
                      asChild
                      >
                        <Smile className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition" />
                      </EmojiPicker>
                    </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>

    )
}

export default ChatInput