import { Phone, MessageCircleWarning, Clock } from "lucide-react"

export default function HowItWorks() {
  return (
    <section className="p-6 max-w-[1200px] self-center" id="how-it-works">
      <div className="container px-4 md:px-6 space-y-16">
        <h2 className="text-5xl font-bold tracking-tighter text-[#006a4e] md:text-5xl lg:text-6xl/none text-center">
          How It Works
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          <div className="flex flex-col gap-y-6 text-center">
            <Phone className="h-[200px] w-[200px] lg:h-[200px] lg:w-[200px] text-[#006a4e] self-center place-self-center bg-[#F1F8F5] p-6 rounded-xl" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#006a4e]">Get Notified</h2>
            <p className="text-gray-500 text-md lg:text-lg break-normal">
              A call will be made to you at the same time every day at the time you choose.<br/>
              You answer the phone and press &quot;1&quot; <br/><span className="font-bold">that&apos;s it!</span><br/>
              You are now checked in for the day.
            </p>
          </div>
          
          <div className="flex flex-col gap-y-6 text-center">
            <Clock className="h-[200px] w-[200px] lg:h-[200px] lg:w-[200px] text-[#006a4e] self-center place-self-center bg-[#F1F8F5] p-6 rounded-xl" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#006a4e] break-normal">Missed a Call?</h2>
            <p className="text-gray-500 text-md lg:text-lg">
             No worries! You'll get another call again in 15 minutes.
             These follow up calls will happen 4 times over the course of an hour until you check in.
            </p>
          </div>

          <div className="flex flex-col gap-y-6 text-center">
            <MessageCircleWarning className="h-[200px] w-[200px] lg:h-[200px] lg:w-[200px] text-[#006a4e] self-center place-self-center bg-[#F1F8F5] p-6 rounded-xl" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#006a4e] break-normal">No Answer!</h2>
            <p className="text-gray-500 text-md lg:text-lg">
             If you miss your check-in 4 times in a row, the people in your care circle will be notified of your missed check-in.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}



// export default function HowItWorks() {
//   return (
//     <section className="py-12 md:py-24 lg:py-32 max-w-[1200px] self-center" id="how-it-works">
//       <div className="container px-4 md:px-6 space-y-16 lg:space-y-28">
//         <h2 className="text-5xl font-bold tracking-tighter text-[#006a4e] md:text-5xl lg:text-6xl/none text-center">
//           How It Works
//         </h2>
//
//         {/*<div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">*/}
//         <div className="flex flex-col gap-6">
//           <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-32">
//             <div className="grid place-self-center lg:place-self-end place-items-center p-6 bg-[#F1F8F5] h-[300px] w-[300px] lg:h-[400px] lg:w-[400px] rounded-xl">
//               <Phone className="h-[200px] w-[200px] lg:h-[300px] lg:w-[300px] text-[#006a4e] self-center place-self-center" />
//             </div>
//             <div className="flex flex-col gap-y-4 justify-center text-center lg:text-left p-6 lg:p-0 max-w-[450px]">
//               <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#006a4e]">Get Notified</h2>
//               <p className="text-gray-500 text-lg lg:text-xl">
//                 A call will be made to you at the same time every day at the time you choose.<br/>
//                 You answer the phone and <span className="font-bold">press &quot;1&quot; and that&apos;s it!</span><br/>
//                 You are now checked in for the day.
//               </p>
//             </div>
//           </div>
//         </div>
//
//         <div className="flex flex-col gap-6">
//           <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-32">
//             <div className="grid place-self-center lg:place-self-start place-items-center p-6 bg-[#F1F8F5] h-[300px] w-[300px] lg:h-[400px] lg:w-[400px] rounded-xl lg:order-last">
//               <Clock className="h-[200px] w-[200px] lg:h-[300px] lg:w-[300px] text-[#006a4e] self-center place-self-center" />
//             </div>
//             <div className="flex flex-col gap-y-4 justify-center text-center lg:text-left p-6 lg:p-0 max-w-[450px]">
//               <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#006a4e]">Missed a call?</h2>
//               <p className="text-gray-500 text-lg lg:text-xl">
//                 No worries! You'll get another call again in 15 minutes.<br/>
//                 These follow up calls will happen 4 times over the course of an hour until you check in.
//               </p>
//             </div>
//           </div>
//         </div>
//
//         <div className="flex flex-col gap-6">
//           <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-32">
//             <div className="grid place-self-center lg:place-self-end place-items-center p-6 bg-[#F1F8F5] h-[300px] w-[300px] lg:h-[400px] lg:w-[400px] rounded-xl">
//               <MessageCircleWarning className="h-[200px] w-[200px] lg:h-[300px] lg:w-[300px] text-[#006a4e] self-center place-self-center" />
//             </div>
//             <div className="flex flex-col gap-y-4 justify-center text-center lg:text-left p-6 lg:p-0 max-w-[450px]">
//               <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#006a4e]">Still not answering?</h2>
//               <p className="text-gray-500 text-lg lg:text-xl">
//                 If you miss your check-in 4 times in a row, the people in your care circle will be sent a text,
//                 being notified of your missed check-in.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }
