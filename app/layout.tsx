import type { Metadata } from "next";
import { LenisProvider } from "@/components/providers/lenis-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "yewyew coffee | cinematic coffee house",
  description: "A high-end cinematic web experience for yewyew coffee."
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
