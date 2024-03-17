import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"

  
import { Menu } from "lucide-react"
import { Button } from "./ui/button"
import NavigationSidebar from "./navigation/navigation-sidebar"
import ServerSidebar from "./server/server-sidebar"

const MobileToggle = ({
    serverId
}:{serverId: string}) => {
  return (
    <Sheet>
        <SheetTrigger asChild>
            <Button 
            className="md:hidden"
            variant={'ghost'} 
            size={'icon'}>
                <Menu />
            </Button>
        </SheetTrigger>
        <SheetContent
        side={'left'}
        className="p-0 flex gap-0">
            <div className="w-[72px]">
                <NavigationSidebar />
            </div>
            <div className="flex-1 w-full">
                <ServerSidebar
                serverId={serverId} />
            </div>
        </SheetContent>
    </Sheet>

  )
}

export default MobileToggle