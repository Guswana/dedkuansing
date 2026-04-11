import type { P426Item } from "@/types/p426"

export const P426_LIST: P426Item[] = [
  { code: "01", label: "Sarana Komunikasi" },
  { code: "02", label: "Mencari Informasi" },
  { code: "04", label: "Pemasaran Iklan" },
  { code: "08", label: "Sarana Penjualan Produk/Output" },
  { code: "16", label: "Pembelian dan/atau Produksi" },
  { code: "32", label: "Lainnya" },
]

export const P426_MAP = new Map(P426_LIST.map((item) => [item.code, item.label]))
