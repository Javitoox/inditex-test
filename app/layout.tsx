import type { Metadata } from 'next';

import Providers from '@/app/providers';
import type { PropsWithChildren } from '@/lib/types/types';

import './global.css';

export const metadata: Metadata = {
  title: 'MobileStore',
  description: 'Aplicación para comprar dispositivos móviles',
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html suppressHydrationWarning lang="es">
      <body className="bg-background text-foreground antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

RootLayout.displayName = 'RootLayout';

export default RootLayout;
