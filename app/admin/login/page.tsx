"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Navbar from "@/app/components/navbar"
import { login } from "@/app/actions/auth"

export default function AdminLoginPage() {
  const [error, setError] = useState("")
  
  useEffect(() => {
    // Ambil error dari URL query param secara client side
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('error')) {
      setError("Username atau password salah")
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Login Admin</h1>
              <p className="text-gray-600 text-sm">Masukkan kredensial admin</p>
            </div>

            {error && (
              <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700 border border-red-200">
                {error}
              </div>
            )}

            <form action={login} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  name="username"
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-primary py-2.5 text-white font-medium hover:bg-primary/90 transition"
              >
                Login
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/" className="text-sm text-gray-600 hover:text-primary">
                ← Kembali ke Beranda
              </Link>
            </div>

            <div className="mt-4 rounded-lg bg-blue-50 p-3 text-xs text-blue-700 border border-blue-200">
              <p className="font-medium">Demo Credential:</p>
              <p>Username: admin</p>
              <p>Password: admin123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
