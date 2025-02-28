import { signIn } from "next-auth/react"
import React from "react"
import { useRouter } from "next/router"

const Signin = async () => {
  const router = useRouter()
  await signIn("github", { redirect: false }) 

  setTimeout(() => {
    router.push("/repository")
  }, 100)
}
//   return <div>signin</div>
// }

export default Signin
