"use client";

import Image from "next/image";
import ActionTooltip from "../action-tooltip";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";

interface NavigationItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  id,
  name,
  imageUrl,
}) => {
  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    router.push(`/servers/${id}`);
  }
  return (
    <ActionTooltip label={name} align="center" side="right">
        <button 
        onClick={onClick}
        className="group relative flex items-center mx-auto">
        <div
          className={cn(`
            absolute 
            left-0
            h-[18px] 
            w-[4px]
            transition-all 
            bg-primary   
            rounded-r-full
            dark:bg-zinc-200
            `,
            params.serverId !== id && "group-hover:h-[28px]",
            params.serverId === id ? "h-[36px]" : "h-[8px]")}

        />
        <div
          className={cn(`
            relative 
            h-[48px] 
            w-[48px] 
            rounded-[24px] 
            transition-all
            mx-3
            group-hover:rounded-[16px] 
            overflow-hidden`,
            params.serverId === id && "rounded-[16px] ")}

        >
          <Image
            src={imageUrl}
            fill
            className="overflow-hidden object-center object-cover"
            alt="server-image"
          />
        </div>
      </button>
    </ActionTooltip>
  );
};

export default NavigationItem;
