import React from "react"
import TopLetter from "../TopLetter"

const TrustedBy = () => {
  return (
    <div className="flex flex-col mx-auto w-[80%] gap-9">
      <div className="container mx-auto px-4 md:px-0">
        <TopLetter content={"Trusted"} />
        <p className="text-center text-gray-300 mb-8">
          Trusted by leading companies worldwide
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12">
          {["Company1", "Company2", "Company3", "Company4", "Company5"].map(
            (company, index) => (
              <div key={index} className="text-gray-200 font-semibold text-lg">
                {company}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default TrustedBy
