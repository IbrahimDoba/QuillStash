'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { EdgeStoreProvider } from '@/lib/edgestore';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useRouter } from 'next/navigation';
import { Toaster } from 'sonner';
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const queryClient = new QueryClient();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        <SessionProvider>
            <EdgeStoreProvider>
              <QueryClientProvider client={queryClient}>
                {children}
                <Toaster />
              </QueryClientProvider>
            </EdgeStoreProvider>
        </SessionProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
