import type { Metadata } from "next";
import { JetBrains_Mono, Merriweather, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
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
        className={`${plusJakartaSans.variable} ${merriweather.variable} ${jetBrainsMono.variable} min-h-screen bg-orange-50 text-stone-900 antialiased`}
      >
        <FiltersProvider>
          {children}
        </FiltersProvider>
      </body>
    </html>
  )
}
