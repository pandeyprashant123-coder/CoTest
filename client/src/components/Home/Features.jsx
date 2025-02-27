import { fetchGitHubRepos } from "@/utils/fetchGithubRepos"
import { useSession } from "next-auth/react"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import TopLetter from "../TopLetter"
import GradientComponent from "../GradientComponent"

const Features = () => {
  return (
    <div className="flex flex-col mx-auto w-[80%] gap-9">
      <GradientComponent />
      <div className="container mx-auto px-4 md:px-0">
        <TopLetter content={"Features"} />
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold  mb-4">
            Key Features of Our Platform
          </h2>
          <p className="text-gray-100 max-w-2xl mx-auto">
            Everything you need to manage and grow your business in one powerful
            platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Automated Code Review",
              description:
                "Analyze your code instantly for syntax errors, best practices, and potential issues with detailed feedback.",
            },
            {
              title: "Multi-Language Support",
              description:
                "Supports JavaScript and Python providing language-specific recommendations and optimizations.",
            },
            {
              title: "Security Vulnerability Detection",
              description:
                "Detects security threats like SQL injection, XSS, and unsafe dependencies, helping to strengthen your code.",
            },
            {
              title: "Performance Optimization",
              description:
                "Identifies inefficient loops, memory leaks, and redundant computations with optimization tips for better execution speed.",
            },
            {
              title: "CI/CD Integration",
              description:
                "Seamlessly integrates with GitHub, GitLab, and other CI/CD pipelines to automate code quality checks before deployment.",
            },
            {
              title: "Detailed Reports & Insights",
              description:
                "Generates in-depth reports with improvement suggestions and visualizes code metrics to track quality over time.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white text-black p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 text-blue-600">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl text-black font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-black">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Features
