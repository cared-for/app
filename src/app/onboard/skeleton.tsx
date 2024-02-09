export function Skeleton() {
  return (
    <div className="flex flex-col min-h-screen bg-[#e0f0e9] items-center justify-center p-4 lg:p-32">
      <h1 className="absolute top-4 left-6 text-4xl font-bold text-[#006a4e]">CaredFor</h1>
      
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 p-6" >
        <div className="flex flex-col min-h-[400px] space-y-6 justify-between">
          <div className="gap-y-2">
            <h1 className="text-4xl font-bold text-[#155724]">
              Let&apos;s setup the people in your Care Circle
            </h1>

            <p className="text-md text-[#155724] opacity-50">
              the Care Circle will be the people who will be contacted if miss you miss a check-in 4 times in a row
            </p>
          </div>
          
          <div className="flex flex-col space-y-12 animate-pulse">
            <div className="h-6"/>
            <div className="h-6"/>
            <div className="h-6"/>
            <div className="h-6"/>
          </div>
        </div>

        {/*https://consensus.app/papers/health-risk-appraisal-people-people-living-alone-group-kharicha/32233f7a2ea25be5bf8e53fce33e3a6b/*/}
        <div className="space-y-6 hidden lg:block">
          <div className="p-6 border border-[#c3e6cb] bg-white rounded-md dark:border-slate-800">
            <p className="text-lg text-[#155724]">
              According to this <a className="text-[#67CCA0]" href="https://pubmed.ncbi.nlm.nih.gov/17394729/" target="_blank">cited paper</a> People
              living alone in the later stages of their life are at a higher risk
              of health issues

              <br/><br/>

              With CaredFor, you can have peace of mind knowing that the check-in is there,
              one call at a time
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
