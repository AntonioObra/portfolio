import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter, Noto_Sans, Poppins } from "next/font/google";

import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@/components/Analytics";

import { cn } from "@/lib/utils";

import { siteConfig } from "@/config/site";

// const inter = Inter({ subsets: ["latin"] });
// const notoSans = Noto_Sans({
//   subsets: ["latin", "latin-ext"],
//   weight: ["400", "500", "600", "700"],
// });
const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const fontHeading = localFont({
  src: "../assets/fonts/DankMono-Bold.woff2",
  variable: "--font-heading",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://obradovic.dev"),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "obradovic",
    "antonio obradovic",
    "Antonio Obradović",
    "portfolio",
    "obradovic.dev",
    "antonio obradovic portfolio",
    "antonio obradovic website",
    "Next.js",
    "React",
    "web development",
    "web developer",
  ],
  authors: [
    {
      name: "Antonio Obradović",
      url: "https://obradovic.dev",
    },
  ],
  creator: "Antonio Obradović",
  publisher: "Antonio Obradović",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@obradovicdotdev",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark [color-scheme:dark]">
      <head suppressHydrationWarning />
      <body
        className={cn(
          poppins.className,
          fontHeading.variable,
          "min-h-screen bg-background antialiased"
        )}
      >
        <Navbar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
