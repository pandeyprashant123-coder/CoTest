import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import LoginButton from "./LoginButton";
import { Kanit } from "next/font/google";

const kanit = Kanit({
  weight: ["100", "200", "300", "500", "600", "700", "800", "400"],
  subsets: ["latin"],
});

const Navbar = () => {
  const [border, setBorder] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setBorder(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`sticky top-0 flex flex-row justify-between items-center w-full py-4 px-20 mx-auto font-[Inter] text-sm ${
        border ? "border-b border-gray-100 border-opacity-20" : ""
      } shadow-sm backdrop-blur-sm ${kanit.className} z-50`}
      ref={navRef}
    >
      <div className="flex items-center gap-10">
        <Link
          href="/"
          className="flex flex-row gap-2 items-center cursor-pointer"
        >
          <p className="text-xl font-bold">
            <span className="text-[#715DE3]">Co</span>Test
          </p>
        </Link>
        <div className="flex flex-row">
          <ul className="flex flex-row gap-5">
            <Link href="/" className="hover:opacity-80">
              Home
            </Link>
            <Link href="/" className="hover:opacity-80">
              About
            </Link>
            <Link href="/repository" className="hover:opacity-80">
              Repository
            </Link>
            <Link href="/" className="hover:opacity-80">
              Blog
            </Link>
            <Link href="/check" className="hover:opacity-80">
              Contact
            </Link>
          </ul>
        </div>
      </div>
      <div className="flex flex-row gap-5 items-center">
        <LoginButton />
      </div>
    </div>
  );
};

export default Navbar;
