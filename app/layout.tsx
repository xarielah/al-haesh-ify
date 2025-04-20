import { auth } from "@/auth";
import AppSidebar from "@/components/layouts/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Open_Sans } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import StoreProvider from "./store-provider";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["hebrew"],
});

export const metadata: Metadata = {
  title: "סדר אותי - רשימות לאירועים מעכשיו לעכשיו",
  description: "צרו רשימה לכם ולחברים שלכם מי מביא מה, בקלות!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

  const session = await auth();

  return (
    <html lang="he" dir="rtl">
      <body
        className={`${openSans.variable} ${openSans.className} antialiased`}
      >
        <SessionProvider session={session}>
          <StoreProvider>
            <SidebarProvider defaultOpen={defaultOpen}>
              <AppSidebar />
              <main className="mx-2 w-full">
                <SidebarTrigger />
                {children}
              </main>
            </SidebarProvider>
          </StoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
