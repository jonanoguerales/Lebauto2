"use client"

import type React from "react"

// Adaptado de shadcn/ui toast
import { useState, useEffect, useCallback } from "react"

export type ToastProps = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

export type ToastActionElement = React.ReactElement

export const TOAST_REMOVE_DELAY = 3000

export type ToasterToast = ToastProps & {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function generateId() {
  return `${count++}`
}

export function useToast() {
  const [toasts, setToasts] = useState<ToasterToast[]>([])

  const dismiss = useCallback((toastId?: string) => {
    setToasts((toasts) =>
      toasts.map((toast) =>
        toast.id === toastId || toastId === undefined
          ? {
              ...toast,
              open: false,
            }
          : toast,
      ),
    )
  }, [])

  const toast = useCallback(
    ({ ...props }: Omit<ToasterToast, "id">) => {
      const id = generateId()

      const newToast = {
        ...props,
        id,
        open: true,
        onOpenChange: (open: boolean) => {
          if (!open) dismiss(id)
        },
      }

      setToasts((toasts) => [...toasts, newToast])

      return id
    },
    [dismiss],
  )

  const update = useCallback((id: string, props: Partial<ToasterToast>) => {
    setToasts((toasts) => toasts.map((toast) => (toast.id === id ? { ...toast, ...props } : toast)))
  }, [])

  const remove = useCallback((toastId?: string) => {
    setToasts((toasts) => toasts.filter((toast) => toast.id !== toastId))
  }, [])

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = []

    toasts.forEach((toast) => {
      if (!toast.open) {
        const timeout = setTimeout(() => {
          remove(toast.id)
        }, TOAST_REMOVE_DELAY)

        timeouts.push(timeout)
      }
    })

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout))
    }
  }, [toasts, remove])

  return {
    toast,
    dismiss,
    toasts,
    update,
    remove,
  }
}

