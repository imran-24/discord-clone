import NavigationSidebar from "@/components/navigation/navigation-sidebar"

const ServerLayout = ({children}:{
    children: React.ReactNode
}) => {
  return (
    <div className="h-full">
        <div className="hidden md:flex flex-col h-full fixed inset-y-0 w-[72px] z-30">
            <NavigationSidebar />
        </div>
        <main className="md:pl-[72px] h-full">
            {children}   
        </main>
    </div>
  )
}

export default ServerLayout