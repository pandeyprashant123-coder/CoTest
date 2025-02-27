import React from "react"

const TopLetter = ({ content }) => {
  return (
    <div className="w-max mx-auto mb-5">
      <p className="px-6 py-1 border-2 border-blue-600 rounded-3xl">
        {content}
      </p>
    </div>
  )
}

export default TopLetter
