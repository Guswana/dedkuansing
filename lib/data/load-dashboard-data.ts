import { db } from "@/src/db"
import { dataFinal } from "@/src/db/schema"
import type { FilterableNewsItem } from "@/lib/selectors/filter-items"

function normalizeCode(value: number | null, digit = 2) {
  if (!value || Number.isNaN(value)) return ""
  return String(value).padStart(digit, "0")
}

function normalizeRegionCode(value: number | null, digit: number) {
  if (!value) return ""
  return String(value).padStart(digit, "0")
}

function decodeP426(value: number | null) {
  if (!value || value <= 0) return []
  
  const baseCodes = [32, 16, 8, 4, 2, 1]
  return baseCodes
    .filter((code) => (value & code) === code)
    .map((code) => String(code).padStart(2, "0"))
}

export async function loadDashboardData(): Promise<FilterableNewsItem[]> {
  const rows = await db.select().from(dataFinal)

  return rows.map((row) => {
    const p421Code = normalizeCode(row.r421)
    const p424Code = normalizeCode(row.r424)
    const p425Code = normalizeCode(row.r425, 1)
    const p426Codes = decodeP426(row.r426)
    const kodeKec = normalizeRegionCode(row.kodeKec, 3)

    return {
      id: [
        row.kodeProv,
        row.kodeKab,
        row.kodeKec,
        row.kodeDesa,
        row.kodeSls,
        row.kodeSubsls,
        row.idRt,
        row.idArt,
      ].join("-"),
      title: row.r421Desk || "Deskripsi usaha tidak tersedia",
      kodeKec,
      p421Code,
      p424Code,
      p425Code,
      p426Codes,
    }
  })
}
