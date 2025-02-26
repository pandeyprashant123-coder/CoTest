import React, { useState } from "react"
import TopLetter from "../TopLetter"
import GradientComponent from "../GradientComponent"

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="flex flex-col mx-auto w-[80%] gap-9">
      <GradientComponent />

      <div className="container mx-auto px-4 md:px-0">
        <TopLetter content={"FAQs"} />
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold  mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-100 max-w-2xl mx-auto">
            Find answers to common questions about our platform.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {[
            {
              question: "How do I get started with the platform?",
              answer:
                "Getting started is simple! Sign up for a free account, upload or paste your code, and run an analysis. Our system will provide detailed feedback, including syntax issues, performance suggestions, and security vulnerabilities.",
            },
            {
              question:
                "What types of code analysis does the platform perform?",
              answer:
                "Our platform provides static code analysis, security vulnerability detection, performance optimizations, and style guideline enforcement. We support multiple programming languages, including JavaScript, Python, Java, and more.",
            },
            {
              question: "Does the platform support CI/CD integration?",
              answer:
                "Yes! You can integrate our platform with GitHub, GitLab, and other CI/CD pipelines to automate code reviews and quality checks during your development workflow.",
            },
            {
              question: "How secure is my code when using this platform?",
              answer:
                "We prioritize security by using industry-standard encryption and secure cloud storage. Your code is never shared or stored beyond the analysis session unless explicitly saved by you.",
            },
            {
              question: "Can I analyze code from multiple languages?",
              answer:
                "Yes, our platform supports multiple languages, including JavaScript, Python, Java, C++, and more. We continuously add support for new languages based on user demand.",
            },
          ].map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold mb-2 flex items-center justify-between">
                {faq.question}
                <button onClick={() => toggleFAQ(index)}>
                  {openIndex === index ? (
                    <svg
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15">
                      <path
                        d="M1 10l6.5-7 6.5 7"
                        stroke="currentColor"
                        strokeLinecap="square"
                      />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15">
                      <path
                        d="M14 5l-6.5 7L1 5"
                        stroke="currentColor"
                        strokeLinecap="square"
                      />
                    </svg>
                  )}
                </button>
              </h3>
              {openIndex === index && (
                <p className="text-gray-100">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FAQs
