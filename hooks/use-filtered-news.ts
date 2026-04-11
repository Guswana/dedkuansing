"use client"

import { useMemo } from "react"
import { applyGlobalFilters, type FilterableNewsItem } from "@/lib/selectors/filter-items"
import { useGlobalFilters } from "@/store/filters-context"

export function useFilteredNews(items: FilterableNewsItem[]) {
  const { state } = useGlobalFilters()

  return useMemo(() => applyGlobalFilters(items, state), [items, state])
}
