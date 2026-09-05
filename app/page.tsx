"use client"
import Image from "next/image";
import { signIn } from "next-auth/react";
import Dashboard from "./components/Dashboard";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Dashboard></Dashboard>
    </div>
  );
}
