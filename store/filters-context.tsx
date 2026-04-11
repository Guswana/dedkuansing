"use client"

import { createContext, useContext, useMemo, useState } from "react"
import type { P421FilterState } from "@/types/p421"
import type { P424FilterState } from "@/types/p424"
import type { P425FilterState } from "@/types/p425"
import type { P426FilterState } from "@/types/p426"

type BaseFilterState = {
  selectedCodes: string[]
  keyword: string
}

export type GlobalFiltersState = {
  p421: P421FilterState
  p424: P424FilterState
  p425: P425FilterState
  p426: P426FilterState
}

export type FilterKey = keyof GlobalFiltersState

type FiltersContextValue = {
  state: GlobalFiltersState
  setKeyword: (key: FilterKey, keyword: string) => void
  toggleCode: (key: FilterKey, code: string) => void
  clearCodes: (key: FilterKey) => void
  resetGroup: (key: FilterKey) => void
  resetFilters: () => void
}

const emptyFilterState = (): BaseFilterState => ({
  selectedCodes: [],
  keyword: "",
})

const initialState: GlobalFiltersState = {
  p421: emptyFilterState(),
  p424: emptyFilterState(),
  p425: emptyFilterState(),
  p426: emptyFilterState(),
}

const FiltersContext = createContext<FiltersContextValue | null>(null)

export function FiltersProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GlobalFiltersState>(initialState)

  const value = useMemo<FiltersContextValue>(
    () => ({
      state,
      setKeyword: (key, keyword) => {
        setState((prev) => ({
          ...prev,
          [key]: {
            ...prev[key],
            keyword,
          },
        }))
      },
      toggleCode: (key, code) => {
        setState((prev) => {
          const current = prev[key]
          const exists = current.selectedCodes.includes(code)

          return {
            ...prev,
            [key]: {
              ...current,
              selectedCodes: exists
                ? current.selectedCodes.filter((item) => item !== code)
                : [...current.selectedCodes, code],
            },
          }
        })
      },
      clearCodes: (key) => {
        setState((prev) => ({
          ...prev,
          [key]: {
            ...prev[key],
            selectedCodes: [],
          },
        }))
      },
      resetGroup: (key) => {
        setState((prev) => ({
          ...prev,
          [key]: emptyFilterState(),
        }))
      },
      resetFilters: () => {
        setState(initialState)
      },
    }),
    [state]
  )

  return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
}

export function useGlobalFilters() {
  const context = useContext(FiltersContext)

  if (!context) {
    throw new Error("useGlobalFilters must be used inside FiltersProvider")
  }

  return context
}

export function useCodeFilter(key: FilterKey) {
  const { state, setKeyword, toggleCode, clearCodes, resetGroup } = useGlobalFilters()

  return {
    state: state[key],
    setKeyword: (keyword: string) => setKeyword(key, keyword),
    toggleCode: (code: string) => toggleCode(key, code),
    clearCodes: () => clearCodes(key),
    resetGroup: () => resetGroup(key),
  }
}
