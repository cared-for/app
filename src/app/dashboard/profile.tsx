'use client'

import { useFormState } from 'react-dom'

import type { SelectUser } from '~/server/db/schema'
import { profileSubmit } from './actions'

// components
import { Input } from '~/components/ui/input'
import { SubmitButton } from '~/components/ui/submitButton'

const initialState = { status: "", message: "" }
export function Profile({ isDependent, ...user }: SelectUser & { isDependent: boolean }) {
  const [state, formAction] = useFormState(profileSubmit, initialState)

  return (
    <form className="flex flex-col py-6 px-8 gap-y-6 bg-[#f1f8f5] rounded-xl" action={formAction}>
      <h1 className="text-3xl font-bold text-[#006a4e]" >
        Your Information
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <input name="id" type="hidden" value={user.id} />
        <div className="flex flex-col gap-y-1">
          <label htmlFor="fullName" className="text-lg font-medium text-[#155724]">
            Full Name
          </label>

          <Input
            type="string"
            name="fullName"
            id="fullName"
            defaultValue={user.fullName ?? ""}
            required
          />
        </div>

        <div className="flex flex-col gap-y-1">
          <label htmlFor="email" className="text-lg font-medium text-[#155724]">
            Email
          </label>

          <Input
            type="email"
            name="email"
            id="email"
            defaultValue={user.email ?? ""}
            readOnly={!isDependent}
            className={`${!isDependent ? "bg-slate-200 opacity-50" : "bg-white"} border border-[#c3e6cb] dark:border-slate-800`}
          />
        </div>
      </div>
     
      <div className="flex flex-col gap-y-1 lg:col-span-2">
        <label className="block text-lg font-medium text-[#155724]" htmlFor="phone">
          Phone
        </label>

        <div className="flex">
          <div className="rounded-l-lg bg-slate-50 grid place-items-center px-6 border border-[#c3e6cb] text-slate-500">
            +1
          </div>
          <Input
            className="block rounded-l-none border border-[#c3e6cb] bg-white dark:border-slate-800"
            id="phone"
            name="phone"
            defaultValue={user.phone ? user.phone.replace("+1", "") : ""}
            required
            placeholder="Phone number"
          />
        </div>
      </div>

      <SubmitButton size="lg" className="bg-[#006a4e] text-md text-white hover:bg-[#00563f]" >
        Save
      </SubmitButton>
      {state.status === "ERROR" && (
        <p className="text-red-500 text-center">{state.message}</p>
      )}
    </form>
  )
}

