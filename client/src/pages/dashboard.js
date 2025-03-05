import RepositoryDashboard from "@/components/RepositoryDashboard"
import React from "react"
import { Kanit } from "next/font/google"
const kanit = Kanit({
  weight: ["100", "200", "300", "500", "600", "700", "800", "400"],
  subsets: ["latin"],
})

const Dashboard = () => {
  return (
    <div className={`min-h-screen bg-black p-6 ${kanit.className}`}>
      <RepositoryDashboard />
    </div>
  )
}

export default Dashboard
