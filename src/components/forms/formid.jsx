"use client"

import * as React from "react"
import {
  FormProvider,
  useFormContext,
  Controller
} from "react-hook-form"
import { cn } from "@/lib/utils"

export function Form({ children, ...props }) {
  return <FormProvider {...props}>{children}</FormProvider>
}

export function FormField({ name, control, render }) {
  return <Controller name={name} control={control} render={render} />
}

export function FormItem({ className, ...props }) {
  return <div className={cn("space-y-1", className)} {...props} />
}

export function FormLabel({ className, ...props }) {
  return (
    <label
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    />
  )
}

export function FormControl({ className, ...props }) {
  return (
    <div className={cn("flex flex-col", className)} {...props} />
  )
}

export function FormMessage({ className, ...props }) {
  const { errors } = useFormContext()
  return (
    <p className={cn("text-sm text-red-600", className)} {...props} />
  )
}
