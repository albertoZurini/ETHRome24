"use client";

import { WagmiConfig } from 'wagmi';
import { wagmiConfig } from '../utils/wagmiConfig';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NavBar from '@/components/NavBar';

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <html lang="en">
          <body>
            <NavBar />
            <div className="mx-auto mt-12 w-[80%] max-w-6xl">
              {children}
            </div>
          </body>
        </html>
      </QueryClientProvider>
    </WagmiConfig>
  );
}