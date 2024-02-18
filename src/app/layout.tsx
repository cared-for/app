import "~/styles/globals.css";

import { Inter } from "next/font/google";
import PlausibleProvider from 'next-plausible'

import { TRPCReactProvider } from "~/trpc/react";
import { env } from "~/env";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Cared For",
  description: "Check in system for your loved ones",
  icons: [{ rel: "icon", url: "/logo.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <PlausibleProvider domain={env.NEXT_PUBLIC_HOST} />
      </head>
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
