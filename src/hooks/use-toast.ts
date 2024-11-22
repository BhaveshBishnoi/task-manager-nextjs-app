"use client"

// Inspired by react-hot-toast library
import * as React from "react"

import { Toast, ToastActionElement, ToastProps } from "@/components/ui/toast"
import {
  toast as sonnerToast,
  ToastOptions,
} from "@/components/ui/use-toast"

type ToasterToast = ToastProps & {
  id: string
  title?: string
  description?: string
  action?: ToastActionElement
}

const useToast = () => {
  const toast = (props: ToastOptions) => {
    sonnerToast(props)
  }

  return { toast }
}

export { useToast }
