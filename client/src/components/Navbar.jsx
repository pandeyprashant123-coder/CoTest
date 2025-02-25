import Image from "next/image"
import Link from "next/link"
import React from "react"
import LoginButton from "./LoginButton"

//Inter font

const Navbar = () => {
  return (
    <div className="sticky top-0 flex flex-row justify-between items-center w-[100%] py-4  px-20 mx-auto font-[Inter] text-sm border-b border-b-gray-400 bg-background shadow-sm backdrop-blur-sm ">
      <div className="flex items-center gap-10">
        <Link
          href="/"
          className="flex flex-row gap-2 items-center cursor-pointer">
          <p className="text-lg font-bold">CoTest</p>
        </Link>
        <div className="flex flex-row">
          <ul className="flex flex-row gap-5">
            <Link href="/">Home</Link>
            <Link href="/">About</Link>
            <Link href="/repository">Repository</Link>
            <Link href="/">Blog</Link>
            <Link href="/check">Contact</Link>
          </ul>
        </div>
      </div>
      <div className="flex flex-row gap-5 items-center">
        {/* <p className="cursor-pointer">Sign In</p>
        <p className="border-[1px] text-[#715DE3] border-[#715DE3] cursor-pointer px-4 py-1 rounded-md">
          Sign Up
        </p> */}
        <LoginButton />
      </div>
    </div>
  )
}

export default Navbar
