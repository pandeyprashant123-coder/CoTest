import Image from "next/image"
import Link from "next/link"
import React from "react"

//Inter font

const Navbar = () => {
  return (
    <div className="flex flex-row justify-between items-center w-[70%] py-3 mx-auto font-[Inter]">
      <Link
        href="/"
        className="flex flex-row gap-2 items-center cursor-pointer">
        <Image
          src="/Logo CoTest.png"
          width={30}
          height={30}
          alt="CoTest Logo"
        />
        <p className="text-2xl font-bold">CoTest</p>
      </Link>
      <div className="flex flex-row">
        <ul className="flex flex-row gap-5">
          <Link href="/">Home</Link>
          <Link href="/">About</Link>
          <Link href="/">Service</Link>
          <Link href="/">Blog</Link>
          <Link href="/check">Contact</Link>
        </ul>
      </div>
      <div className="flex flex-row gap-5 items-center">
        <p className="cursor-pointer">Sign In</p>
        <p className="border-[1px] text-[#715DE3] border-[#715DE3] cursor-pointer px-4 py-1 rounded-md">
          Sign Up
        </p>
      </div>
    </div>
  )
}

export default Navbar
