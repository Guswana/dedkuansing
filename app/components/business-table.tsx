'use client'

import { BusinessData, deleteBusinessData } from "@/app/actions/business"
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
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden rounded-t-none border-t-0">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">No</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
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
                <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                  Tidak ada data yang ditemukan
                </td>
              </tr>
            ) : (
              data.map((item, index) => {
                const nomorUrut = ((pagination.currentPage - 1) * 10) + index + 1
                return (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-sm text-gray-600 font-medium">{nomorUrut}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 font-mono">{item.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{item.r421Desk || '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{item.kecamatanLabel || (item.kodeKec ? String(item.kodeKec).padStart(3, '0') : '-')}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{item.jenisLabel || item.r421 || '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{item.skalaLabel || item.r425 || '-'}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-2">
                        <button 
                          className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                          onClick={() => {
                            // Untuk edit bisa diarahkan ke halaman edit atau buka modal
                            alert('Fitur edit akan segera tersedia')
                          }}
                        >
                          Edit
                        </button>
                        <button 
                          className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                          onClick={async () => {
                            if (confirm('Yakin ingin menghapus data ini?')) {
                              // Extract numeric id dari id composite
                              const numericId = parseInt(item.id.split('-')[0])
                              if (!isNaN(numericId)) {
                                await deleteBusinessData(numericId)
                                if (onDataChange) {
                                  onDataChange()
                                }
                              }
                            }
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
  )
}