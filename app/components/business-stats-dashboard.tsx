"use client"

import { P421_MAP } from "@/data/master/p421"
import { P424_MAP } from "@/data/master/p424"
import { P425_MAP } from "@/data/master/p425"
import { P426_MAP } from "@/data/master/p426"
import { useFilteredNews } from "@/hooks/use-filtered-news"
import type { FilterableNewsItem } from "@/lib/selectors/filter-items"

type ChartEntry = {
  code: string
  label: string
  count: number
  percent: number
}

function countSingle(items: FilterableNewsItem[], field: "p421Code" | "p424Code" | "p425Code") {
  const result = new Map<string, number>()

  for (const item of items) {
    const code = item[field]
    if (!code) {
      continue
    }

    result.set(code, (result.get(code) ?? 0) + 1)
  }

  return result
}

function countMulti(items: FilterableNewsItem[], field: "p426Codes") {
  const result = new Map<string, number>()

  for (const item of items) {
    for (const code of item[field] ?? []) {
      result.set(code, (result.get(code) ?? 0) + 1)
    }
  }

  return result
}

function buildChartEntries(
  source: Map<string, number>,
  labelMap: Map<string, string>,
  total: number,
  limit = 6
): ChartEntry[] {
  return Array.from(source.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([code, count]) => ({
      code,
      label: labelMap.get(code) ?? "Kategori tidak tersedia",
      count,
      percent: total > 0 ? (count / total) * 100 : 0,
    }))
}

function BarChart({ title, data }: { title: string; data: ChartEntry[] }) {
  return (
    <div className="rounded-2xl border border-orange-200 bg-white/85 p-5 shadow-sm">
      <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-orange-900">{title}</h3>
      <div className="mt-4 space-y-3">
        {data.length === 0 ? (
          <p className="text-sm text-orange-800/80">Belum ada data sesuai filter.</p>
        ) : (
          data.map((item) => (
            <div key={`${title}-${item.code}`}>
              <div className="mb-1 flex items-center justify-between gap-4 text-xs">
                <p className="line-clamp-1 font-semibold text-stone-700">{item.code}. {item.label}</p>
                <p className="whitespace-nowrap font-bold text-orange-700">{item.count} ({item.percent.toFixed(1)}%)</p>
              </div>
              <div className="h-2 rounded-full bg-orange-100">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500"
                  style={{ width: `${Math.max(item.percent, 2)}%` }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default function BusinessStatsDashboard({ items }: { items: FilterableNewsItem[] }) {
  const filteredItems = useFilteredNews(items)
  const totalUsaha = filteredItems.length

  const p421Counts = countSingle(filteredItems, "p421Code")
  const p424Counts = countSingle(filteredItems, "p424Code")
  const p425Counts = countSingle(filteredItems, "p425Code")
  const p426Counts = countMulti(filteredItems, "p426Codes")

  const p421Chart = buildChartEntries(p421Counts, P421_MAP, totalUsaha)
  const p424Chart = buildChartEntries(p424Counts, P424_MAP, totalUsaha)
  const p425Chart = buildChartEntries(p425Counts, P425_MAP, totalUsaha, 7)
  const p426Chart = buildChartEntries(p426Counts, P426_MAP, totalUsaha, 6)

  return (
    <section className="space-y-5">
      <div className="rounded-2xl border border-orange-300 bg-orange-100/85 p-5">
        <p className="text-sm text-orange-800">Total data usaha sesuai filter</p>
        <p className="mt-1 text-3xl font-black text-orange-900">{totalUsaha.toLocaleString("id-ID")}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <BarChart title="Distribusi Lapangan Usaha (P421)" data={p421Chart} />
        <BarChart title="Distribusi Perizinan Usaha (P424)" data={p424Chart} />
        <BarChart title="Distribusi Skala Omzet (P425)" data={p425Chart} />
        <BarChart title="Distribusi Pemanfaatan Digital (P426)" data={p426Chart} />
      </div>
    </section>
  )
}
