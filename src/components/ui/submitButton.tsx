'use client'

import * as React from "react"
import { useFormStatus } from "react-dom"
import { Button, type ButtonProps } from "./button"
import { Spinner } from "./spinner"

import { cn } from "~/lib/utils"

const SubmitButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ...props }, ref) => {
    const { pending } = useFormStatus()

    if (pending) {
      return <Button 
        {...props}
        className={cn(className, "flex items-center justify-center gap-x-1")}
        disabled
        ref={ref}
        type="submit"
      >
        {children}
        <Spinner />
      </Button>
    }
    
    return (
      <Button 
        {...props}
        className={className}
        ref={ref}
        type="submit"
      >
        {children}
      </Button>
    )
  }
)

SubmitButton.displayName = "Button"

export { SubmitButton }
