import React from "react"
import { Kanit } from "next/font/google"

const kanit = Kanit({
  weight: ["100", "200", "300", "500", "600", "700", "800", "400"],
  subsets: ["latin"],
})

const About = () => {
  return (
    <div>
      {" "}
      this ever-changing software development scenario, one needs to make sure
      that code quality is paramount. Indeed, research demonstrates that poor
      code quality makes the code 15 times more susceptible to being defective
      and requires 124% longer to correct. The Oversights in Code are being
      caught up with most of the time by Automated Code Review Tools running on
      Large Language Models, but that generally accumulates to the pull request
      cycle in the form of redundant reviews and comments. CoTest is introduced
      as an end-to-end prototype for improving code quality in continuous
      development. It integrates with hosting platforms like GitHub to provide
      automated static code analysis, social code review features, and native
      support for multiple programming languages. Thus, the aim of CoTest is to
      reduce development time even further by monitoring code complexity and
      technical debt. The technology stack employed in this architecture
      includes Next.js, Node.js, Redis, and Tailwind CSS combined with linters
      like ESLint and Pylint. Two major techniques used for this process are the
      generation of AST and tree traversal for code analysis. It followed a more
      refined rating system for quality, depending on the severity of issues.
      Preliminary results show that CoTest can parse JavaScript and Python files
      in an effective way, in that it is able to locate the errors and provide
      complete insights on the quality of code, in the hope of shaping newly
      established software practices for start-up businesses and small tech
      companies
    </div>
  )
}

export default About
