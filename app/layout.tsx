'use client';

import { Providers } from '@/components/providers';
import '@/styles/globals.css';
import { ReactNode } from 'react';

import { ToastContainer } from '@/components/ui';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0B0F1A" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="MJ Print" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="description" content="Solusi cetak digital berkualitas untuk kebutuhan promosi dan bisnis Anda. Cepat, murah, dan terpercaya." />
        <title>MJ Print — Solusi Cetak Digital Berkualitas</title>
      </head>
      <body className="bg-dark text-white antialiased">
        <Providers>{children}</Providers>
        <ToastContainer />
      </body>
    </html>
  );
}
