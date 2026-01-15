'use client';

import { HeroUIProvider } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

import { CartProvider } from '@/app/providers/CartProvider';
import { ToastProvider } from '@/components/providers/ToastProvider';
import type { PropsWithChildren } from '@/lib/types/types';

const Providers = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider attribute="class" defaultTheme="system">
        <CartProvider>
          {children}
          <ToastProvider />
        </CartProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
};

export default Providers;
