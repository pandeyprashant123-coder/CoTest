import React from "react"

const GradientComponent = () => {
  return (
    <div className="relative left-0 right-0 top-0 hidden opacity-20 blur-[0px] md:block -z-10">
      <div className="absolute right-10 top-52 z-[-1] h-[220px] w-2/3 rotate-[-30deg] select-none rounded-full bg-[#000000] blur-[200px]"></div>
      <div className="absolute right-10 z-[-1] h-[420px] w-2/3 rotate-[-30deg] select-none rounded-full bg-[#bfa0a3] blur-[200px]"></div>
      <div className="absolute left-1/4 z-[-1] h-[520px] w-[520px] rotate-[180deg] select-none rounded-full bg-[#451d90] blur-[200px]"></div>
      <div className="absolute left-1/2 z-[-1] h-[511px] w-[720px] -translate-x-1/2 rotate-[45deg] select-none rounded-full bg-[#FFA825] blur-[200px]"></div>
      <div className="absolute left-20 z-[-1] h-[420px] w-[450px] rotate-[-160deg] select-none rounded-full bg-[#EE201A] blur-[200px]"></div>
      {/* #b03c3c, #510000, #000000 */}
    </div>
  )
}

export default GradientComponent
