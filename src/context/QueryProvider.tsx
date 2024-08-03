// In Next.js, this file would be called: app/providers.jsx
"use client";

// We can not useState or useRef in a server component, which is why we are
// extracting this part out into it's own file with 'use client' on top
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AuthProvider from "@/lib/SessionProvider";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { PaginationProvider } from "./paginationContext";
// import { ContextProvider } from "./contextProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {/* <ContextProvider> */}
      <PaginationProvider>
        <EdgeStoreProvider>
        
          {children}
        </EdgeStoreProvider>
      </PaginationProvider>
      {/* </ContextProvider> */}
    </AuthProvider>
  );
}
