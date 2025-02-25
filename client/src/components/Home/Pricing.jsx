import React, { useState } from "react"
import TopLetter from "../TopLetter"

const Pricing = () => {
  const [activeTab, setActiveTab] = useState("monthly")
  return (
    <div className="flex flex-col mx-auto w-[80%] gap-9">
      <div className="container mx-auto px-4 md:px-0">
        <div className="text-center mb-16">
          <TopLetter content={"Pricing"} />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the plan that's right for your business.
          </p>

          <div className="flex justify-center mt-8">
            <div className="bg-gray-100 p-1 rounded-lg inline-flex">
              <button
                onClick={() => setActiveTab("monthly")}
                className={`px-4 py-2 rounded-md ${
                  activeTab === "monthly" ? "bg-white shadow-sm" : ""
                }`}>
                Monthly
              </button>
              <button
                onClick={() => setActiveTab("yearly")}
                className={`px-4 py-2 rounded-md ${
                  activeTab === "yearly" ? "bg-white shadow-sm" : ""
                }`}>
                Yearly <span className="text-green-500 text-sm">Save 20%</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Starter",
              price: activeTab === "monthly" ? "$29" : "$278",
              period: activeTab === "monthly" ? "/month" : "/year",
              description: "Perfect for small businesses and startups.",
              features: [
                "Up to 5 team members",
                "Basic analytics",
                "Standard support",
                "10GB storage",
                "Basic integrations",
              ],
              cta: "Get Started",
              highlight: false,
            },
            {
              name: "Professional",
              price: activeTab === "monthly" ? "$79" : "$758",
              period: activeTab === "monthly" ? "/month" : "/year",
              description: "Ideal for growing businesses and teams.",
              features: [
                "Up to 20 team members",
                "Advanced analytics",
                "Priority support",
                "50GB storage",
                "Advanced integrations",
                "Automation workflows",
              ],
              cta: "Get Started",
              highlight: true,
            },
            {
              name: "Enterprise",
              price: activeTab === "monthly" ? "$199" : "$1,910",
              period: activeTab === "monthly" ? "/month" : "/year",
              description: "For large organizations with complex needs.",
              features: [
                "Unlimited team members",
                "Custom analytics",
                "24/7 dedicated support",
                "Unlimited storage",
                "All integrations",
                "Advanced automation",
                "Custom development",
              ],
              cta: "Contact Sales",
              highlight: false,
            },
          ].map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl ${
                plan.highlight
                  ? "ring-2 ring-blue-600 shadow-lg"
                  : "border border-gray-200 shadow-sm"
              }`}>
              {plan.highlight && (
                <div className="bg-blue-600 text-white text-center py-2 rounded-t-xl">
                  Most Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#signup"
                  className={`block text-center py-3 rounded-lg ${
                    plan.highlight
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}>
                  {plan.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Pricing
