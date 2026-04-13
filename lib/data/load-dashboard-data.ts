import { readFile } from "node:fs/promises"
import path from "node:path"
import { parse } from "csv-parse/sync"
import type { FilterableNewsItem } from "@/lib/selectors/filter-items"

type CsvRow = {
  kode_prov: string
  kode_kab: string
  kode_kec: string
  kode_desa: string
  kode_sls: string
  kode_subsls: string
  id_rt: string
  id_art: string
  r421_desk: string
  r421: string
  r424: string
  r425: string
  r426: string
}

function normalizeCode(value: string, digit = 2) {
  const onlyNumber = Number.parseInt(String(value ?? "").replace(/\.0+$/, ""), 10)
  if (Number.isNaN(onlyNumber)) {
    return ""
  }

  return String(onlyNumber).padStart(digit, "0")
}

function normalizeRegionCode(value: string, digit: number) {
  const cleaned = String(value ?? "").replace(/\.0+$/, "").trim()
  if (!cleaned) {
    return ""
  }

  return cleaned.padStart(digit, "0")
}

function decodeP426(value: string) {
  const mask = Number.parseInt(String(value ?? "").replace(/\.0+$/, ""), 10)
  if (Number.isNaN(mask) || mask <= 0) {
    return []
  }

  const baseCodes = [32, 16, 8, 4, 2, 1]
  return baseCodes
    .filter((code) => (mask & code) === code)
    .map((code) => String(code).padStart(2, "0"))
}

export async function loadDashboardData(): Promise<FilterableNewsItem[]> {
  const filePath = path.join(process.cwd(), "data", "data", "data_final.csv")
  const rawCsv = await readFile(filePath, "utf-8")

  const rows = parse(rawCsv, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    bom: true,
  }) as CsvRow[]

  return rows.map((row) => {
    const p421Code = normalizeCode(row.r421)
    const p424Code = normalizeCode(row.r424)
    const p425Code = normalizeCode(row.r425, 1)
    const p426Codes = decodeP426(row.r426)
    const kodeKec = normalizeRegionCode(row.kode_kec, 3)

    return {
      id: [
        row.kode_prov,
        row.kode_kab,
        row.kode_kec,
        row.kode_desa,
        row.kode_sls,
        row.kode_subsls,
        row.id_rt,
        row.id_art,
      ].join("-"),
      title: row.r421_desk || "Deskripsi usaha tidak tersedia",
      kodeKec,
      p421Code,
      p424Code,
      p425Code,
      p426Codes,
    }
  })
}
