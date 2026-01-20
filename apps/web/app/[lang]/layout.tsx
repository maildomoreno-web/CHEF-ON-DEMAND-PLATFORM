import { Cormorant_Garamond, Source_Sans_3 } from 'next/font/google';
import "../globals.css";
import React from 'react';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  
  return (
    <html lang={resolvedParams.lang} className={`${cormorant.variable} ${sourceSans.variable}`}>
      <body className="bg-black antialiased text-white">
        {children}
      </body>
    </html>
  );
}