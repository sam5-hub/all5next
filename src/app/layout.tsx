import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import NextTopLoader from "nextjs-toploader";
import { cn } from '@/lib/utils'

const font = DM_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
	metadataBase: new URL("https://all5.pro/"),

	title: {
		template: "%s | ALL5 Studio",
		default: "ALL5 Studio",
	},
	authors: {
		name: "Sam Wuu",
	},

	description:
		"Explore a world of captivating stories and insightful articles on ALL5 Studio. From the latest trends to in-depth analyses, our blog covers a wide range of topics to keep you informed and entertained. Join our community of readers and discover thought-provoking content that sparks curiosity and fosters discussion. Stay updated with our diverse collection of blog posts, written by passionate contributors who share their expertise and unique perspectives. Engage with a platform that goes beyond the ordinary, providing you with enriching content that resonates with your interests.",
	openGraph: {
		title: "ALL5 Studio",
		description:
			"Explore a world of captivating stories and insightful articles on our blog. From the latest trends to in-depth analyses, our blog covers a wide range of topics to keep you informed and entertained. Join our community of readers and discover thought-provoking content that sparks curiosity and fosters discussion. Stay updated with our diverse collection of blog posts, written by passionate contributors who share their expertise and unique perspectives. Engage with a platform that goes beyond the ordinary, providing you with enriching content that resonates with your interests.",
		url: "https://all5.pro/",
		siteName: "ALL5 Studio",
		images: "/seo/og.png",
		type: "website",
	},
	keywords: ["Node JS", "Next JS", "Next AI"],
};

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
    <body className={cn(font.className)}>
        
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
