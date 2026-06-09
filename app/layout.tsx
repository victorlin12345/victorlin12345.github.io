import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "PAOYEE — Curated Timepieces",
  description:
    "A curated selection of the world's finest luxury timepieces. Book a private viewing experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" data-theme="dark" className={`${inter.variable} h-full`}>
      <body className="min-h-full antialiased font-[family-name:var(--font-inter)]">
        {children}
      </body>
    </html>
  );
}
