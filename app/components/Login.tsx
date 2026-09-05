"use client"
import { signIn } from 'next-auth/react'
import React from 'react'

function Login() {
  return (
    <div className='flex h-screen justify-center items-center text-black'>
        <button onClick={()=>signIn("google",{callbackUrl:"/"})} className='cursor-pointer'>Signin</button>
    </div>
  )
}

export default Login