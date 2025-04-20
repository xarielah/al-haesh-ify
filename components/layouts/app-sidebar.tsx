import { auth } from "@/auth";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "../ui/sidebar";
import GuestSidebarGroup from "./guest-sidebar-group";
import NavGuest from "./nav-guest";
import { NavUser } from "./nav-user";
import UserSidebarGroup from "./user-sidebar-group";

export default async function AppSidebar() {
    const session = await auth();

    return <Sidebar collapsible="icon" variant="sidebar">
        <SidebarHeader />
        <SidebarContent>
            {!!session ? <UserSidebarGroup /> : <GuestSidebarGroup />}
        </SidebarContent>
        <SidebarFooter>
            {!!session ? <NavUser user={session.user!} /> : <NavGuest />}
        </SidebarFooter>
    </Sidebar>
}