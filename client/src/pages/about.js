import React from "react"
import { Kanit } from "next/font/google"
import Head from "next/head"

const kanit = Kanit({
  weight: ["100", "200", "300", "500", "600", "700", "800", "400"],
  subsets: ["latin"],
})

const About = () => {
  return (
    <>
      <Head>
        <title>About Page | CoTest</title>
        <meta property="og:description" content="A good about page" />
      </Head>
      <div
        className={`${kanit.className} w-[60%] mx-auto py-20 text-lg text-center`}>
        <h3 className="text-center text-3xl mb-10">About Us</h3>
        <div className="flex flex-col gap-10">
          <div>
            In this ever-changing software development scenario, one needs to
            make sure that code quality is paramount. Indeed, research
            demonstrates that poor code quality makes the code 15 times more
            susceptible to being defective and requires 124% longer to correct.
            The Oversights in Code are being caught up with most of the time by
            Automated Code Review Tools running on Large Language Models, but
            that generally accumulates to the pull request cycle in the form of
            redundant reviews and comments. CoTest is introduced as an
            end-to-end prototype for improving code quality in continuous
            development. It integrates with hosting platforms like GitHub to
            provide automated static code analysis, social code review features,
            and native support for multiple programming languages. Thus, the aim
            of CoTest is to reduce development time even further by monitoring
            code complexity and technical debt. The technology stack employed in
            this architecture includes Next.js, Node.js, Redis, and Tailwind CSS
            combined with linters like ESLint and Pylint. Two major techniques
            used for this process are the generation of AST and tree traversal
            for code analysis. It followed a more refined rating system for
            quality, depending on the severity of issues. Preliminary results
            show that CoTest can parse JavaScript and Python files in an
            effective way, in that it is able to locate the errors and provide
            complete insights on the quality of code, in the hope of shaping
            newly established software practices for start-up businesses and
            small tech companies.
          </div>
          <div>
            Software companies and startups, in a world where software
            development evolves fast, end up with several predicaments that
            attack them in a triple onslaught to maintain the quality of code in
            payback technical debts and have security assured. Technical debts
            may lower the pace of development and, hence, not meet deadlines or
            condi- tions in the market. Most probably, Developers may spend more
            time fixing a backlog of issues caused by technical debt, leaving
            less time for new feature development and innovation. Code Review
            Automation is a way to relieve reviewers of routine eval- uations
            and give automatic feedback at review time. Such problems mostly
            contribute to a high cost of development, long project realization
            time, and that software being insecure and reduced in performance.
            In this regard, smaller teams face more errors and breaches in the
            code, since it is tough for them to properly caters to in-depth code
            reviews and vulnerability assessments at the stage of developing a
            product—especially for the startups in the question. Hence, for
            start-ups and companies with a small team, this might result in
            shored loss of time and capital. Therefore, one needs to put into
            these companies advanced code analysis tools, which will provide
            actionable insights and automate quality assurance procedures.
            Failing to lead on this results in creativity and development
            stifling.
          </div>
        </div>
      </div>
    </>
  )
}

export default About
