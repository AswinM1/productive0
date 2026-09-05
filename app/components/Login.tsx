"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

function Login() {
  return (
    <div className="flex justify-center min-h-screen w-full ">
      
      
      {/* Left - Login */}
      <div className="flex items-center w-full justify-center bg-[#FDF2DE] px-6 py-12">
        <div className="w-full max-w-sm  px-5 py-10  rounded-md">
          <div className="mb-8">
            <h2 className="text-3xl  text-center font-semibold tracking-tight  text-gray-900">
              Welcome back
            </h2>

            <p className="mt-2 text-sm text-center text-gray-500 ">
              Sign in to continue to flowstate
            </p>
          </div>

          <button
            onClick={() =>
              signIn("google", {
                callbackUrl: "/dashboard",
              })
            }
            className="flex bg-[#3B60C5] w-full cursor-pointer items-center justify-center gap-3 rounded-md  border-gray-300 text-white px-4 py-3 text-sm font-medium text-gray-900 transition hover:bg-blue-500"
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

          <p className="mt-6 text-center text-xs text-gray-800">
            By continuing, you agree to our terms and privacy policy.
          </p>
        </div>
      </div>

      {/* Right - Large Image */}
      
    </div>
  );
}

export default Login;