import Image from "next/image"
import Navbar from "./components/navbar"
import Sidebar from "./components/sidebar"
import BusinessStatsDashboard from "./components/business-stats-dashboard"
import Footer from "./components/footer"
import { loadDashboardData } from "@/lib/data/load-dashboard-data"
import { withBasePath } from "@/lib/utils/base-path"

export default async function Home() {
  const data = await loadDashboardData()
  const highlights = [
    "Memberi gambaran umum persebaran usaha digital.",
    "Memudahkan evaluasi persebaran usaha digital.",
  ]

  return (
    <main className="min-h-screen bg-orange-50">
      <Navbar />

      <div className="flex min-h-[calc(100vh-5rem)]">
        <input
          id="app-sidebar-toggle"
          type="checkbox"
          defaultChecked
          className="peer/sidebar sr-only"
        />

        <label
          htmlFor="app-sidebar-toggle"
          className="fixed inset-0 z-30 bg-black/35 opacity-0 transition-opacity peer-checked/sidebar:opacity-100 peer-checked/sidebar:pointer-events-auto pointer-events-none lg:hidden"
        />

        <div className="fixed top-20 bottom-0 left-0 z-40 w-[320px] -translate-x-full transition-transform duration-300 peer-checked/sidebar:translate-x-0 lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] lg:w-0 lg:translate-x-0 lg:overflow-hidden lg:peer-checked/sidebar:w-[320px]">
          <Sidebar />
        </div>

        <section className="min-w-0 flex-1 px-3 py-4 md:px-5">
          <div className="rounded-2xl border border-orange-200/80 bg-orange-50/65 p-4 md:p-5">
            <section className="relative mb-6 overflow-hidden rounded-2xl border border-orange-200/90">
              <Image
                src={withBasePath("/images/img1.jpeg")}
                alt="Kegiatan statistik BPS"
                width={1200}
                height={450}
                className="h-52 w-full object-cover md:h-70"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-900/80 via-orange-800/55 to-transparent" />
              <div className="absolute inset-0 p-5 md:p-7">
                <h1 className="mt-3 max-w-2xl font-[family-name:var(--font-heading)] text-xl font-black text-white md:text-3xl">
                  Dashboard Ekonomi Digital Kuantan Singingi
                </h1>
                <p className="mt-2 max-w-2xl text-sm text-orange-50/95 md:text-base">
                  Platform visualisasi statistik usaha digital untuk mendukung dan menyukseskan perencanaan, pelaksanaan, pemantauan, dan evaluasi kegiatan sensus ekonomi 2026 di Kabupaten Kuantan Singingi.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {highlights.map((item) => (
                    <span key={item} className="rounded-lg border border-orange-100/60 bg-white/10 px-2.5 py-1 text-xs text-orange-50/95">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-2xl font-black text-stone-800 md:text-3xl">Statistik Usaha Digital di Kabupaten Kuantan Singingi</h2>
                <p className="mt-2 text-sm text-orange-900/75 md:text-base">Setiap diagram menyesuaikan pilihan filter secara real-time.</p>
              </div>
              <p className="text-sm font-semibold text-orange-700">Sumber: Kumpulan Data Survei Usaha Tahun 2025</p>
            </div>

            <BusinessStatsDashboard items={data} />
          </div>

          <Footer />
        </section>
      </div>
    </main>
  )
}
