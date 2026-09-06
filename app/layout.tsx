import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "./Providers";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});
export const metadata: Metadata = {
  title: "Flowstate",
  description: "A web based productivity tracker",

  openGraph: {
    title: "flowstate",
    description: "A web based productivity tracker",
    url: "https://flowstatee.vercel.app/",
    siteName: "My App",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FLowstate",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flowstate",
    description: "A web based productivity tracker",
    images: ["/og-image.png"],
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
           {children}
        </Providers>
       </body>
    </html>
  );
}
