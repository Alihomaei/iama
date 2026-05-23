import type { Metadata, Viewport } from "next";
import { AppNav } from "@/components/app/app-nav";
import { PWARegister } from "@/components/app/pwa-register";

export const metadata: Metadata = {
  title: {
    default: "IAMA Meeting",
    template: "%s · IAMA Meeting",
  },
  description:
    "The official app for the 30th IAMA Annual Meeting — schedule, speakers, and your personal agenda. Washington, D.C., May 22–25, 2026.",
  icons: {
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "IAMA Meeting",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d9488",
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-foreground">
      <AppNav />
      <main className="mx-auto w-full max-w-screen-sm flex-1 px-4 pb-24 pt-4">
        {children}
      </main>
      <PWARegister />
    </div>
  );
}
