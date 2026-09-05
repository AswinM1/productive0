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
    <div className="flex flex-col gap-4 border py-3">
        <div className="flex gap-2 items-center">
              {session.user?.image && (
        <img
          src={session.user.image}
          alt="Profile"
          className="h-10 w-10 rounded-full"
        />
      )}
      <div className="flex flex-col">
        <p>{session.user?.name}</p>
      </div>
     

    
</div>
      <button className="cursor-pointer bg-black px-3 py-2 rounded-md text-white" onClick={() => signOut()}>
        Sign out
      </button>
    </div>
  );
}

export default Logout;