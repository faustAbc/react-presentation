import { WebContainerCSS } from "@/components/common/WebContainer/WebContainerCSS";
import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { GlobalStateProvider } from "@/state";
import clsx from "clsx";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Test",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <WebContainerCSS />
      </head>
      <body className={clsx(montserrat.className)}>
        <GlobalStateProvider>{children}</GlobalStateProvider>
      </body>
    </html>
  );
}
