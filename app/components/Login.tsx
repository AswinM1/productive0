"use client";

import { signIn } from "next-auth/react";

function Login() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-white px-6">
      <div className="w-full border px-4 py-10 rounded-md max-w-sm">
        {/* Logo */}
        <div className="mb-10 flex justify-center mr-3">
          <div className="flex items-center gap-2 text-sm font-semibold tracking-tight text-neutral-900">
            <span className="h-2 w-2 rounded-full bg-neutral-900" />
            flowstate
          </div>
        </div>

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-950">
            Log in to flowstate
          </h1>

          <p className="mt-2 text-sm leading-6 text-neutral-500">
            Sign in to continue to your workspace.
          </p>
        </div>

        {/* Login */}
        <button
          onClick={() =>
            signIn("google", {
              callbackUrl: "/dashboard",
            })
          }
          className="flex w-full hover:bg-neutral-100 cursor-pointer items-center justify-center gap-3 rounded-md border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-900 transition-colors  active:translate-y-px"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path
              fill="#4285F4"
              d="M21.35 12.23c0-.79-.07-1.55-.23-2.27H12v4.3h5.22a4.46 4.46 0 0 1-1.94 2.93v2.44h3.14c1.84-1.69 2.93-4.18 2.93-7.4Z"
            />

            <path
              fill="#34A853"
              d="M12 21.75c2.63 0 4.84-.87 6.45-2.35l-3.14-2.44c-.87.58-1.98.93-3.31.93-2.54 0-4.7-1.72-5.47-4.04H3.29v2.52A9.75 9.75 0 0 0 12 21.75Z"
            />

            <path
              fill="#FBBC05"
              d="M6.53 13.85A5.86 5.86 0 0 1 6.22 12c0-.64.11-1.27.31-1.85V7.63H3.29A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.04 4.37l3.24-2.52Z"
            />

            <path
              fill="#EA4335"
              d="M12 6.11c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.2 14.63 2.25 12 2.25a9.75 9.75 0 0 0-8.71 5.38l3.24 2.52C7.3 7.83 9.46 6.11 12 6.11Z"
            />
          </svg>

          Continue with Google
        </button>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-balance leading-5 text-neutral-400">
          By continuing, you agree to use flowstate for your
          productivity tracking.
        </p>
      </div>
    </main>
  );
}

export default Login;