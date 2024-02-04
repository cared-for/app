'use client'

import { useState } from "react"
import { useFormState } from "react-dom"

import type { SelectDependents } from "~/server/db/schema"

// api
import { dependentsSubmit } from "./actions"

// components
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { SubmitButton } from "~/components/ui/submitButton"

const initialState = { status: "", message: "" }
type DependentsProps = {
  dependents: SelectDependents[];
  userId: number;
}
export function Dependents({ dependents, userId }: DependentsProps) {
  const [state, formAction] = useFormState(dependentsSubmit, initialState)
  const [members, setMembers] = useState(dependents)

  return (
    <form className="flex flex-col py-6 px-8 gap-y-6 bg-[#f1f8f5] rounded-xl lg:max-h-[calc(100vh-3rem-65px)] overflow-y-auto" action={formAction}>
      <h1 className="text-3xl font-bold text-[#006a4e]" >
        Care Circle
      </h1>
      
      <input name="userId" type="hidden" value={userId} />
      <div className="flex flex-col gap-y-16">
        {members.map((dependent, i) => (
          <div className="flex flex-col gap-y-6" key={dependent.id}>
            <input name={`id-${dependent.id}`} type="hidden" value={dependent.id} />
            <div className="flex items-center justify-between h-10">
              <h1 className="text-2xl font-bold text-[#155724]">
                Care Member #{i + 1}
              </h1>
              
              {i !== 0 && (
                <Button 
                  className="bg-[#006a4e] text-white hover:bg-[#00563f]" 
                  type="button"
                  onClick={() => setMembers(prev => prev.filter(({ id }) => id !== dependent.id))}
                >
                  Remove
                </Button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-y-1">
                <label htmlFor={`fullName-${dependent.id}`} className="text-lg font-medium text-[#155724]">
                  Full Name
                </label>

                <Input
                  type="string"
                  name={`fullName-${dependent.id}`}
                  id={`fullName-${dependent.id}`}
                  defaultValue={dependent.fullName ?? ""}
                  required
                />
              </div>
             
              <div className="flex flex-col gap-y-1">
                <label className="block text-lg font-medium text-[#155724]" htmlFor={`phone-${dependent.id}`}>
                  Phone
                </label>

                <div className="flex">
                  <div className="rounded-l-lg bg-slate-50 grid place-items-center px-6 border border-[#c3e6cb] text-slate-500">
                    +1
                  </div>
                  <Input
                    className="block rounded-l-none border border-[#c3e6cb] bg-white dark:border-slate-800"
                    id={`phone-${dependent.id}`}
                    name={`phone-${dependent.id}`}
                    defaultValue={dependent.phone ? dependent.phone.replace("+1", "") : ""}
                    required
                    placeholder="Phone number"
                  />
                </div>
              </div>
            </div>

            {i === members.length - 1 && (
              <Button
                className="bg-[#006a4e] self-start text-white hover:bg-[#00563f]"
                type="button"
                onClick={() => setMembers(prev => [...prev, {
                  id: Math.random(),
                  fullName: "",
                  phone: "",
                  email: null,
                  userId: null,
                }])}
              >
                Add Care Member
              </Button>
            )}
          </div>
        ))}
      </div>

      <SubmitButton size="lg" className="bg-[#006a4e] text-md text-white hover:bg-[#00563f] mt-6 lg:min-h-10" >
        Save
      </SubmitButton>
      {state.status === "ERROR" && (
        <p className="text-red-500 text-center">{state.message}</p>
      )}
    </form>
  ) 
}
