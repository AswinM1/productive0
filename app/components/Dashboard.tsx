"use client";

import React, { useState } from "react";
import { Timer, BarChart3, Trophy, Activity, Settings } from "lucide-react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import Pomodoro from "./Clock";
import Logout from "./Logout";
import Leaderboard from "./Leaderboard";
import Analytics from "./Analytics";
import TokenPage from "../settings/page";
import ActivityPage from "../activity/page";

const NAV_ITEMS = [
  { key: "clock", label: "Timer", icon: Timer, component: Pomodoro },
  { key: "analytics", label: "Analytics", icon: BarChart3, component: Analytics },
  { key: "leaderboard", label: "Leaderboard", icon: Trophy, component: Leaderboard },
  { key: "activity", label: "Your Activity", icon: Activity, component: ActivityPage },
  { key: "settings", label: "Settings", icon: Settings, component: TokenPage },
] as const;

type PageKey = (typeof NAV_ITEMS)[number]["key"];

function Dashboard() {
  const [page, setPage] = useState<PageKey>("clock");

  const ActivePage = NAV_ITEMS.find((item) => item.key === page)?.component ?? Pomodoro;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full font-medium">
        <Sidebar>
          <SidebarContent className="text-neutral-800">
            <SidebarGroup>
              <Link href="/">
                <SidebarGroupLabel className="px-3 py-4 mb-4 text-md">
                  Flowstate
                </SidebarGroupLabel>
              </Link>
              <SidebarGroupLabel className="px-3 py-4 text-sm">
                Dashboard
              </SidebarGroupLabel>

              <SidebarGroupContent>
                <SidebarMenu className="gap-2 px-2">
                  {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
                    <SidebarMenuItem key={key}>
                      <SidebarMenuButton
                        onClick={() => setPage(key)}
                        className={`h-11 gap-3 cursor-pointer hover:bg-neutral-200 over:text-neutral-400 ${
                          page === key ? "bg-white/20" : ""
                        }`}
                      >
                        <Icon size={20} />
                        <span>{label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="bg-[#3B60C5]">
            <Logout />
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1">
          <SidebarTrigger />
          <div className="p-6">
            <ActivePage />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

export default Dashboard;