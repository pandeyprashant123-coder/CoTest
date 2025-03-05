import RepositoryDashboard from "@/components/RepositoryDashboard"
import React from "react"
import { Kanit } from "next/font/google"
import Head from "next/head"
const kanit = Kanit({
  weight: ["100", "200", "300", "500", "600", "700", "800", "400"],
  subsets: ["latin"],
})

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Dashboard | CoTest</title>
        <meta property="og:description" content="This is the dashboard" />
      </Head>
      <div className={`min-h-screen bg-black p-6 ${kanit.className}`}>
        <RepositoryDashboard />
      </div>
    </>
  )
}

export default Dashboard
