"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, X } from "lucide-react"
import { P425_LIST } from "@/data/master/p425"
import { useCodeFilter } from "@/store/filters-context"

export default function P425Filter() {
  const { state, setKeyword, toggleCode, clearCodes } = useCodeFilter("p425")
  const [isOpen, setIsOpen] = useState(true)
  const hasSelected = state.selectedCodes.length > 0

  return (
    <section className="rounded-2xl border p-4 md:p-5" style={{ borderColor: 'rgba(232, 129, 50, 0.2)', backgroundColor: '#FFFFFF' }}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-sans text-lg font-bold" style={{ color: '#E88132' }}>Skala Omzet</h3>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border transition"
          style={{ borderColor: 'rgba(232, 129, 50, 0.3)', color: '#E88132', backgroundColor: 'rgba(249, 244, 238, 0.5)' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9F4EE'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(249, 244, 238, 0.5)'}
        >
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      {isOpen ? (
        <>
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              value={state.keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="Cari kategori skala omzet..."
              className="w-full rounded-xl border bg-white px-3 py-2 text-sm outline-none focus:ring"
              style={{ borderColor: 'rgba(232, 129, 50, 0.3)', color: '#333333' }}
            />
            <div className="group relative">
              <button
                type="button"
                onClick={clearCodes}
                disabled={!hasSelected}
                title={hasSelected ? "Kosongkan pilihan" : undefined}
                className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-white transition ${hasSelected ? "border-red-300 text-red-600 hover:bg-red-50" : "cursor-not-allowed"}`}
                style={{ borderColor: hasSelected ? undefined : 'rgba(232, 129, 50, 0.2)', color: hasSelected ? undefined : 'rgba(232, 129, 50, 0.4)' }}
                aria-label="Kosongkan pilihan"
              >
                <X className="h-4 w-4" />
              </button>
              {hasSelected ? (
                <span className="pointer-events-none absolute -top-9 right-0 rounded-md bg-stone-800 px-2 py-1 text-[11px] text-white opacity-0 transition group-hover:opacity-100">
                  Kosongkan pilihan
                </span>
              ) : null}
            </div>
          </div>

          <div className="mt-4 grid max-h-72 gap-2 overflow-y-auto pr-1">
            {P425_LIST.filter((item) => {
              if (!state.keyword.trim()) {
                return true
              }

              const key = state.keyword.toLowerCase()
              return item.code.includes(key) || item.label.toLowerCase().includes(key)
            }).map((item) => {
              const checked = state.selectedCodes.includes(item.code)

              return (
                <label
                  key={item.code}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-2 text-sm transition ${checked ? "" : "hover:border-orange-300"}`}
                  style={{
                    borderColor: checked ? '#E88132' : 'rgba(232, 129, 50, 0.2)',
                    backgroundColor: checked ? '#F9F4EE' : '#FFFFFF',
                    color: '#333333'
                  }}
                  onMouseEnter={(e) => !checked && (e.currentTarget.style.borderColor = 'rgba(232, 129, 50, 0.5)')}
                  onMouseLeave={(e) => !checked && (e.currentTarget.style.borderColor = 'rgba(232, 129, 50, 0.2)')}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleCode(item.code)}
                    className="mt-0.5 h-4 w-4 rounded focus:ring"
                    style={{ borderColor: 'rgba(232, 129, 50, 0.4)', accentColor: '#E88132' }}
                  />
                  <span className="font-sans">
                    <span className="mr-1">{item.code}.</span>
                    {item.label}
                  </span>
                </label>
              )
            })}
          </div>
        </>
      ) : null}
    </section>
  )
}
