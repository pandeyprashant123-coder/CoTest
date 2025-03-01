import { signIn, signOut } from "next-auth/react"
import { getServerSession } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth]"

export const signin = async () => {
  await signIn("github", { callbackUrl: "/repository" })
}

export const signout = async () => {
  await signOut({ callbackUrl: "/" })
}

export const auth = async () => {
  const session = await getServerSession(authOptions)
  return session
}
