'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from "@/app/components/navbar"
import Sidebar from "@/app/components/sidebar"
import Footer from "@/app/components/footer"
import { getCurrentUser } from "@/app/actions/auth"
import { createBusinessData } from "@/app/actions/business"
import { KECAMATAN_LIST } from "@/data/master/kecamatan"
import { P421_LIST } from "@/data/master/p421"
import { P424_LIST } from "@/data/master/p424"
import { P425_LIST } from "@/data/master/p425"
import { P426_LIST } from "@/data/master/p426"

export default function TambahUsahaPage() {
  const [user, setUser] = useState<{id: number, username: string, name?: string | null, role?: string | null} | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  const [formData, setFormData] = useState({
    kodeProv: 14,
    kodeKab: 5,
    kodeKec: '',
    kodeDesa: '',
    kodeSls: '',
    idRt: '',
    idArt: '',
    r421Desk: '',
    r421: '',
    r424: '',
    r425: '',
    r426: 0,
  })

  // State untuk checkbox P426 (bitmask)
  const [selectedP426, setSelectedP426] = useState<string[]>([])

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handler untuk checkbox P426 (bitmask)
  const handleP426Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    setSelectedP426(prev => {
      const newSelected = checked 
        ? [...prev, value]
        : prev.filter(item => item !== value)
      
      // Hitung total bitmask
      const totalBitmask = newSelected.reduce((sum, code) => sum + parseInt(code), 0)
      setFormData(prevForm => ({
        ...prevForm,
        r426: totalBitmask
      }))
      
      return newSelected
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSuccessMessage('')
    setErrorMessage('')

    try {
      const businessData = {
        kodeProv: parseInt(formData.kodeProv.toString()),
        kodeKab: parseInt(formData.kodeKab.toString()),
        kodeKec: formData.kodeKec ? parseInt(formData.kodeKec) : null,
        kodeDesa: formData.kodeDesa ? parseInt(formData.kodeDesa) : null,
        kodeSls: formData.kodeSls ? parseInt(formData.kodeSls) : null,
        idRt: formData.idRt ? parseInt(formData.idRt) : null,
        idArt: formData.idArt ? parseInt(formData.idArt) : null,
        r421Desk: formData.r421Desk || null,
        r421: formData.r421 ? parseInt(formData.r421) : null,
        r424: formData.r424 ? parseInt(formData.r424) : null,
        r425: formData.r425 ? parseFloat(formData.r425) : null,
        r426: formData.r426 > 0 ? formData.r426 : null,
      }

      const result = await createBusinessData(businessData)
      
      if (result.success) {
        setSuccessMessage('Data usaha berhasil ditambahkan!')
        // Reset form
        setFormData({
          kodeProv: 14,
          kodeKab: 5,
          kodeKec: '',
          kodeDesa: '',
          kodeSls: '',
          idRt: '',
          idArt: '',
          r421Desk: '',
          r421: '',
          r424: '',
          r425: '',
          r426: 0,
        })
        setSelectedP426([])
        // Auto redirect setelah 2 detik
        setTimeout(() => {
          router.push('/admin')
        }, 2000)
      } else {
        setErrorMessage(result.error || 'Gagal menambahkan data')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan saat menambahkan data'
      setErrorMessage(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
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
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <button
                onClick={() => router.back()}
                className="mb-4 text-primary hover:underline flex items-center gap-2"
              >
                ← Kembali ke Dashboard
              </button>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Tambah Usaha Baru</h1>
              <p className="text-gray-600">Isi form berikut untuk menambahkan data usaha baru</p>
            </div>

            {successMessage && (
              <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
                {successMessage} Mengalihkan ke dashboard...
              </div>
            )}

            {errorMessage && (
              <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kode Provinsi
                  </label>
                  <input
                    type="number"
                    name="kodeProv"
                    value={formData.kodeProv}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kode Kabupaten
                  </label>
                  <input
                    type="number"
                    name="kodeKab"
                    value={formData.kodeKab}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kecamatan
                  </label>
                  <select
                    name="kodeKec"
                    value={formData.kodeKec}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  >
                    <option value="">Pilih Kecamatan</option>
                    {KECAMATAN_LIST.map(kec => (
                      <option key={kec.code} value={parseInt(kec.code)}>
                        {kec.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kode Desa
                  </label>
                  <input
                    type="number"
                    name="kodeDesa"
                    value={formData.kodeDesa}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kode SLS
                  </label>
                  <input
                    type="number"
                    name="kodeSls"
                    value={formData.kodeSls}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ID RT
                  </label>
                  <input
                    type="number"
                    name="idRt"
                    value={formData.idRt}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ID ART
                  </label>
                  <input
                    type="number"
                    name="idArt"
                    value={formData.idArt}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jenis Usaha (P421)
                  </label>
                  <select
                    name="r421"
                    value={formData.r421}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  >
                    <option value="">Pilih Jenis Usaha</option>
                    {P421_LIST.map(item => (
                      <option key={item.code} value={parseInt(item.code)}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deskripsi Usaha
                  </label>
                  <input
                    type="text"
                    name="r421Desk"
                    value={formData.r421Desk}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Masukkan deskripsi usaha"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jenis Izin Usaha (P424)
                  </label>
                  <select
                    name="r424"
                    value={formData.r424}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="">Pilih Jenis Izin Usaha</option>
                    {P424_LIST.map(item => (
                      <option key={item.code} value={parseInt(item.code)}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Klasifikasi Omset (P425)
                  </label>
                  <select
                    name="r425"
                    value={formData.r425}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="">Pilih Klasifikasi Omset</option>
                    {P425_LIST.map(item => (
                      <option key={item.code} value={item.code}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Penggunaan Media Internet (P426)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {P426_LIST.map(item => (
                      <label key={item.code} className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-50 rounded-lg">
                        <input
                          type="checkbox"
                          value={item.code}
                          checked={selectedP426.includes(item.code)}
                          onChange={handleP426Change}
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                        <span className="text-sm text-gray-700">{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                  disabled={isSubmitting}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Menyimpan...' : 'Simpan Data Usaha'}
                </button>
              </div>
            </form>
          </div>
          <Footer />
        </section>
      </div>
    </main>
  )
}