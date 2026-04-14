"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, X } from "lucide-react"
import { P426_LIST } from "@/data/master/p426"
import { useCodeFilter } from "@/store/filters-context"

export default function P426Filter() {
  const { state, setKeyword, toggleCode, clearCodes } = useCodeFilter("p426")
  const [isOpen, setIsOpen] = useState(true)
  const hasSelected = state.selectedCodes.length > 0

  return (
    <section className="rounded-2xl border border-primary/20 bg-white p-4 md:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-sans text-lg font-bold text-primary">Pemanfaatan Digital</h3>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-primary/30 text-primary bg-primary/5 hover:bg-background transition"
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
              placeholder="Cari kategori pemanfaatan digital..."
              className="w-full rounded-xl border border-primary/30 bg-white px-3 py-2 text-sm text-foreground outline-none focus:ring"
            />
            <div className="group relative">
              <button
                type="button"
                onClick={clearCodes}
                disabled={!hasSelected}
                title={hasSelected ? "Kosongkan pilihan" : undefined}
                className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-white transition ${hasSelected ? "border-red-300 text-red-600 hover:bg-red-50" : "cursor-not-allowed border-primary/20 text-primary/40"}`}
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
            {P426_LIST.filter((item) => {
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
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-2 text-sm transition ${checked ? "border-primary bg-background text-foreground" : "border-primary/20 hover:border-primary/50 bg-white text-foreground"}`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleCode(item.code)}
                    className="mt-0.5 h-4 w-4 rounded focus:ring checkbox-accent border-primary/40"
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