import CTA from "@/components/Home/CTA"
import FAQs from "@/components/Home/FAQs"
import Features from "@/components/Home/Features"
import Hero from "@/components/Home/Hero"
import HowItWorks from "@/components/Home/HowItWorks"
import Pricing from "@/components/Home/Pricing"
import Testimonials from "@/components/Home/Testimonials"
import TrustedBy from "@/components/Home/TrustedBy"
import { Inter, Phudu, Merriweather, Kanit, Roboto } from "next/font/google"

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["latin"] })
const phudu = Phudu({ subsets: ["latin"] })
const roboto = Roboto({ weight: ["100",  "300", "500",  "700",  "400"],subsets: ["latin"] })
const kanit = Kanit({
  weight: ["100", "200", "300", "500", "600", "700", "800", "400"],
  subsets: ["latin"],
})
const merriweather = Merriweather({ weight: ["400"], subsets: ["latin"] })

export default function Home() {
  return (
    <div
      className={`flex flex-col gap-9 font-phudu w-[80%] mx-auto ${kanit.className}`}>
      {/* <div>
        <ImportRepo />
      </div> */}
      <div className="py-20 min-h-[100vh] flex flex-row items-center ">
        <Hero />
      </div>
      {/* <div className="w-full border-t my-20 gradient-hero z-[60]"></div> */}
      <div className="mt-20 flex flex-row  items-center">
        <TrustedBy />
      </div>
      <div className="w-full border-t my-20 gradient-hero z-[60]"></div>

      <div className="py-20 flex flex-row  items-center">
        <Features />
      </div>
      <div className="w-full border-t my-20 gradient-hero z-[60]"></div>

      <div className="py-20 flex flex-row  items-center">
        <HowItWorks />
      </div>
      <div className="w-full border-t my-20 gradient-hero z-[60]"></div>

      <div className="py-20 flex flex-row  items-center">
        <Pricing />
      </div>
      <div className="w-full border-t my-20 gradient-hero z-[60]"></div>

      <div className="py-20 flex flex-row  items-center">
        <FAQs />
      </div>
      <div className="w-full border-t my-20 gradient-hero z-[60]"></div>

      <div className="py-20 flex flex-row  items-center">
        <CTA />
      </div>
      <div className="w-full border-t my-20 gradient-hero z-[60]"></div>

      <div className="py-20 flex flex-row  items-center">
        <Testimonials />
      </div>
    </div>
  )
}
