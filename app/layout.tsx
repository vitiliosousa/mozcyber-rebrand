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
  description: "Comunidade de cibersegurança em Moçambique",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt"
      className={`${neueMetana.variable} scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-dvh font-[family-name:var(--font-neue-metana)] text-white"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
