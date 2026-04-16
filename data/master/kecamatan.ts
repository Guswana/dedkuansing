import type { KecItem } from "@/types/kec"

export const KECAMATAN_LIST: KecItem[] = [
  { code: "010", label: "Kecamatan Kuantan Mudik" },
  { code: "011", label: "Kecamatan Hulu Kuantan" },
  { code: "012", label: "Kecamatan Gunung Toar" },
  { code: "013", label: "Kecamatan Pucuk Rantau" },
  { code: "020", label: "Kecamatan Singingi" },
  { code: "021", label: "Kecamatan Singingi Hilir" },
  { code: "030", label: "Kecamatan Kuantan Tengah" },
  { code: "031", label: "Kecamatan Sentajo Raya" },
  { code: "040", label: "Kecamatan Benai" },
  { code: "050", label: "Kecamatan Kuantan Hilir" },
  { code: "051", label: "Kecamatan Pangean" },
  { code: "052", label: "Kecamatan Logas Tanah Darat" },
  { code: "053", label: "Kecamatan Kuantan Hilir Seberang" },
  { code: "060", label: "Kecamatan Cerenti" },
  { code: "061", label: "Kecamatan Inuman" },
]

// export const KECAMATAN_MAP = new Map<string, string>([
//   ["010", "Kecamatan Kuantan Mudik"],
//   ["011", "Kecamatan Hulu Kuantan"],
//   ["012", "Kecamatan Gunung Toar"],
//   ["013", "Kecamatan Pucuk Rantau"],
//   ["020", "Kecamatan Singingi"],
//   ["021", "Kecamatan Singingi Hilir"],
//   ["030", "Kecamatan Kuantan Tengah"],
//   ["031", "Kecamatan Sentajo Raya"],
//   ["040", "Kecamatan Benai"],
//   ["050", "Kecamatan Kuantan Hilir"],
//   ["051", "Kecamatan Pangean"],
//   ["052", "Kecamatan Logas Tanah Darat"],
//   ["053", "Kecamatan Kuantan Hilir Seberang"],
//   ["060", "Kecamatan Cerenti"],
//   ["061", "Kecamatan Inuman"],
// ])

export const KECAMATAN_MAP = new Map(KECAMATAN_LIST.map((item) => [item.code, item.label]))