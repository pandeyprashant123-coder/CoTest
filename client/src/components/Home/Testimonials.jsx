import React from "react"
import TopLetter from "../TopLetter"

const Testimonials = () => {
  return (
    <div className="flex flex-col mx-auto w-[80%] gap-9">
      <div className="container mx-auto px-4 md:px-0">
        <TopLetter content={"Testimonials"} />
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold  mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-100 max-w-2xl mx-auto">
            Don't just take our word for it. See what our customers have
            achieved with our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote:
                "This platform has transformed how we manage our business. The analytics tools have been invaluable for our decision-making process.",
              author: "Sarah Johnson",
              role: "CEO, TechStart Inc.",
            },
            {
              quote:
                "The automation features have saved us countless hours of manual work. Our team productivity has increased by 40% since we started using this platform.",
              author: "Michael Chen",
              role: "Operations Director, GrowFast",
            },
            {
              quote:
                "Customer support is outstanding. Any issue we've had has been resolved quickly and efficiently. Highly recommend for any growing business.",
              author: "Emily Rodriguez",
              role: "Marketing Manager, BrandUp",
            },
          ].map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="mb-4 text-yellow-400 flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-gray-100 mb-6 italic">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                <div>
                  <h4 className="font-semibold">{testimonial.author}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Testimonials
