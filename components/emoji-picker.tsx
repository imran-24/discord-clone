"use client";

import { useTheme } from "next-themes";
import Picker from '@emoji-mart/react';
import data from "@emoji-mart/data";

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

interface EmojiPickerProps {
  onChange: (emoji: string) => void;
  children: React.ReactNode;
  asChild?: boolean;
};

export const EmojiPicker = ({
  onChange,
  children,
  asChild
}: EmojiPickerProps) => {
  const { resolvedTheme } = useTheme();
  // const currentTheme = (resolvedTheme || "light") as keyof typeof themeMap

  // const themeMap = {
  //   "dark": Theme.DARK,
  //   "light": Theme.LIGHT
  // };

  // const theme = themeMap[currentTheme];

  return (
    <Popover>
        <PopoverTrigger asChild={asChild}>
            {children}
        </PopoverTrigger>
        <PopoverContent 
        side="right"
        
        className="p-0 w-full mb-16 drop-shadow-none bg-transparent border-none shadow-none">
            <Picker
            data={data}
            theme={resolvedTheme}
            onEmojiSelect={(emoji: any) => onChange(emoji.native)}
            />
        </PopoverContent>
    </Popover>
  );
};