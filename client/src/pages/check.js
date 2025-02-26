import ImportRepo from "@/components/ImportRepo"
import React from "react"
import Head from "next/head"
import { Kanit } from "next/font/google"

const kanit = Kanit({
  weight: ["100", "200", "300", "500", "600", "700", "800", "400"],
  subsets: ["latin"],
})

const Check = () => {
  return (
    <>
      <Head>
        <title>Check Page | CoTest</title>
        <meta property="og:description" content="a good chack page" />
      </Head>
      <div className={`${kanit.className} min-h-[65vh] `}>
        <div>
          <ImportRepo />
        </div>
      </div>
    </>
  )
}

export default Check
