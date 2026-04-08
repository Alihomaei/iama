import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "IAMA - Iranian American Medical Association",
    template: "%s | IAMA",
  },
  description:
    "The Iranian American Medical Association (IAMA) advances healthcare excellence through education, advocacy, and community. Join our network of physicians, researchers, and medical professionals.",
  keywords: [
    "Iranian American Medical Association",
    "IAMA",
    "medical association",
    "physician network",
    "medical congress",
    "CME",
    "healthcare",
  ],
  openGraph: {
    title: "IAMA - Iranian American Medical Association",
    description:
      "Advancing healthcare excellence through education, advocacy, and community.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
