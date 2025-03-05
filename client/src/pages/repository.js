import RepositoryList from "@/components/RepositoryList"
import { useSession } from "next-auth/react"
import Head from "next/head"
import React from "react"

const Repository = () => {
  const { data: session } = useSession()
  return (
    <>
      <Head>
        <title>Repository Page | CoTest</title>
        <meta property="og:description" content="A good repository page" />
      </Head>

      <div>
        <RepositoryList accessToken={session?.accessToken} />
      </div>
    </>
  )
}

export default Repository
