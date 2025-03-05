import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image"

export default function LoginButton() {
  const { data: session } = useSession()
  console.log(session)
  if (session) {
    return (
      <>
        {/* Signed in as {session.user.name} <br />
         */}
        <button onClick={() => signOut()} className="hover:opacity-80">
          Sign out
        </button>
        <Image
          src={session.user.image}
          alt={session.user.name}
          height={30}
          width={30}
          unoptimized={true}
          className="rounded-[50%] border-white border-[1px]"
        />
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()} className="hover:opacity-80">
        Sign in
      </button>
    </>
  )
}
