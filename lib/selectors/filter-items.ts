import { P421_MAP } from "@/data/master/p421"
import { P424_MAP } from "@/data/master/p424"
import { P425_MAP } from "@/data/master/p425"
import { P426_MAP } from "@/data/master/p426"
import type { FilterKey, GlobalFiltersState } from "@/store/filters-context"

export type FilterableNewsItem = {
  id?: string
  title: string
  kodeKec?: string
  p421Code?: string
  p424Code?: string
  p425Code?: string
  p426Codes?: string[]
}

const GROUP_KEYS: FilterKey[] = ["kec", "p421", "p424", "p425", "p426"]

function getItemCodes(item: FilterableNewsItem, key: FilterKey): string[] {
  switch (key) {
    case "kec":
      return item.kodeKec ? [item.kodeKec] : []
    case "p421":
      return item.p421Code ? [item.p421Code] : []
    case "p424":
      return item.p424Code ? [item.p424Code] : []
    case "p425":
      return item.p425Code ? [item.p425Code] : []
    case "p426":
      return item.p426Codes ?? []
  }
}

function matchesCodes(codes: string[], selectedCodes: string[]) {
  if (selectedCodes.length === 0) {
    return true
  }

  return codes.some((code) => selectedCodes.includes(code))
}

export function applyGlobalFilters(
  items: FilterableNewsItem[],
  filters: GlobalFiltersState
) {
  return items.filter((item) => {
    return GROUP_KEYS.every((key) => {
      const group = filters[key]
      const codes = getItemCodes(item, key)

      return matchesCodes(codes, group.selectedCodes)
    })
  })
}

export function buildNewsMetaLabel(item: FilterableNewsItem) {
  const labels = [
    item.p421Code ? P421_MAP.get(item.p421Code) : undefined,
    item.p424Code ? P424_MAP.get(item.p424Code) : undefined,
    item.p425Code ? P425_MAP.get(item.p425Code) : undefined,
    item.p426Codes?.map((code) => P426_MAP.get(code)).filter(Boolean).join(", "),
  ].filter((value): value is string => Boolean(value))

  return labels.join(" | ")
}
