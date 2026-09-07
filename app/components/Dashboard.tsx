"use client";

import React, { useState } from "react";
import {
  Timer,
  BarChart3,
  Trophy,
  Activity,
  Settings,
} from "lucide-react";
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
  {
    key: "clock",
    label: "Timer",
    icon: Timer,
    component: Pomodoro,
  },
  {
    key: "analytics",
    label: "Analytics",
    icon: BarChart3,
    component: Analytics,
  },
  {
    key: "leaderboard",
    label: "Leaderboard",
    icon: Trophy,
    component: Leaderboard,
  },
  {
    key: "activity",
    label: "Activity",
    icon: Activity,
    component: ActivityPage,
  },
  {
    key: "settings",
    label: "Settings",
    icon: Settings,
    component: TokenPage,
  },
] as const;

type PageKey = (typeof NAV_ITEMS)[number]["key"];

function Dashboard() {
  const [page, setPage] = useState<PageKey>("clock");

  const ActivePage =
    NAV_ITEMS.find((item) => item.key === page)?.component ?? Pomodoro;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-neutral-50 text-neutral-900">
        {/* Sidebar */}
        <Sidebar className="border-r border-neutral-200 bg-white">
          <SidebarContent>
            <SidebarGroup className="px-3 py-4">
              {/* Logo */}
              <Link href="/" className="mb-8 block">
                <div className="flex items-center gap-2 px-2">
                  <span className="h-2 w-2 rounded-full bg-neutral-900" />

                  <span className="text-sm font-semibold tracking-tight">
                    flowstate
                  </span>
                </div>
              </Link>

              {/* Navigation */}
              <SidebarGroupLabel className="mb-2 px-2 text-[11px] font-medium uppercase tracking-wider text-neutral-400">
                Dashboard
              </SidebarGroupLabel>

              <SidebarGroupContent>
                <SidebarMenu className="gap-1">
                  {NAV_ITEMS.map(
                    ({ key, label, icon: Icon }) => {
                      const active = page === key;

                      return (
                        <SidebarMenuItem key={key}>
                          <SidebarMenuButton
                            onClick={() => setPage(key)}
                            className={`
                              h-10 cursor-pointer gap-3 rounded-md px-3
                              text-sm
                              ${
                                active
                                  ? "bg-neutral-100 font-medium text-neutral-900"
                                  : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
                              }
                            `}
                          >
                            <Icon className="size-[17px]" />

                            <span>{label}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    }
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          {/* Footer */}
          <SidebarFooter className="border-t border-neutral-200 bg-white p-3">
            <Logout />
          </SidebarFooter>
        </Sidebar>

        {/* Main */}
        <main className="min-w-0 flex-1">
          {/* Top bar */}
          <header className="flex h-14 items-center border-b border-neutral-200 bg-white px-4">
            <SidebarTrigger className="text-neutral-500 hover:text-neutral-900" />

            <div className="ml-3 h-4 w-px bg-neutral-200" />

            <span className="ml-3 text-sm font-medium text-neutral-700">
              {NAV_ITEMS.find((item) => item.key === page)?.label}
            </span>
          </header>

          {/* Content */}
          <div className="mx-auto w-full max-w-[1400px] p-5 md:p-7">
            <ActivePage />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

export default Dashboard;