'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from '@/lib/SessionProvider';
import { EdgeStoreProvider } from '@/lib/edgestore';
import { PaginationProvider } from '@/context/paginationContext';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useRouter } from 'next/navigation';
import { Toaster } from 'sonner';

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
        <AuthProvider>
          <PaginationProvider>
            <EdgeStoreProvider>
              <QueryClientProvider client={queryClient}>
                {children}
                <Toaster />
              </QueryClientProvider>
            </EdgeStoreProvider>
          </PaginationProvider>
        </AuthProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
