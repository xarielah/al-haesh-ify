"use client"


import { signOutUser } from "@/actions/auth.action"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { nameAbbrv } from "@/lib/utils"
import { User } from "next-auth"
import { Button } from "../ui/button"

interface NavUserProps {
    user: User
}

export function NavUser({ user }: NavUserProps) {
    const { state } = useSidebar()
    const nameInitials = nameAbbrv(user.name!)

    return (
        <SidebarMenu>
            <SidebarMenuItem className="grid gap-2">
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                    <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src={user.image!} alt={user.name!} />
                        <AvatarFallback className="rounded-lg">{nameInitials}</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-right text-sm leading-tight">
                        <span className="truncate font-semibold">{user.name}</span>
                        <span className="truncate text-xs">{user.email}</span>
                    </div>
                </SidebarMenuButton>
                {state === "expanded" && <SidebarMenuButton asChild>
                    <Button
                        onClick={() => signOutUser()}
                        variant="secondary"
                        className="w-full hover:bg-red-500 hover:text-white"
                    >
                        התנתקות מהאתר
                    </Button>
                </SidebarMenuButton>}
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
