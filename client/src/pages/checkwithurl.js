import ImportRepo from "@/components/ImportRepo"
import React from "react"
import Head from "next/head"
import { signIn, useSession } from "next-auth/react"
import { Kanit } from "next/font/google"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { signin } from "@/utils/auth"
import { useSearchParams } from "next/navigation"
import RepoLinkImport from "@/components/RepoLinkImport"

const kanit = Kanit({
  weight: ["100", "200", "300", "500", "600", "700", "800", "400"],
  subsets: ["latin"],
})

const Checkwithurl = () => {
  const { data: session, status } = useSession()

  const router = useRouter()

  //   useEffect(() => {
  //     if (status === "unauthenticated") {
  //       signIn("github")
  //     }
  //   }, [status, router])

  if (status === "loading") {
    return <p>Loading...</p>
  }

  return (
    <>
      <Head>
        <title>Check Page | CoTest</title>
        <meta property="og:description" content="a good chack page" />
      </Head>
      <div className={`${kanit.className} min-h-[65vh] `}>
        <div>
          <RepoLinkImport />
        </div>
      </div>
    </>
  )
}

export default Checkwithurl
