import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const neueMetana = localFont({
  src: [
    {
      path: "../NeueMetanaNext-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../NeueMetanaNextOutline-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-neue-metana",
});

export const metadata: Metadata = {
  title: "Mozcyber",
  description: "Site em manutenção",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${neueMetana.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-neue-metana)]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
