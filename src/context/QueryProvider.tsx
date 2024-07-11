// In Next.js, this file would be called: app/providers.jsx
"use client"

// We can not useState or useRef in a server component, which is why we are
// extracting this part out into it's own file with 'use client' on top
import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { SessionProvider } from "next-auth/react"
import AuthProvider from "@/lib/SessionProvider"

export default function Providers({ children }: { children: React.ReactNode }) {
  
const queryClient = new QueryClient();
  

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        {children}
      </QueryClientProvider>
    </AuthProvider>
  )
}