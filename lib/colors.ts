// File warna terpusat - semua kode warna disimpan disini
// Semua warna bisa dipanggil dengan class Tailwind seperti bg-primary, text-primary-foreground, dll.

export const COLORS = {
  // Warna utama
  primary: {
    DEFAULT: 'oklch(0.71 0.18 65.6)', // #E88132 - Oranye Utama
    foreground: 'oklch(1 0 0)', // Putih
    50: 'oklch(0.98 0.03 75.8)',
    100: 'oklch(0.95 0.07 75.8)',
    200: 'oklch(0.90 0.12 75.8)',
    300: 'oklch(0.83 0.15 75.8)', // #FBAF5D - Oranye Muda
    400: 'oklch(0.77 0.17 70.7)',
    500: 'oklch(0.71 0.18 65.6)', // #E88132
    600: 'oklch(0.65 0.18 60.5)',
    700: 'oklch(0.58 0.17 55.4)',
    800: 'oklch(0.50 0.15 50.3)',
    900: 'oklch(0.42 0.12 45.2)',
  },

  // Warna sekunder
  secondary: {
    DEFAULT: 'oklch(0.83 0.15 75.8)', // #FBAF5D - Oranye Muda
    foreground: 'oklch(0.25 0 0)', // Cokelat Gelap
  },

  // Warna aksen
  accent: {
    DEFAULT: 'oklch(0.62 0.18 236.8)', // #00A1E4 - Biru BPS
    foreground: 'oklch(1 0 0)', // Putih
  },

  // Warna background
  background: 'oklch(0.97 0.01 83.4)', // #F9F4EE - Krem Lembut
  foreground: 'oklch(0.25 0 0)', // #333333 - Cokelat Gelap

  // Warna border
  border: 'oklch(0.85 0.04 75.8)', // Oranye sangat muda

  // Warna gradient
  gradient: {
    primary: 'linear-gradient(to right, #E88132, #FBAF5D)',
  },

  // Warna transparan
  transparent: {
    primary: 'rgba(232, 129, 50, 0.12)',
    secondary: 'rgba(251, 175, 93, 0.08)',
    border: 'rgba(232, 129, 50, 0.3)',
    borderLight: 'rgba(232, 129, 50, 0.5)',
    background: 'rgba(251, 175, 93, 0.3)',
  }
} as const

// Type untuk warna
export type ColorKey = keyof typeof COLORS
export type PrimaryColorShade = keyof typeof COLORS.primary
