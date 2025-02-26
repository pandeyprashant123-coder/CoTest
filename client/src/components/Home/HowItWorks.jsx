import React from "react"
import TopLetter from "../TopLetter"

const HowItWorks = () => {
  return (
    <div className="flex flex-col mx-auto w-[80%] gap-9">
      <div className="container mx-auto px-4 md:px-0">
        <TopLetter content={"Working"} />
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold  mb-4">
            How It Works
          </h2>
          <p className="text-gray-100 max-w-2xl mx-auto">
            Get started in minutes with our simple three-step process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Create an account",
              description: "Sign up for free and complete your profile setup.",
            },
            {
              step: "02",
              title: "Configure your workspace",
              description: "Customize your dashboard and invite team members.",
            },
            {
              step: "03",
              title: "Start growing your business",
              description:
                "Utilize our tools to streamline operations and boost revenue.",
            },
          ].map((item, index) => (
            <div key={index} className="relative">
              <div className="bg-white text-black p-6 rounded-xl shadow-sm">
                <div className="text-blue-600 font-bold text-xl mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-black">{item.title}</h3>
                <p className="text-black">{item.description}</p>
              </div>
              {index < 2 && (
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HowItWorks
