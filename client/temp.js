import Image from "next/image"
import React from "react"
import Link from "next/link"

const threeItems = [
  {
    text: "Your guests upload photos of their Passport and Visa."
  },
  {
    text: "Qid's AI engine extracts details like Passport Number, Visa Number, Name, Country, and Photos from the images."
  },
  {
    text: "Go to the C-Form website Open the qid C-Form Pro Chrome plugin. Select the guest. Done!"
  }
]

const Cform = () => {
  return (
    <div className="text-white flex flex-col gap-7 sm:pt-64 pt-20 px-5 max-w-[1150px] mx-auto">
      <div className="flex flex-col gap-3">
        <h2 className="font-bold md:text-[70px] sm:text-[60px] text-[40px] text-[#E9E7E7]">
          <span className="bg-gradient-to-r from-[#FFB76B]  via-[#FF7C00] to-[#FF7F04] inline-block text-transparent bg-clip-text ">
            C-Form
          </span>{" "}
          Automation
        </h2>
        <p className="font-semibold md:text-[30px] text-[25px] mb-5 text-[#FFFFFFC9]">
          Say Goodbye to Manual C-Forms
        </p>
        <div className="flex sm:flex-row flex-col gap-3">
          <Link
            href="/booking"
            className="md:px-7 px-5 md:py-3 py-2 rounded-[50px] font-bold bg-white text-black md:text-[20px] text-[15px] w-max">
            Book a demo
          </Link>
          <Link
            href="https://chromewebstore.google.com/detail/qid-c-form-pro/afghjacdcfhoikcccemlchhmokfgobpj"
            className="md:px-7 px-5 md:py-3 py-2 rounded-[50px] font-bold bg-black text-white border-[1px] border-gray-500 flex flex-row gap-1 items-center md:text-[20px] text-[15px] w-max">
            <svg
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15">
              <path
                d="M2.503 1.907A7.472 7.472 0 017.5 0a7.498 7.498 0 016.635 4H7.5a3.501 3.501 0 00-3.23 2.149L2.503 1.907z"
                fill="currentColor"></path>
              <path
                d="M1.745 2.69a7.503 7.503 0 003.41 11.937l2.812-3.658a3.501 3.501 0 01-3.88-2.685.502.502 0 01-.049-.092L1.745 2.69z"
                fill="currentColor"></path>
              <path
                d="M6.215 14.89a7.5 7.5 0 008.357-9.895A.503.503 0 0114.5 5H9.95A3.49 3.49 0 0111 7.5a3.487 3.487 0 01-.954 2.405l-3.83 4.985z"
                fill="currentColor"></path>
              <path
                d="M5 7.5a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0z"
                fill="currentColor"></path>
            </svg>
            Get Chrome Extension
          </Link>
        </div>
      </div>
      <div className="px-1 md:w-[97vw] w-[90vw]  relative md:-ml-[20vw] -ml-[0vw] overflow-hidden">
        <Image
          src="/assets/cform1.png"
          width={40000}
          height={5000}
          alt="C-Form"
          className="w-[990vw]"
        />
      </div>
      <div className="my-9 flex flex-col gap-24">
        <h3 className="font-bold md:text-[75px] sm:text-[60px] text-[45px] text-[#FFFFFFC9] md:leading-[80px] leading-tight">
          Trust us, it&apos;s truly a matter of just{" "}
          <span className="bg-gradient-to-r from-[#FFB76B]  via-[#FF7C00] to-[#FF7F04] inline-block text-transparent bg-clip-text">
            one click.
          </span>
        </h3>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
          {threeItems.map((items, index) => (
            <div
              key={index}
              className=" bg-gradient-to-tr from-[#000000]  to-[#292929] border-[1px] border-[#474747] font-semibold sm:text-[30px] text-[25px]  rounded-3xl py-6 px-8 leading-tight">
              {items.text}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex md:flex-row flex-col items-center gap-20 my-9">
        <div className="md:w-[50%] w-full">
          <h1 className="font-semibold md:text-[40px] text-[30px] leading-[48px] mb-5">
            Elevate C-Form Processing with qid&apos;s State-of-the-Art Chrome
            Extension
          </h1>
          <p className="font-medium md:text-[25px] text-[20px] text-[#BDBCBC] leading-[30px] mb-5">
            Simplify C-Form management like never before with qid&apos;s
            revolutionary Chrome extension.
          </p>
          <Link
            href="https://chromewebstore.google.com/detail/qid-c-form-pro/afghjacdcfhoikcccemlchhmokfgobpj"
            className="px-6 py-3 sm:text-[20px] text-[15px] rounded-[50px] font-bold bg-white text-black border-[1px] border-gray-500 w-max flex flex-row gap-1 items-center">
            <svg
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15">
              <path
                d="M2.503 1.907A7.472 7.472 0 017.5 0a7.498 7.498 0 016.635 4H7.5a3.501 3.501 0 00-3.23 2.149L2.503 1.907z"
                fill="currentColor"></path>
              <path
                d="M1.745 2.69a7.503 7.503 0 003.41 11.937l2.812-3.658a3.501 3.501 0 01-3.88-2.685.502.502 0 01-.049-.092L1.745 2.69z"
                fill="currentColor"></path>
              <path
                d="M6.215 14.89a7.5 7.5 0 008.357-9.895A.503.503 0 0114.5 5H9.95A3.49 3.49 0 0111 7.5a3.487 3.487 0 01-.954 2.405l-3.83 4.985z"
                fill="currentColor"></path>
              <path
                d="M5 7.5a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0z"
                fill="currentColor"></path>
            </svg>
            Get Chrome Extension
          </Link>
        </div>
        <div>
          <Image
            src="/assets/cform2.png"
            height={50}
            width={200}
            alt="C-Form 2"
            className="w-full h-full border-2 border-white rounded-2xl -rotate-3"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 py-5 px-8 border-[1px] border-[#646464] rounded-3xl my-5 text-[#CCCCCC]">
        <h3 className="font-bold md:text-[50px] sm:text-[40px] text-[30px]">
          What is C-Form?
        </h3>
        <p className="md:text-[22px] sm:text-[19px] text-[16px]">
          In India, a{" "}
          <a href="" target="_blank" className="underline">
            <strong className="text-white">C-Form</strong>
          </a>{" "}
          is a mandatory document required under the Foreigners&apos;
          Registration Act, 1946.
        </p>
        <p className="md:text-[22px] sm:text-[19px] text-[16px]">
          It serves as a record of the stay of foreign nationals within the
          country.
        </p>
        <p className="md:text-[22px] sm:text-[19px] text-[16px]">
          Hotels, guesthouses, and other accommodation providers are legally
          obligated to submit C-Forms to local authorities for every foreign
          guest&apos;s stay.
        </p>
        <Link
          href="/cform"
          className=" px-5 py-3 font-bold md:text-[20px] text-[15px] w-max border-[1px] border-gray-500 rounded-3xl">
          Read More
        </Link>
      </div>
    </div>
  )
}

export default Cform
