"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";

function Logout() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="px-2 py-3 text-xs text-neutral-400">
        Loading...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="px-2 py-3 text-xs text-neutral-400">
        Not logged in
      </div>
    );
  }

  const name = session.user?.name ?? "User";
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="rounded-md border border-neutral-200 bg-white p-2">
      <div className="flex items-center gap-3 px-1 py-2">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-xs font-medium text-white">
          {initial}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-neutral-900">
            {name}
          </p>

          {session.user?.email && (
            <p className="truncate text-xs text-neutral-400">
              {session.user.email}
            </p>
          )}
        </div>
      </div>

      <button
        onClick={() => signOut()}
        className="
          mt-1
          w-full
          rounded-md
          border border-neutral-200
          bg-white
          px-3
          py-2
          text-xs
          font-medium
          text-neutral-600
          transition-colors
          hover:bg-neutral-50
          hover:text-neutral-900
        "
      >
        Sign out
      </button>
    </div>
  );
}

export default Logout;