import { Kanit } from "next/font/google"
import Link from "next/link"
import React from "react"

const kanit = Kanit({
  weight: ["100", "200", "300", "500", "600", "700", "800", "400"],
  subsets: ["latin"],
})

const Footer = () => {
  return (
    <footer
      className={`border-t  border-t-gray-400 bg-background shadow-sm backdrop-blur-sm ${kanit.className}  p-8`}>
      <div className="container w-[80%] mx-auto px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <Link
              href="/"
              className="flex flex-row gap-2 items-center cursor-pointer  h-full">
              <p className="text-xl md:text-3xl font-bold ">
                <span className="text-[#715DE3]">Co</span>Test
              </p>
            </Link>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="text-gray-400 cursor-pointer hover:opacity-80 ">
                  Features
                </a>
              </li>
              <li>
                <a className="text-gray-400 cursor-pointer hover:opacity-80 ">
                  Pricing
                </a>
              </li>
              <li>
                <a className="text-gray-400 cursor-pointer hover:opacity-80 ">
                  Integrations
                </a>
              </li>
              <li>
                <a className="text-gray-400 cursor-pointer hover:opacity-80 ">
                  Roadmap
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-md font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="text-gray-400 cursor-pointer hover:opacity-80 ">
                  About Us
                </a>
              </li>
              <li>
                <a className="text-gray-400 cursor-pointer hover:opacity-80 ">
                  Careers
                </a>
              </li>
              <li>
                <a className="text-gray-400 cursor-pointer hover:opacity-80 ">
                  Contact
                </a>
              </li>
              <li>
                <a className="text-gray-400 cursor-pointer hover:opacity-80 ">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-3">
          <p className="text-center text-gray-400 text-sm">
            All rights reserved © CoTest 2025
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
