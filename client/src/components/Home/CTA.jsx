import React from "react"
import TopLetter from "../TopLetter"

const CTA = () => {
  return (
    <div className="flex flex-col mx-auto w-[80%] gap-9">
      <div className="container mx-auto px-4 md:px-0 text-center">
        <TopLetter content={"Contact"} />
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to transform your business?
        </h2>
        <p className=" max-w-2xl mx-auto mb-8">
          Join thousands of businesses that are growing faster and working
          smarter with our platform.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <a
            href="#signup"
            className="border-purple-500 border-2 px-8 py-3 rounded-lg font-semibold ">
            Get Started Free
          </a>
          <a
            href="#demo"
            className="border-2 border-yellow-500  px-8 py-3 rounded-lg font-semibold ">
            Schedule a Demo
          </a>
        </div>
      </div>
    </div>
  )
}

export default CTA
