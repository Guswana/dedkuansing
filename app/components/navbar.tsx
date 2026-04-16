"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { withBasePath } from "@/lib/utils/base-path"

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Cek di client side saja agar tidak merusak static export
    setIsLoggedIn(document.cookie.includes('admin_session'))
  }, [])

  // Sembunyikan tombol admin/login ketika di halaman admin
  const isAdminPage = pathname?.startsWith('/admin')

  const handleLogout = () => {
    document.cookie = 'admin_session=; max-age=0; path=/'
    window.location.href = '/'
  }

  return (
    <nav className="sticky top-0 left-0 z-50 w-full border-b border-primary/30 bg-background shadow-sm">
      <div className="flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <label
            htmlFor="app-sidebar-toggle"
            className="inline-flex h-10 w-14 items-center justify-center rounded-lg transition hover:bg-primary-100"
            aria-label="Toggle sidebar"
          >
            <Image
              src={withBasePath("/images/logo bps.png")}
              alt="Toggle sidebar"
              width={60}
              height={60}
              className="rounded-sm"
            />
          </label>

          <div className="hidden md:block">
            <div className="font-[family-name:Arial] text-base font-bold italic uppercase leading-tight text-accent">
              Badan Pusat Statistik
            </div>
            <div className="font-[family-name:Arial] text-base font-bold italic uppercase leading-tight text-accent">
              Kabupaten Kuantan Singingi
            </div>
          </div>
        </div>

        <div className="px-3 text-center">
          <div className="font-sans text-base font-black uppercase tracking-wide md:text-4xl text-primary">
            DEDIKASI
          </div>
        </div>

        <div className="flex items-center gap-2 text-neutral-700">
          <div className="hidden rounded-lg border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs md:block font-sans">
            Statistik Berkualitas
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-xs font-semibold">
            ID
          </div>
          
          {/* Tombol Admin / Kembali */}
          {!isAdminPage ? (
            isLoggedIn ? (
              <button 
                onClick={handleLogout}
                className="hidden md:flex items-center gap-2 rounded-lg border border-red-400 bg-red-50 px-3 py-1.5 text-xs text-red-700 hover:bg-red-100 transition"
              >
                Logout
              </button>
            ) : (
              <Link 
                href="/admin/login"
                className="hidden md:flex items-center gap-2 rounded-lg border border-gray-400 bg-gray-50 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100 transition"
              >
                Admin
              </Link>
            )
          ) : pathname === '/admin/login' ? (
            <Link 
              href="/"
              className="hidden md:flex items-center gap-2 rounded-lg border border-gray-400 bg-gray-50 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100 transition"
            >
              ← Kembali
            </Link>
          ) : null}
        </div>
      </div>
    </nav>
  )
}
