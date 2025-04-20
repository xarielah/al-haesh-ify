import { Calendar, Home, Inbox, Plus, Settings } from "lucide-react";
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

// Menu Items 
const items = [
    {
        title: "דף הבית",
        url: "/",
        icon: Home,
    },
    {
        title: "ההתראות שלי",
        url: "/notifications",
        icon: Inbox,
    },
    {
        title: "האירועים שלי",
        url: "/events",
        icon: Calendar,
    },
    {
        title: "אירוע חדש",
        url: "/events/new",
        icon: Plus,
    },
    {
        title: "הגדרות",
        url: "/settings",
        icon: Settings,
    },
]

export default function UserSidebarGroup() {
    return <SidebarGroup>
        <SidebarGroupContent>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                            <a href={item.url}>
                                <item.icon />
                                <span>{item.title}</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroupContent>
    </SidebarGroup>
}