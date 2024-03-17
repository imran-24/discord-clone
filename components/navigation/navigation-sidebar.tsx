import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { redirect } from "next/navigation"
import NavigationAction from "./navigation-action";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import NavigationItem from "./navigation-item";
import { ModeToggle } from "../mode-toggle";
import { UserButton } from "@clerk/nextjs";


const NavigationSidebar = async() => {
    const profile = await currentProfile()

    if(!profile) return redirect('/');

    const servers = await db.server.findMany({
        where:{
            members:{
                some:{
                    profileId: profile.id
                }
            }
        },
        orderBy:{
            createdAt: "desc"
        }
    })


    return (
        <div className="space-y-4 flex flex-col text-primary h-full w-full bg-zinc-200  dark:bg-[#1E1F22] py-3">
            <NavigationAction />
            <Separator
            className="
            my-4
            bg-zinc-300
            dark:bg-zinc-700
            h-[2px]
            rounded-lg
            w-10
            mx-auto
            "
            />
            <ScrollArea className="flex-1">
                {
                    servers.map(server =>(
                        <div
                        className="mb-4"
                        key={server.id}>
                            <NavigationItem 
                            id={server.id}
                            name={server.name}
                            imageUrl={server.imageUrl}/>
                        </div>
                    ))
                }
            </ScrollArea>
            <div className="flex flex-col mt-auto items-center gap-y-4">
            <ModeToggle />
            <UserButton
            afterSignOutUrl="/"
            appearance={{ 
              elements:{
                avatarBox: "h-[48px] w-[48px]"
              }
             }}
            />
        </div>
        </div>
    )
}

export default NavigationSidebar