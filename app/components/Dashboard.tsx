"use client";

import React, { useState } from "react";
import {
  Timer,
  BarChart3,
  Trophy,
  Activity,
  Settings,
} from "lucide-react";

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

function Dashboard() {
  const [page, setPage] = useState("clock");

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar className="bg-[#3B60C5] text-white">
          <SidebarContent className="bg-[#3B60C5]">
            <SidebarGroup>
              <SidebarGroupLabel className="px-3 py-4 text-white/70">
                Dashboard
              </SidebarGroupLabel>

              <SidebarGroupContent>
                <SidebarMenu className="gap-2 px-2">
                  {/* Timer */}
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setPage("clock")}
                      className={`h-11 gap-3 text-white hover:bg-white/15 hover:text-white ${
                        page === "clock"
                          ? "bg-white/20 text-white"
                          : ""
                      }`}
                    >
                      <Timer size={20} />
                      <span>Timer</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {/* Analytics */}
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setPage("Analytics")}
                      className={`h-11 gap-3 text-white hover:bg-white/15 hover:text-white ${
                        page === "Analytics"
                          ? "bg-white/20 text-white"
                          : ""
                      }`}
                    >
                      <BarChart3 size={20} />
                      <span>Analytics</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {/* Leaderboard */}
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setPage("leaderboard")}
                      className={`h-11 gap-3 text-white hover:bg-white/15 hover:text-white ${
                        page === "leaderboard"
                          ? "bg-white/20 text-white"
                          : ""
                      }`}
                    >
                      <Trophy size={20} />
                      <span>Leaderboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {/* Activity */}
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setPage("Activity")}
                      className={`h-11 gap-3 text-white hover:bg-white/15 hover:text-white ${
                        page === "Activity"
                          ? "bg-white/20 text-white"
                          : ""
                      }`}
                    >
                      <Activity size={20} />
                      <span>Your Activity</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {/* Settings */}
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setPage("Settings")}
                      className={`h-11 gap-3 text-white hover:bg-white/15 hover:text-white ${
                        page === "Settings"
                          ? "bg-white/20 text-white"
                          : ""
                      }`}
                    >
                      <Settings size={20} />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
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
            {page === "clock" && <Pomodoro />}
            {page === "Analytics" && <Analytics />}
            {page === "leaderboard" && <Leaderboard />}
            {page === "Settings" && <TokenPage />}
            {page === "Activity" && <ActivityPage />}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

export default Dashboard;