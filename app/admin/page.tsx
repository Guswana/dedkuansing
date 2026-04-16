"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/app/components/navbar"
import Footer from "@/app/components/footer"
import Sidebar from "@/app/components/sidebar"
import BusinessTable from "@/app/components/business-table"
import { logout, getCurrentUser } from "@/app/actions/auth"
import { getBusinessData, type BusinessData, type FilterParams } from "@/app/actions/business"
import { useGlobalFilters } from "@/store/filters-context"

export default function AdminDashboardPage() {
  const [user, setUser] = useState<{id: number, username: string, name?: string | null, role?: string | null} | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [businessData, setBusinessData] = useState<BusinessData[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalData, setTotalData] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [isDataLoading, setIsDataLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    async function checkAuth() {
      const currentUser = await getCurrentUser()
      
      if (!currentUser) {
        router.push("/admin/login")
        return
      }

      setUser(currentUser)
      setIsLoading(false)
    }
    
    checkAuth()
  }, [router])

  const { state: filterState } = useGlobalFilters()

  async function loadData() {
    if (!user) return
    
    setIsDataLoading(true)
    try {
      const filters: FilterParams = {
        kodeKec: filterState.kec.selectedCodes,
        r421: filterState.p421.selectedCodes,
        r424: filterState.p424.selectedCodes,
        r425: filterState.p425.selectedCodes,
        r426: filterState.p426.selectedCodes,
        search: debouncedSearch,
      }

      const result = await getBusinessData(currentPage, 10, filters)
      setBusinessData(result.data)
      setTotalData(result.total)
      setTotalPages(result.totalPages)
    } finally {
      setIsDataLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      loadData()
    }
  }, [
    user, 
    currentPage, 
    debouncedSearch,
    filterState.kec.selectedCodes,
    filterState.p421.selectedCodes,
    filterState.p424.selectedCodes,
    filterState.p425.selectedCodes,
    filterState.p426.selectedCodes
  ])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Debounce search 500ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery)
      setCurrentPage(1)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [searchQuery])

  const handleSearchChange = (search: string) => {
    setSearchQuery(search)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Memuat...</p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <main className="min-h-screen bg-background">
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

        <section className="min-w-0 flex-1 px-3 py-4 md:px-5 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Admin</h1>
                <p className="text-gray-600">Selamat datang, {user.name || user.username}</p>
              </div>
              <button 
                onClick={async () => {
                  await logout()
                  router.push('/')
                }}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
              >
                Logout
              </button>
            </div>

            <div className="rounded-xl bg-white p-6 border border-gray-200 shadow-sm mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Aktivitas Terbaru</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-gray-800">Login berhasil</p>
                    <p className="text-sm text-gray-500">Admin - {new Date().toLocaleString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit'
                    })}</p>
                  </div>
                  <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs">Berhasil</span>
                </div>
              </div>
            </div>

            {/* Header pencarian di luar tabel agar tidak ikut re-render */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 border-b-0 rounded-b-none">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h3 className="font-semibold text-gray-800">Daftar Usaha</h3>
                 <div className="flex items-center gap-4">
                   <input
                     type="text"
                     placeholder="Cari usaha..."
                     value={searchQuery}
                     onChange={(e) => handleSearchChange(e.target.value)}
                     className="px-3 py-2 border border-gray-200 rounded-lg text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-primary/50"
                   />
                   <p className="text-sm text-gray-500 whitespace-nowrap">Total: {totalData} data</p>
                    <button 
                      className="px-3 py-1.5 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition"
                      onClick={() => router.push('/admin/tambah-usaha')}
                    >
                      + Tambah Usaha
                    </button>
                 </div>
              </div>
            </div>

            <BusinessTable 
              data={businessData}
              pagination={{
                total: totalData,
                totalPages: totalPages,
                currentPage: currentPage
              }}
              onPageChange={handlePageChange}
              isLoading={isDataLoading}
              onDataChange={() => loadData()}
            />
          </div>
          <Footer />
        </section>
      </div>
    </main>
  )
}
