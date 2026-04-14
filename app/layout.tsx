import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard Ekonomi Digital Kuansing | BPS Kabupaten Kuantan Singingi",
  description: "Dashboard Ekonomi Digital Kuansing - portal statistik resmi Badan Pusat Statistik Kabupaten Kuantan Singingi",
};

import { FiltersProvider } from "@/store/filters-context"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body
        className={`${inter.variable} ${jetBrainsMono.variable} min-h-screen bg-background text-neutral-900 antialiased`}
      >
        <FiltersProvider>
          {children}
        </FiltersProvider>
      </body>
    </html>
  )
}
