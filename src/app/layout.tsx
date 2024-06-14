import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import NextTopLoader from "nextjs-toploader";

const font = DM_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ALL5.Studio',
  description: 'AI Your Work With ALL5.Studio.',
  icons: ""
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icons/airbrakedotio.svg" sizes="any" />
      </head>
    <body className={font.className}>
        
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
         <NextTopLoader />
         {children}
         <Toaster />
      </ThemeProvider>
    </body>
  </html>
  );
}
