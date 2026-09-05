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
    <div className="flex flex-col gap-[16px] border py-3 bg-white text-black rounded-md px-2  font-medium tracking-tight">
        <div className="flex gap-2 items-center">
             
        <div className="flex w-10 h-10 rounded-full text-white bg-[#3B60C5] border-gray-500 border justify-center items-center font-semibold ">{session.user?.name?.substring(0,1)}</div>
      
      <div className="flex flex-col">
        <p>{session.user?.name}</p>
      </div>
     

    
</div>
      <button className="cursor-pointer bg-[#3B60C5] text-white  px-3 py-2 rounded-md " onClick={() => signOut()}>
        Sign out
      </button>
    </div>
  );
}

export default Logout;