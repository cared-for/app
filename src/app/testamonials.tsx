import { Star } from "lucide-react"
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "~/components/ui/carousel"

const testamonials1 = [
  {
    name: "Emma P.",
    image: "/testamonial-1.png",
    message: "This service offers peace of mind to everyone involved, it's a wonderful idea and worthwhile service. Love it!!",
  },
  {
    name: "Bruce L.",
    image: "/testamonial-2.png",
    message: "I have forgotten to check in a couple of times and my sons have been notified and I was contacted just as I should have been.",
  },
  {
    name: "Cheryl S.",
    image: "/testamonial-3.png",
    message: "As an active person living alone, I like the reassurance that someone would know if I needed help. My daughter likes the security of knowing she would be contacted if I did not answer the morning call. Thanks, CaredFor",
  },
  {
    name: "Stephen T.",
    image: "/testamonial-4.png",
    message: "Very convenient and I don't have to worry about getting help if I have a problem",
  },
  {
    name: "Linda J.",
    image: "/testamonial-5.png",
    message: "So far, I can't say enough about the service. It's a great Idea & I wish I had thought of it. The 2 week trial was the kicker! I'm hooked & I look forward to my daily call.",
  },
  {
    name: "Catherine S.",
    image: "/testamonial-6.png",
    message: "This service makes me feel very self assured that I will get that phone call at my appointed time seven days a week. I recommend this service to everyone.",
  },
]


const testamonials2 = [
  {
    name: "Emma P.",
    image: "/testamonial-1.png",
    message: "This service offers peace of mind to everyone involved, it's a wonderful idea and worthwhile service. Love it!!",
  },
  {
    name: "Bruce L.",
    image: "/testamonial-2.png",
    message: "I have forgotten to check in a couple of times and my sons have been notified and I was contacted just as I should have been.",
  },
  {
    name: "Cheryl S.",
    image: "/testamonial-3.png",
    message: "As an active person living alone, I like the reassurance that someone would know if I needed help. My daughter likes the security of knowing she would be contacted if I did not answer the morning call. Thanks, CaredFor",
  },
  {
    name: "Stephen T.",
    image: "/testamonial-4.png",
    message: "Very convenient and I don't have to worry about getting help if I have a problem",
  },
  {
    name: "Linda J.",
    image: "/testamonial-5.png",
    message: "So far, I can't say enough about the service. It's a great Idea & I wish I had thought of it. The 2 week trial was the kicker! I'm hooked & I look forward to my daily call.",
  },
  {
    name: "Catherine S.",
    image: "/testamonial-6.png",
    message: "This service makes me feel very self assured that I will get that phone call at my appointed time seven days a week. I recommend this service to everyone.",
  },
]

export default function Testamonials() {
  return (
    <section className="flex flex-col p-6" id="testimonials">
      <div className="flex flex-col items-center container px-0 md:px-6 gap-y-16">
        <h2 className="text-3xl font-bold tracking-tighter text-[#006a4e] sm:text-4xl md:text-5xl lg:text-6xl/none text-center">
          Listen to what people have to say
        </h2>

        <div className="flex flex-nowrap overflow-hidden whitespace-nowrap scroller w-full">
          <div className="flex animate-side-scroll">
            {testamonials1.map((testamonial, i) => (
              <div className="flex flex-col items-center space-y-4 mx-6" key={i} >
                <div className="flex gap-x-6 items-center">
                  <img
                    alt="Senior Illustration"
                    className="w-20 h-20 rounded-full"
                    src={testamonial.image}
                  />

                  <div className="flex flex-col gap-y-1">
                    <h3 className="text-xl font-bold text-[#006a4e]">{testamonial.name}</h3>
                    <div className="flex gap-x-1">
                      {[...Array(5).keys()].map((_, i) => (
                        <Star fill="#006a4e" key={i} className="h-5 w-5 text-[#006a4e]" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-gray-500 text-lg text-center bg-[#F1F8F5] p-6 rounded-2xl whitespace-break-spaces w-[500px]">
                  "{testamonial.message}"
                </div>
              </div>
            ))}
          </div>

          <div className="flex animate-side-scroll">
            {testamonials1.map((testamonial, i) => (
              <div className="flex flex-col items-center space-y-4 mx-6" key={i} >
                <div className="flex gap-x-6 items-center">
                  <img
                    alt="Senior Illustration"
                    className="w-20 h-20 rounded-full"
                    src={testamonial.image}
                  />

                  <div className="flex flex-col gap-y-1">
                    <h3 className="text-xl font-bold text-[#006a4e]">{testamonial.name}</h3>
                    <div className="flex gap-x-1">
                      {[...Array(5).keys()].map((_, i) => (
                        <Star fill="#006a4e" key={i} className="h-5 w-5 text-[#006a4e]" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-gray-500 text-lg text-center bg-[#F1F8F5] p-6 rounded-2xl whitespace-break-spaces w-[500px]">
                  "{testamonial.message}"
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
