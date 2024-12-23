"use client"

import { signIn } from "next-auth/react"
 
const SignInWithGoogle=()=> {
  return (
    <button className="bg-red-400 p-2 rounded-xl text-white px-5" onClick={() => signIn("google")}>
        Sign In
    </button>
  )
}

export default SignInWithGoogle;