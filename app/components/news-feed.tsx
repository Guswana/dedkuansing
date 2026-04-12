"use client"

import Card from "@/app/components/card"
import { useFilteredNews } from "@/hooks/use-filtered-news"
import {
  buildNewsMetaLabel,
  type FilterableNewsItem,
} from "@/lib/selectors/filter-items"
import { withBasePath } from "@/lib/utils/base-path"

export default function NewsFeed({ items }: { items: FilterableNewsItem[] }) {
  const filteredItems = useFilteredNews(items)

  return (
    <>
      <p className="mb-4 text-sm text-orange-900/80">
        Menampilkan <span className="font-bold">{filteredItems.length}</span> dari {items.length} data.
      </p>
      <div className="grid gap-5 md:grid-cols-2">
        {filteredItems.map((item, index) => (
          <Card
            key={item.id ?? `${item.title}-${index}`}
            title={item.title}
            date="Data lokal sensus ekonomi"
            image={withBasePath("/images/img1.png")}
            sectorLabel={buildNewsMetaLabel(item) || "Kategori tidak tersedia"}
          />
        ))}
      </div>
      {filteredItems.length === 0 ? (
        <div className="mt-5 rounded-xl border border-orange-300 bg-orange-100 px-4 py-3 text-sm text-orange-900">
          Tidak ada data yang cocok dengan filter saat ini.
        </div>
      ) : null}
    </>
  )
}
