"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, X } from "lucide-react"
import { KECAMATAN_LIST } from "@/data/master/kecamatan"
import { useCodeFilter } from "@/store/filters-context"

export default function KecamatanFilter() {
  const { state, setKeyword, toggleCode, clearCodes } = useCodeFilter("kec")
  const [isOpen, setIsOpen] = useState(true)
  const hasSelected = state.selectedCodes.length > 0

  return (
    <section className="rounded-2xl border border-orange-200 bg-orange-50/85 p-4 md:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-orange-900">Kecamatan</h3>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-orange-300 text-orange-700 transition hover:bg-orange-100"
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
              placeholder="Cari kode atau nama kecamatan..."
              className="w-full rounded-xl border border-orange-300 bg-white px-3 py-2 text-sm text-stone-800 outline-none ring-orange-400 focus:ring"
            />
            <div className="group relative">
              <button
                type="button"
                onClick={clearCodes}
                disabled={!hasSelected}
                title={hasSelected ? "Kosongkan pilihan" : undefined}
                className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-white transition ${hasSelected ? "border-red-300 text-red-600 hover:bg-red-50" : "border-orange-200 text-orange-300 cursor-not-allowed"}`}
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
            {KECAMATAN_LIST.filter((item) => {
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
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-2 text-sm transition ${checked ? "border-orange-500 bg-orange-100 text-orange-950" : "border-orange-200 bg-white text-stone-700 hover:border-orange-300"}`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleCode(item.code)}
                    className="mt-0.5 h-4 w-4 rounded border-orange-400 text-orange-600 focus:ring-orange-500"
                  />
                  <span>
                    <span className="mr-1 font-semibold">{item.code}.</span>
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
