'use client'

import { BusinessData, deleteBusinessData } from "@/app/actions/business"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface BusinessTableProps {
  data: BusinessData[]
  pagination: {
    total: number
    totalPages: number
    currentPage: number
  }
  onPageChange: (page: number) => void
  isLoading: boolean
  onDataChange?: () => void
}

export default function BusinessTable({ data, pagination, onPageChange, isLoading, onDataChange }: BusinessTableProps) {
  const router = useRouter()
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteConfirm = async () => {
    if (!deletingId) return
    
    setIsDeleting(true)
    try {
      await deleteBusinessData(deletingId)
      if (onDataChange) {
        onDataChange()
      }
    } finally {
      setIsDeleting(false)
      setDeleteModalOpen(false)
      setDeletingId(null)
    }
  }
  
  const renderPagination = () => {
    const pages = []
    const maxVisible = 5
    let start = Math.max(1, pagination.currentPage - Math.floor(maxVisible / 2))
    let end = Math.min(pagination.totalPages, start + maxVisible - 1)

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    return pages
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
        <div className="flex items-center justify-center">
          <p className="text-gray-500">Memuat data...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden rounded-t-none border-t-0">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
             <tr>
               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">No</th>
               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deskripsi Usaha</th>
               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kecamatan</th>
               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis</th>
               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skala</th>
               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Aksi</th>
             </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.length === 0 ? (
              <tr>
                 <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  Tidak ada data yang ditemukan
                </td>
              </tr>
            ) : (
              data.map((item, index) => {
                const nomorUrut = ((pagination.currentPage - 1) * 10) + index + 1
                return (
                 <tr key={item.id} className="hover:bg-gray-50 transition">
                     <td className="px-4 py-3 text-sm text-gray-600 font-medium">{nomorUrut}</td>
                     <td className="px-4 py-3 text-sm text-gray-800">{item.r421Desk || '-'}</td>
                     <td className="px-4 py-3 text-sm text-gray-600">{item.kecamatanLabel || (item.kodeKec ? String(item.kodeKec).padStart(3, '0') : '-')}</td>
                     <td className="px-4 py-3 text-sm text-gray-600">{item.jenisLabel || item.r421 || '-'}</td>
                     <td className="px-4 py-3 text-sm text-gray-600">{item.skalaLabel || item.r425 || '-'}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-2">
                        <button 
                          className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                          onClick={() => {
                            router.push(`/admin/edit-usaha?id=${item.id}`)
                          }}
                        >
                          Edit
                        </button>
                        <button 
                          className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                          onClick={() => {
                            setDeletingId(item.id)
                            setDeleteModalOpen(true)
                          }}
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-gray-100 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Menampilkan data {(pagination.currentPage - 1) * 10 + 1} - {Math.min(pagination.currentPage * 10, pagination.total)} dari {pagination.total} data
        </p>

        {pagination.totalPages > 1 && (
          <div className="flex items-center gap-4">
            <button
              onClick={() => onPageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage <= 1}
              className="px-3 py-1 text-sm border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
            >
              ← Sebelumnya
            </button>

            <div className="flex items-center gap-1">
              {renderPagination().map((page) => (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`px-3 py-1 text-sm rounded-lg transition ${
                    page === pagination.currentPage
                      ? 'bg-primary text-white'
                      : 'border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => onPageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage >= pagination.totalPages}
              className="px-3 py-1 text-sm border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
            >
              Selanjutnya →
            </button>
          </div>
        )}
       </div>
    </div>

    {/* Modal Konfirmasi Hapus */}
    {deleteModalOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Konfirmasi Penghapusan</h3>
          <p className="text-gray-600 mb-6">Apakah Anda yakin ingin menghapus data usaha ini? Tindakan ini tidak dapat dibatalkan.</p>
          <div className="flex gap-4 justify-end">
            <button
              onClick={() => {
                setDeleteModalOpen(false)
                setDeletingId(null)
              }}
              disabled={isDeleting}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
            >
              Batal
            </button>
            <button
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
            >
              {isDeleting ? 'Menghapus...' : 'Hapus'}
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  )
}