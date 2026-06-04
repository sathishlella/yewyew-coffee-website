import type { Metadata } from "next";
import { LenisProvider } from "@/components/providers/lenis-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "yewyew coffee | a quiet pause in the noise",
  description: "A room for people who remember that coffee is not just caffeine. It is a pause, a small ceremony, a way to let the day speak more gently in Kuala Lumpur."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-display">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
