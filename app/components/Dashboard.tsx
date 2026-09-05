"use client";

import React, { useState } from "react";
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
import Clock from "./Clock";
import Pomodoro from "./Clock";
import Logout from "./Logout";
import Leaderboard from "./Leaderboard";
import Analytics from "./Analytics";
import TokenPage from "../settings/page";
import ActivityPage from "../activity/page";

function Dashboard() {
    const[page,setPage]=useState("clock")
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Dashboard</SidebarGroupLabel>

              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                    onClick={()=>setPage("clock")}>
                      Timer
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={()=>setPage("Analytics")}>
                      Analytics
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={()=>setPage("leaderboard")}>
                      Leaderboard
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={()=>setPage("Activity")}>
                      Your Activity
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={()=>setPage("Settings")}>
                      Settings
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <Logout></Logout>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1">
          <SidebarTrigger />

          <div className="p-6">
         
            {page=="clock" && <Pomodoro></Pomodoro>}
            {page=="Analytics" && <Analytics></Analytics>}
            {page=="leaderboard" &&<div><Leaderboard></Leaderboard></div>}
            {page=="Settings" &&<div><TokenPage></TokenPage></div>}
            {page=="Activity" &&<div><ActivityPage></ActivityPage></div>}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

export default Dashboard;