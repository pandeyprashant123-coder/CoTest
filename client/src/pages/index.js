import CTA from "@/components/Home/CTA"
import FAQs from "@/components/Home/FAQs"
import Features from "@/components/Home/Features"
import Hero from "@/components/Home/Hero"
import HowItWorks from "@/components/Home/HowItWorks"
import Pricing from "@/components/Home/Pricing"
import Testimonials from "@/components/Home/Testimonials"
import TrustedBy from "@/components/Home/TrustedBy"

export default function Home() {
  return (
    <div className="flex flex-col gap-9 font-[Inter]">
      {/* <div>
        <ImportRepo />
      </div> */}
      <div className="mt-20 min-h-[80vh] flex flex-row items-center">
        <Hero />
      </div>
      <div className="mt-20 flex flex-row min-h-[50vh] items-center">
        <TrustedBy />
      </div>
      <div className="mt-20 flex flex-row min-h-[50vh] items-center">
        <Features />
      </div>
      <div className="mt-20 flex flex-row min-h-[50vh] items-center">
        <HowItWorks />
      </div>
      <div className="mt-20 flex flex-row min-h-[50vh] items-center">
        <Pricing />
      </div>
      <div className="mt-20 flex flex-row min-h-[50vh] items-center">
        <FAQs />
      </div>
      <div className="mt-20 flex flex-row min-h-[50vh] items-center">
        <CTA />
      </div>
      <div className="mt-20 flex flex-row min-h-[50vh] items-center">
        <Testimonials />
      </div>
    </div>
  )
}
