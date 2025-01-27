import Hero from "@/components/Home/Hero"
import TrustedBy from "@/components/Home/TrustedBy"

export default function Home() {
  return (
    <div className="flex flex-col gap-9 font-[Inter]">
      {/* <div>
        <ImportRepo />
      </div> */}
      <div className="mt-20 h-[30vh] flex flex-row items-center">
        <Hero />
      </div>
      <div className="mt-20 flex flex-row items-center">
        <TrustedBy />
      </div>
    </div>
  )
}
