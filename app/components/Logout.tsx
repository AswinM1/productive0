"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";

function Logout() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Not logged in</div>;
  }

  return (
    <div className="flex flex-col gap-4 border py-3 bg-linear-to-b from-blue-400 to-blue-600 ring-1 ring-blue-400 rounded-md px-2 text-white font-medium tracking-tight">
        <div className="flex gap-2 items-center">
             
        <div className="flex w-10 h-10 rounded-full bg-white border-gray-500 border justify-center items-center font-semibold text-black">{session.user?.name?.substring(0,1)}</div>
      
      <div className="flex flex-col">
        <p>{session.user?.name}</p>
      </div>
     

    
</div>
      <button className="cursor-pointer bg-white text-black  px-3 py-2 rounded-md " onClick={() => signOut()}>
        Sign out
      </button>
    </div>
  );
}

export default Logout;